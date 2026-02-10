# intent-react

React components for the [Intent](https://github.com/mixedmetals/intent-framework) styling framework.

## Installation

```bash
npm install intent-react intent-core
npm install -D intent-cli
```

## Usage

```tsx
import { Stack, Button, Text, Surface } from 'intent-react';

function App() {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="lg" weight="bold">Hello Intent</Text>
      <Button importance="primary">Click me</Button>
    </Stack>
  );
}
```

See the main repo for full documentation.
