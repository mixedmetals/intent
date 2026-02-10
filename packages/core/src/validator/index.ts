/**
 * Validator
 * 
 * Validates component usage against design system schemas.
 */

import type {
  DesignSystemConfig,
  ComponentSchema,
  ValidationIssue,
  ValidationResult,
  ComponentUsage,
  PropertyDefinition,
} from '../types/index.js';
import { validateConstraints } from './constraints.js';

// ============================================================================
// Validator Options
// ============================================================================

export interface ValidatorOptions {
  strict?: boolean;  // Fail on warnings too
}

// ============================================================================
// Schema Validation
// ============================================================================

export function validateSchema(config: DesignSystemConfig): ValidationResult {
  const issues: ValidationIssue[] = [];
  
  // Validate tokens
  for (const [category, tokens] of Object.entries(config.tokens)) {
    if (!tokens) continue;
    
    for (const [name, value] of Object.entries(tokens)) {
      // Check for valid token names (kebab-case recommended)
      if (!/^[a-z][a-z0-9-]*$/.test(name)) {
        issues.push({
          severity: 'warning',
          code: 'INVALID_TOKEN_NAME',
          message: `Token name "${name}" in category "${category}" should be kebab-case`,
          path: `tokens.${category}.${name}`,
        });
      }
      
      // Check for empty values
      if (value === '' || value === undefined) {
        issues.push({
          severity: 'error',
          code: 'EMPTY_TOKEN_VALUE',
          message: `Token "${category}.${name}" has empty value`,
          path: `tokens.${category}.${name}`,
        });
      }
    }
  }
  
  // Validate components
  for (const [name, schema] of Object.entries(config.components)) {
    // Check component name matches key
    if (schema.name !== name) {
      issues.push({
        severity: 'warning',
        code: 'COMPONENT_NAME_MISMATCH',
        message: `Component key "${name}" does not match schema name "${schema.name}"`,
        path: `components.${name}`,
      });
    }
    
    // Validate properties
    for (const [propName, prop] of Object.entries(schema.properties)) {
      const propIssues = validatePropertyDefinition(propName, prop);
      issues.push(...propIssues.map(i => ({ ...i, path: `components.${name}.properties.${propName}` })));
    }
    
    // Validate constraints reference existing properties
    for (const constraint of schema.constraints) {
      for (const propName of Object.keys(constraint.when)) {
        if (!schema.properties[propName]) {
          issues.push({
            severity: 'error',
            code: 'UNKNOWN_CONSTRAINT_PROPERTY',
            message: `Constraint references unknown property "${propName}"`,
            path: `components.${name}.constraints`,
          });
        }
      }
      
      if (constraint.forbid) {
        for (const propName of constraint.forbid) {
          if (!schema.properties[propName]) {
            issues.push({
              severity: 'error',
              code: 'UNKNOWN_FORBIDDEN_PROPERTY',
              message: `Constraint forbids unknown property "${propName}"`,
              path: `components.${name}.constraints`,
            });
          }
        }
      }
      
      if (constraint.require) {
        for (const propName of Object.keys(constraint.require)) {
          if (!schema.properties[propName]) {
            issues.push({
              severity: 'error',
              code: 'UNKNOWN_REQUIRED_PROPERTY',
              message: `Constraint requires unknown property "${propName}"`,
              path: `components.${name}.constraints`,
            });
          }
        }
      }
    }
    
    // Validate mappings reference existing properties
    for (const [key, mapping] of Object.entries(schema.mappings)) {
      const [propName] = key.split('=');
      if (!schema.properties[propName]) {
        issues.push({
          severity: 'error',
          code: 'UNKNOWN_MAPPING_PROPERTY',
          message: `Mapping references unknown property "${propName}"`,
          path: `components.${name}.mappings.${key}`,
        });
      }
    }
  }
  
  return {
    valid: !issues.some(i => i.severity === 'error'),
    issues,
  };
}

function validatePropertyDefinition(
  name: string,
  prop: PropertyDefinition
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // Check property name is camelCase
  if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
    issues.push({
      severity: 'warning',
      code: 'INVALID_PROPERTY_NAME',
      message: `Property name "${name}" should be camelCase`,
      path: name,
    });
  }
  
  // Validate enum values
  if (prop.type === 'enum') {
    if (prop.values.length === 0) {
      issues.push({
        severity: 'error',
        code: 'EMPTY_ENUM',
        message: `Enum property "${name}" has no values`,
        path: name,
      });
    }
    
    for (const value of prop.values) {
      // Check for kebab-case enum values
      if (!/^[a-z][a-z0-9-]*$/.test(value)) {
        issues.push({
          severity: 'warning',
          code: 'INVALID_ENUM_VALUE',
          message: `Enum value "${value}" should be lowercase and kebab-case`,
          path: `${name}.values`,
        });
      }
    }
    
    // Check default value is in values
    if (prop.default !== undefined && !prop.values.includes(prop.default)) {
      issues.push({
        severity: 'error',
        code: 'INVALID_DEFAULT',
        message: `Default value "${prop.default}" is not in enum values`,
        path: `${name}.default`,
      });
    }
  }
  
  // Validate number constraints
  if (prop.type === 'number') {
    if (prop.min !== undefined && prop.max !== undefined && prop.min > prop.max) {
      issues.push({
        severity: 'error',
        code: 'INVALID_RANGE',
        message: `Min (${prop.min}) cannot be greater than max (${prop.max})`,
        path: name,
      });
    }
  }
  
  return issues;
}

