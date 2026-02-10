/**
 * Intent React
 * 
 * React integration for the Intent styling framework.
 * 
 * @example
 * ```tsx
 * import { Stack, Button, Text } from 'intent-react';
 * 
 * function App() {
 *   return (
 *     <Stack direction="column" gap="relaxed">
 *       <Text size="lg" weight="bold">Hello Intent</Text>
 *       <Stack direction="row" gap="normal">
 *         <Button importance="primary">Save</Button>
 *         <Button importance="secondary">Cancel</Button>
 *       </Stack>
 *     </Stack>
 *   );
 * }
 * ```
 */

// Components
export { Stack, VStack, HStack } from './components/Stack.js';
export { Button } from './components/Button.js';
export { Surface } from './components/Surface.js';
export { Text, Heading } from './components/Text.js';
export { Input } from './components/Input.js';
export { Card } from './components/Card.js';
export { Badge } from './components/Badge.js';
export { Divider } from './components/Divider.js';

// Types
export type {
  IntentComponentProps,
  StackProps,
  ButtonProps,
  SurfaceProps,
  TextProps,
  InputProps,
  CardProps,
  BadgeProps,
  DividerProps,
} from './types.js';

// Utils
export {
  intentPropsToDataAttributes,
  generateIntentClassName,
  applyDefaultProps,
  validateProps,
} from './utils/factory.js';

// Version
export const VERSION = '0.1.0';
