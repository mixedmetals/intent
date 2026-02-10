/**
 * AST Parser
 * 
 * Parses TypeScript/React source files to extract Intent component usage.
 */

import * as ts from 'typescript';
import type { ComponentUsage, ValidationIssue } from '../types/index.js';

// ============================================================================
// Parser Options
// ============================================================================

export interface ParseOptions {
  intentImports: string[];  // Module names that export Intent components
  componentNames: string[]; // Known Intent component names
}

export interface ParsedResult {
  usages: ComponentUsage[];
  issues: ValidationIssue[];
}

// ============================================================================
// Source File Parser
// ============================================================================

export function parseSourceFile(
  sourceFile: ts.SourceFile,
  options: ParseOptions
): ParsedResult {
  const usages: ComponentUsage[] = [];
  const issues: ValidationIssue[] = [];
  
  // Track imported Intent components
  const importedComponents = new Map<string, string>(); // local name -> component name
  
  function visit(node: ts.Node): void {
    // Handle import declarations
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier;
      if (ts.isStringLiteral(moduleSpecifier)) {
        const moduleName = moduleSpecifier.text;
        
        // Check if this is an Intent import
        const isIntentImport = options.intentImports.some(pattern => {
          if (pattern.includes('*')) {
            const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
            return regex.test(moduleName);
          }
          return moduleName === pattern || moduleName.startsWith(pattern + '/');
        });
        
        if (isIntentImport) {
          const importClause = node.importClause;
          if (importClause?.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
            for (const element of importClause.namedBindings.elements) {
              const localName = element.name.text;
              const importedName = element.propertyName?.text || localName;
              
              if (options.componentNames.includes(importedName)) {
                importedComponents.set(localName, importedName);
              }
            }
          }
        }
      }
    }
    
    // Handle JSX elements
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = ts.isJsxOpeningElement(node) 
        ? node.tagName 
        : node.tagName;
      
      if (ts.isIdentifier(tagName)) {
        const localName = tagName.text;
        const componentName = importedComponents.get(localName);
        
        if (componentName) {
          const { props, propIssues } = extractProps(
            ts.isJsxOpeningElement(node) ? node.attributes : node.attributes,
            sourceFile
          );
          
          const { line, character } = ts.getLineAndCharacterOfPosition(
            sourceFile,
            node.getStart(sourceFile)
          );
          
          usages.push({
            component: componentName,
            props,
            location: {
              file: sourceFile.fileName,
              line: line + 1,
              column: character + 1,
            },
          });
          
          issues.push(...propIssues.map(issue => ({
            ...issue,
            path: `${sourceFile.fileName}:${line + 1}:${character + 1}`,
          })));
        }
      }
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return { usages, issues };
}

// ============================================================================
// Prop Extraction
// ============================================================================

function extractProps(
  attributes: ts.JsxAttributes,
  sourceFile: ts.SourceFile
): { props: Record<string, unknown>; propIssues: ValidationIssue[] } {
  const props: Record<string, unknown> = {};
  const propIssues: ValidationIssue[] = [];
  
  for (const attr of attributes.properties) {
    // Handle spread attributes (we can't statically analyze these)
    if (ts.isJsxSpreadAttribute(attr)) {
      propIssues.push({
        severity: 'warning',
        code: 'DYNAMIC_PROPS',
        message: 'Spread attributes cannot be statically validated',
        path: '',
      });
      continue;
    }
    
    // Handle regular JSX attributes
    if (ts.isJsxAttribute(attr)) {
      const propName = ts.isIdentifier(attr.name) ? attr.name.text : attr.name.namespace.text;
      
      // Check for forbidden className usage
      if (propName === 'className') {
        const value = attr.initializer;
        
        // Check for arbitrary Tailwind-like values
        if (value && ts.isStringLiteral(value)) {
          const classValue = value.text;
          
          // Detect Tailwind arbitrary values like pt-[7px]
          if (/\[.+\]/.test(classValue)) {
            propIssues.push({
              severity: 'error',
              code: 'ARBITRARY_VALUE',
              message: `Arbitrary Tailwind values are not allowed: "${classValue}". Use Intent tokens instead.`,
              path: '',
              suggestion: 'Replace with Intent semantic props',
            });
          }
          
          // Detect utility class usage
          const utilityPatterns = [
            /^flex$/, /^block$/, /^inline/, /^grid$/,
            /^items-/, /^justify-/, /^bg-/, /^text-/, /^p-/, /^m-/, /^px-/, /^py-/
          ];
          
          const hasUtilityClasses = classValue.split(/\s+/).some(cls => 
            utilityPatterns.some(pattern => pattern.test(cls))
          );
          
          if (hasUtilityClasses) {
            propIssues.push({
              severity: 'warning',
              code: 'UTILITY_CLASS',
              message: `Tailwind utility classes detected: "${classValue}". Prefer Intent components.`,
              path: '',
              suggestion: 'Use Stack, Surface, or other Intent components instead',
            });
          }
        }
        
        // Still record the className prop (will be validated later)
        props[propName] = extractValue(attr.initializer, sourceFile);
        continue;
      }
      
      props[propName] = extractValue(attr.initializer, sourceFile);
    }
  }
  
  return { props, propIssues };
}

// ============================================================================
// Value Extraction
// ============================================================================

function extractValue(
  initializer: ts.JsxAttributeValue | undefined,
  sourceFile: ts.SourceFile
): unknown {
  if (!initializer) {
    return true; // Boolean prop without value
  }
  
  // String literal: prop="value"
  if (ts.isStringLiteral(initializer)) {
    return initializer.text;
  }
  
  // Expression: prop={value}
  if (ts.isJsxExpression(initializer)) {
    if (!initializer.expression) {
      return undefined;
    }
    
    const expr = initializer.expression;
    
    // String literal in expression: prop={"value"}
    if (ts.isStringLiteral(expr)) {
      return expr.text;
    }
    
    // Number literal: prop={42}
    if (ts.isNumericLiteral(expr)) {
      return Number(expr.text);
    }
    
    // Boolean literal: prop={true}
    if (expr.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (expr.kind === ts.SyntaxKind.FalseKeyword) return false;
    
    // Identifier: prop={someVariable}
    if (ts.isIdentifier(expr)) {
      return { __dynamic: expr.text };
    }
    
    // Object literal: prop={{ key: value }}
    if (ts.isObjectLiteralExpression(expr)) {
      const obj: Record<string, unknown> = {};
      for (const prop of expr.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          obj[prop.name.text] = extractValue(
            { ...prop.initializer, kind: ts.SyntaxKind.JsxExpression } as ts.JsxExpression,
            sourceFile
          );
        }
      }
      return obj;
    }
  }
  
  // Fallback: return as string representation
  return initializer.getText(sourceFile);
}

// ============================================================================
// Parse File
// ============================================================================

export function parseFile(
  filePath: string,
  content: string,
  options: ParseOptions
): ParsedResult {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  
  return parseSourceFile(sourceFile, options);
}

// ============================================================================
// Batch Parse
// ============================================================================

export interface BatchParseResult {
  [filePath: string]: ParsedResult;
}

export function parseFiles(
  files: Array<{ path: string; content: string }>,
  options: ParseOptions
): BatchParseResult {
  const results: BatchParseResult = {};
  
  for (const file of files) {
    results[file.path] = parseFile(file.path, file.content, options);
  }
  
  return results;
}
