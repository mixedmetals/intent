/**
 * Constraint Engine
 * 
 * Validates component prop combinations against defined constraints.
 */

import type {
  ComponentSchema,
  Constraint,
  ConstraintCondition,
  ValidationIssue,
  ComponentUsage,
} from '../types/index.js';

// ============================================================================
// Condition Evaluation
// ============================================================================

function evaluateCondition(
  condition: ConstraintCondition,
  props: Record<string, unknown>
): boolean {
  for (const [key, expectedValue] of Object.entries(condition)) {
    const actualValue = props[key];
    
    // Handle array of allowed values
    if (Array.isArray(expectedValue)) {
      if (!expectedValue.includes(String(actualValue))) {
        return false;
      }
      continue;
    }
    
    // Handle operator objects
    if (typeof expectedValue === 'object' && expectedValue !== null && 'op' in expectedValue) {
      const { op, value } = expectedValue as { op: string; value: unknown };
      const result = evaluateOperator(op, actualValue, value);
      if (!result) return false;
      continue;
    }
    
    // Simple equality check
    if (String(actualValue) !== String(expectedValue)) {
      return false;
    }
  }
  
  return true;
}

function evaluateOperator(
  op: string,
  actual: unknown,
  expected: unknown
): boolean {
  switch (op) {
    case 'eq': return actual === expected;
    case 'neq': return actual !== expected;
    case 'in': return Array.isArray(expected) && expected.includes(String(actual));
    case 'nin': return Array.isArray(expected) && !expected.includes(String(actual));
    case 'gt': return typeof actual === 'number' && typeof expected === 'number' && actual > expected;
    case 'lt': return typeof actual === 'number' && typeof expected === 'number' && actual < expected;
    case 'gte': return typeof actual === 'number' && typeof expected === 'number' && actual >= expected;
    case 'lte': return typeof actual === 'number' && typeof expected === 'number' && actual <= expected;
    default: return false;
  }
}

// ============================================================================
// Constraint Validation
// ============================================================================

export interface ValidationContext {
  component?: string;
  file?: string;
  line?: number;
  column?: number;
}

export function validateConstraints(
  schema: ComponentSchema,
  usage: ComponentUsage,
  context?: ValidationContext
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const props = usage.props;
  
  for (const constraint of schema.constraints) {
    // Check if the condition applies
    if (!evaluateCondition(constraint.when, props)) {
      continue;
    }
    
    // Check forbidden props
    if (constraint.forbid) {
      for (const forbiddenProp of constraint.forbid) {
        if (forbiddenProp in props && props[forbiddenProp] !== undefined) {
          issues.push({
            severity: 'error',
            code: 'CONSTRAINT_FORBIDDEN_PROP',
            message: constraint.message || 
              `Property "${forbiddenProp}" is not allowed when ${formatCondition(constraint.when)}`,
            path: context 
              ? `${context.file}:${context.line}:${context.column}` 
              : `${usage.component}`,
            suggestion: `Remove "${forbiddenProp}" or change ${formatCondition(constraint.when)}`,
          });
        }
      }
    }
    
    // Check required props
    if (constraint.require) {
      for (const [propName, allowedValues] of Object.entries(constraint.require)) {
        const actualValue = props[propName];
        
        if (actualValue === undefined) {
          issues.push({
            severity: 'error',
            code: 'CONSTRAINT_MISSING_REQUIRED',
            message: constraint.message ||
              `Property "${propName}" is required when ${formatCondition(constraint.when)}`,
            path: context 
              ? `${context.file}:${context.line}:${context.column}` 
              : `${usage.component}`,
            suggestion: `Add ${propName}="${allowedValues[0]}"`,
          });
        } else if (!allowedValues.includes(String(actualValue))) {
          issues.push({
            severity: 'error',
            code: 'CONSTRAINT_INVALID_VALUE',
            message: constraint.message ||
              `Property "${propName}" must be one of [${allowedValues.join(', ')}] when ${formatCondition(constraint.when)}, got "${actualValue}"`,
            path: context 
              ? `${context.file}:${context.line}:${context.column}` 
              : `${usage.component}`,
            suggestion: `Change to ${propName}="${allowedValues[0]}"`,
          });
        }
      }
    }
  }
  
  return issues;
}

function formatCondition(condition: ConstraintCondition): string {
  const parts = Object.entries(condition).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} is [${value.join(', ')}]`;
    }
    return `${key}="${value}"`;
  });
  return parts.join(' and ');
}

// ============================================================================
// Generate All Valid Combinations
// ============================================================================

export function generateValidCombinations(
  schema: ComponentSchema
): Array<Record<string, string>> {
  const combinations: Array<Record<string, string>> = [];
  
  // Get all enum properties
  const enumProps = Object.entries(schema.properties)
    .filter(([, def]) => def.type === 'enum')
    .map(([name, def]) => ({
      name,
      values: (def as import('../types/index.js').EnumProperty).values,
    }));
  
  // Generate cartesian product of all enum values
  function generate(index: number, current: Record<string, string>): void {
    if (index >= enumProps.length) {
      // Validate this combination against constraints
      const mockUsage: ComponentUsage = {
        component: schema.name,
        props: current,
      };
      const issues = validateConstraints(schema, mockUsage);
      
      if (issues.length === 0) {
        combinations.push({ ...current });
      }
      return;
    }
    
    const { name, values } = enumProps[index];
    for (const value of values) {
      current[name] = value;
      generate(index + 1, current);
    }
  }
  
  generate(0, {});
  return combinations;
}

// ============================================================================
// Suggest Valid Alternatives
// ============================================================================

export function suggestValidAlternatives(
  schema: ComponentSchema,
  invalidProps: Record<string, unknown>
): Array<Record<string, string>> {
  const validCombos = generateValidCombinations(schema);
  
  // Score combinations by similarity to invalid props
  const scored = validCombos.map(combo => {
    let score = 0;
    for (const [key, value] of Object.entries(invalidProps)) {
      if (combo[key] === String(value)) {
        score += 1;
      }
    }
    return { combo, score };
  });
  
  // Sort by score descending and return top matches
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.combo);
}
