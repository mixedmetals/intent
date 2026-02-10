# intent-core

Core schema definition, compiler, and validator for the [Intent](https://github.com/mixedmetals/intent-framework) styling framework.

## Installation

```bash
npm install intent-core
```

## Usage

```typescript
import { defineSystem, defineComponent, prop, when } from 'intent-core';

const system = defineSystem({
  name: 'MySystem',
  tokens: { color: { primary: '#6366F1' } },
  components: {
    Button: defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary'], { required: true }),
      },
      constraints: [],
      mappings: {
        'importance=primary': { background: 'primary' },
      },
    }),
  },
});
```

See the main repo for full documentation.
