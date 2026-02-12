// ============================================================================
// Intent Core Types
// ============================================================================

export type TokenValue = string | number;

export type TokenCategory = 'color' | 'space' | 'elevation' | 'typography' | 'radius' | 'border' | 'zIndex' | 'opacity' | 'transition' | 'spacing' | 'shadows' | 'breakpoints' | 'component';

export type TokenRegistry = {
  [K in TokenCategory]?: Record<string, TokenValue>;
} & {
  // Allow nested color palettes (e.g., color.primary.500)
  color?: Record<string, TokenValue | Record<string, TokenValue>>;
  // Allow nested typography (e.g., typography.fontSize.lg)
  typography?: Record<string, Record<string, TokenValue>>;
  // Allow nested component tokens (e.g., component.button.primary-bg)
  component?: Record<string, Record<string, TokenValue>>;
};

export type PropertyType = 'enum' | 'boolean' | 'string' | 'number';

export interface EnumProperty {
  type: 'enum';
  values: string[];
  required?: boolean;
  default?: string;
}

export interface BooleanProperty {
  type: 'boolean';
  required?: boolean;
  default?: boolean;
}

export interface StringProperty {
  type: 'string';
  required?: boolean;
  default?: string;
}

export interface NumberProperty {
  type: 'number';
  required?: boolean;
  default?: number;
  min?: number;
  max?: number;
}

export type PropertyDefinition = EnumProperty | BooleanProperty | StringProperty | NumberProperty;

export interface PropertySet {
  [key: string]: PropertyDefinition;
}

// ============================================================================
// Constraint System
// ============================================================================

export type ConstraintOperator = 'eq' | 'neq' | 'in' | 'nin' | 'gt' | 'lt' | 'gte' | 'lte';

export interface ConstraintCondition {
  [property: string]: string | string[] | number | boolean | { op: ConstraintOperator; value: unknown };
}

export interface ConstraintAction {
  forbid?: string[];
  require?: Record<string, string[]>;
  suggest?: Record<string, string>;
}

export interface Constraint {
  when: ConstraintCondition;
  forbid?: string[];
  require?: Record<string, string[]>;
  suggest?: Record<string, string>;
  message?: string;
}

// ============================================================================
// Visual Mappings
// ============================================================================

export type CSSProperty = string;
export type TokenReference = string;

export type StyleValue = 
  | TokenReference 
  | { [key: string]: TokenReference }  // Responsive/size-based
  | string;  // Literal CSS value (discouraged but supported)

export interface VisualMapping {
  [cssProperty: CSSProperty]: StyleValue;
}

export interface ConditionalMapping {
  condition: Record<string, string>;
  styles: VisualMapping;
}

// ============================================================================
// Component Schema
// ============================================================================

export interface ComponentSchema {
  name: string;
  description?: string;
  properties: PropertySet;
  constraints: Constraint[];
  mappings: Record<string, VisualMapping | ConditionalMapping[]>;
  baseStyles?: VisualMapping;
}

// ============================================================================
// Design System
// ============================================================================

export interface DesignSystemConfig {
  name: string;
  version?: string;
  tokens: TokenRegistry;
  darkTokens?: Partial<TokenRegistry>;
  components: Record<string, ComponentSchema>;
  settings?: {
    cssPrefix?: string;
    generateCSSVariables?: boolean;
    strictMode?: boolean;
  };
}

export interface DesignSystem {
  config: DesignSystemConfig;
  validate(): ValidationResult;
  getComponent(name: string): ComponentSchema | undefined;
  getToken(category: TokenCategory, name: string): TokenValue | undefined;
}

// ============================================================================
// Validation
// ============================================================================

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  path: string;
  suggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface ComponentUsage {
  component: string;
  props: Record<string, unknown>;
  location?: { file: string; line: number; column: number };
}

// ============================================================================
// Compilation Output
// ============================================================================

export interface CompiledStyles {
  css: string;
  classes: string[];
  sourceMap?: string;
}

export interface ComponentCompilation {
  component: string;
  styles: CompiledStyles;
  typeDefinition: string;
  propCombinations: string[][];
}

export interface CompilationOutput {
  css: string;
  metadata: {
    tokens: TokenRegistry;
    components: string[];
    usedCombinations: Record<string, string[][]>;
  };
  types: string;
}

// ============================================================================
// AI Integration
// ============================================================================

export interface ComponentSchemaForAI {
  name: string;
  description: string;
  properties: Array<{
    name: string;
    type: string;
    values?: string[];
    required: boolean;
    default?: unknown;
    description?: string;
    valueDescriptions?: Record<string, string>;
  }>;
  constraints: string[];
  examples: {
    valid: string[];
    invalid: string[];
  };
}

export interface AIManifest {
  version: string;
  designSystem: string;
  tokens: TokenRegistry;
  components: ComponentSchemaForAI[];
  semanticDescriptions: Record<string, string>;
}