// ============================================================================
// Usage Validation
// ============================================================================

export interface UsageValidationContext {
  file: string;
  line?: number;
  column?: number;
}

export function validateUsage(
  schema: ComponentSchema,
  usage: ComponentUsage,
  context?: UsageValidationContext
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const props = usage.props;
  
  // Check for required properties
  for (const [propName, prop] of Object.entries(schema.properties)) {
    if (prop.required && !(propName in props)) {
      issues.push({
        severity: 'error',
        code: 'MISSING_REQUIRED_PROP',
        message: `Required property "${propName}" is missing`,
        path: context ? `${context.file}:${context.line}:${context.column}` : usage.component,
        suggestion: `Add ${propName}="${getDefaultSuggestion(prop)}"`,
      });
    }
  }
  
  // Check for unknown properties
  for (const propName of Object.keys(props)) {
    // Skip HTML attributes and special props
    if (['children', 'key', 'ref'].includes(propName)) continue;
    if (propName.startsWith('on') || propName.startsWith('data-')) continue;
    
    if (!schema.properties[propName]) {
      issues.push({
        severity: 'error',
        code: 'UNKNOWN_PROPERTY',
        message: `Unknown property "${propName}" on component "${schema.name}"`,
        path: context ? `${context.file}:${context.line}:${context.column}` : usage.component,
        suggestion: `Valid properties: ${Object.keys(schema.properties).join(', ')}`,
      });
    }
  }
  
  // Validate property values
  for (const [propName, value] of Object.entries(props)) {
    const prop = schema.properties[propName];
    if (!prop) continue;
    
    const valueIssues = validatePropertyValue(propName, prop, value);
    issues.push(...valueIssues.map(i => ({
      ...i,
      path: context ? `${context.file}:${context.line}:${context.column}` : `${usage.component}.${propName}`,
    })));
  }
  
  // Validate constraints
  const constraintIssues = validateConstraints(schema, usage, context);
  issues.push(...constraintIssues);
  
  return {
    valid: !issues.some(i => i.severity === 'error'),
    issues,
  };
}

function validatePropertyValue(
  name: string,
  prop: PropertyDefinition,
  value: unknown
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // Skip dynamic values (we can't validate these statically)
  if (typeof value === 'object' && value !== null && '__dynamic' in value) {
    return [{
      severity: 'info',
      code: 'DYNAMIC_VALUE',
      message: `Property "${name}" has dynamic value that cannot be statically validated`,
      path: name,
    }];
  }
  
  switch (prop.type) {
    case 'enum': {
      const strValue = String(value);
      if (!prop.values.includes(strValue)) {
        issues.push({
          severity: 'error',
          code: 'INVALID_ENUM_VALUE',
          message: `Invalid value "${strValue}" for property "${name}". Valid values: ${prop.values.join(', ')}`,
          path: name,
          suggestion: `Use one of: ${prop.values.join(', ')}`,
        });
      }
      break;
    }
    
    case 'boolean': {
      if (typeof value !== 'boolean') {
        issues.push({
          severity: 'error',
          code: 'TYPE_MISMATCH',
          message: `Property "${name}" must be a boolean, got ${typeof value}`,
          path: name,
        });
      }
      break;
    }
    
    case 'number': {
      const numValue = typeof value === 'string' ? Number(value) : value;
      if (typeof numValue !== 'number' || isNaN(numValue)) {
        issues.push({
          severity: 'error',
          code: 'TYPE_MISMATCH',
          message: `Property "${name}" must be a number, got ${typeof value}`,
          path: name,
        });
      } else {
        if (prop.min !== undefined && numValue < prop.min) {
          issues.push({
            severity: 'error',
            code: 'VALUE_OUT_OF_RANGE',
            message: `Property "${name}" must be >= ${prop.min}, got ${numValue}`,
            path: name,
          });
        }
        if (prop.max !== undefined && numValue > prop.max) {
          issues.push({
            severity: 'error',
            code: 'VALUE_OUT_OF_RANGE',
            message: `Property "${name}" must be <= ${prop.max}, got ${numValue}`,
            path: name,
          });
        }
      }
      break;
    }
    
    case 'string': {
      // Any string is valid
      break;
    }
  }
  
  return issues;
}

function getDefaultSuggestion(prop: PropertyDefinition): string {
  if (prop.type === 'enum') {
    return prop.default || prop.values[0];
  }
  if (prop.type === 'boolean') {
    return String(prop.default ?? 'true');
  }
  return '...';
}

// ============================================================================
// Batch Validation
// ============================================================================

export interface BatchUsage {
  file: string;
  usages: ComponentUsage[];
}

export function validateAllUsages(
  config: DesignSystemConfig,
  batch: BatchUsage[],
  options?: ValidatorOptions
): ValidationResult {
  const allIssues: ValidationIssue[] = [];
  
  for (const { file, usages } of batch) {
    for (const usage of usages) {
      const schema = config.components[usage.component];
      if (!schema) {
        allIssues.push({
          severity: 'error',
          code: 'UNKNOWN_COMPONENT',
          message: `Unknown component "${usage.component}"`,
          path: file,
        });
        continue;
      }
      
      const result = validateUsage(schema, usage, { file });
      allIssues.push(...result.issues);
    }
  }
  
  const hasErrors = allIssues.some(i => i.severity === 'error');
  const hasWarnings = allIssues.some(i => i.severity === 'warning');
  
  return {
    valid: options?.strict ? !(hasErrors || hasWarnings) : !hasErrors,
    issues: allIssues,
  };
}
