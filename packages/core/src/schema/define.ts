/**
 * Schema Definition DSL
 * 
 * Provides the `defineSystem` and `defineComponent` functions for creating
 * type-safe, constraint-based design systems.
 */

import type {
  DesignSystemConfig,
  ComponentSchema,
  TokenRegistry,
  PropertySet,
  Constraint,
  VisualMapping,
  ConditionalMapping,
} from '../types/index.js';

// ============================================================================
// Component Builder
// ============================================================================

class ComponentBuilder {
  private schema: Partial<ComponentSchema> = {
    constraints: [],
    mappings: {},
  };

  name(name: string): this {
    this.schema.name = name;
    return this;
  }

  description(desc: string): this {
    this.schema.description = desc;
    return this;
  }

  properties(props: PropertySet): this {
    this.schema.properties = props;
    return this;
  }

  constrain(...constraints: Constraint[]): this {
    this.schema.constraints = [...(this.schema.constraints || []), ...constraints];
    return this;
  }

  map(mappings: Record<string, VisualMapping | ConditionalMapping[]>): this {
    this.schema.mappings = mappings;
    return this;
  }

  base(styles: VisualMapping): this {
    this.schema.baseStyles = styles;
    return this;
  }

  build(): ComponentSchema {
    if (!this.schema.name) {
      throw new Error('Component must have a name');
    }
    if (!this.schema.properties) {
      throw new Error(`Component "${this.schema.name}" must define properties`);
    }
    
    return this.schema as ComponentSchema;
  }
}

// ============================================================================
// Fluent API Helpers
// ============================================================================

export function defineComponent(
  config: Partial<ComponentSchema> | ((builder: ComponentBuilder) => ComponentBuilder)
): ComponentSchema {
  if (typeof config === 'function') {
    const builder = new ComponentBuilder();
    return config(builder).build();
  }
  
  // Direct object configuration
  if (!config.name) {
    throw new Error('Component must have a name');
  }
  if (!config.properties) {
    throw new Error(`Component "${config.name}" must define properties`);
  }
  
  return {
    constraints: [],
    mappings: {},
    ...config,
  } as ComponentSchema;
}

// ============================================================================
// System Builder
// ============================================================================

interface SystemBuilderConfig {
  name: string;
  version?: string;
  tokens: TokenRegistry;
  settings?: DesignSystemConfig['settings'];
}

class SystemBuilder {
  private config: SystemBuilderConfig & { components: Record<string, ComponentSchema> } = {
    name: '',
    tokens: {},
    components: {},
  };

  name(name: string): this {
    this.config.name = name;
    return this;
  }

  version(version: string): this {
    this.config.version = version;
    return this;
  }

  tokens(tokens: TokenRegistry): this {
    this.config.tokens = tokens;
    return this;
  }

  component(name: string, schema: ComponentSchema | ((builder: ComponentBuilder) => ComponentBuilder)): this {
    const resolvedSchema = typeof schema === 'function' 
      ? schema(new ComponentBuilder().name(name)).build()
      : schema;
    
    this.config.components[name] = resolvedSchema;
    return this;
  }

  settings(settings: DesignSystemConfig['settings']): this {
    this.config.settings = settings;
    return this;
  }

  build(): DesignSystemConfig {
    if (!this.config.name) {
      throw new Error('Design system must have a name');
    }
    
    return {
      name: this.config.name,
      version: this.config.version,
      tokens: this.config.tokens,
      components: this.config.components,
      settings: this.config.settings,
    };
  }
}

// ============================================================================
// defineSystem Entry Point
// ============================================================================

export function defineSystem(
  config: (builder: SystemBuilder) => SystemBuilder
): DesignSystemConfig;
export function defineSystem(config: Omit<DesignSystemConfig, 'components'> & { components: Record<string, ComponentSchema> }): DesignSystemConfig;
export function defineSystem(
  config: ((builder: SystemBuilder) => SystemBuilder) | (Omit<DesignSystemConfig, 'components'> & { components: Record<string, ComponentSchema> })
): DesignSystemConfig {
  if (typeof config === 'function') {
    const builder = new SystemBuilder();
    return config(builder).build();
  }
  
  return config as DesignSystemConfig;
}

// ============================================================================
// Property Helpers
// ============================================================================

export const prop = {
  enum: (values: string[], config: { required?: boolean; default?: string } = {}): import('../types/index.js').EnumProperty => ({
    type: 'enum',
    values,
    ...config,
  }),
  
  boolean: (config: { required?: boolean; default?: boolean } = {}): import('../types/index.js').BooleanProperty => ({
    type: 'boolean',
    ...config,
  }),
  
  string: (config: { required?: boolean; default?: string } = {}): import('../types/index.js').StringProperty => ({
    type: 'string',
    ...config,
  }),
  
  number: (config: { required?: boolean; default?: number; min?: number; max?: number } = {}): import('../types/index.js').NumberProperty => ({
    type: 'number',
    ...config,
  }),
};

// ============================================================================
// Constraint Helpers
// ============================================================================

export function when(condition: Record<string, string | string[]>): { 
  forbid: (props: string[], message?: string) => Constraint;
  require: (requirements: Record<string, string[]>, message?: string) => Constraint;
} {
  return {
    forbid: (props: string[], message?: string): Constraint => ({
      when: condition,
      forbid: props,
      message,
    }),
    require: (requirements: Record<string, string[]>, message?: string): Constraint => ({
      when: condition,
      require: requirements,
      message,
    }),
  };
}

export function forbid(props: string[], message?: string): Omit<Constraint, 'when'> {
  return {
    forbid: props,
    message,
  };
}

export function require(requirements: Record<string, string[]>, message?: string): Omit<Constraint, 'when'> {
  return {
    require: requirements,
    message,
  };
}
