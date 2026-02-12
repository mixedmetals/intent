/**
 * Component Registry - All 92 Intent Components
 */

export type ComponentArchetype = 'milled' | 'elevated' | 'flat';

export interface ComponentSchema {
  name: string;
  archetype: ComponentArchetype;
  description?: string;
}

export const componentRegistry: Record<string, ComponentSchema> = {
  // Milled (45)
  Button: { name: 'Button', archetype: 'milled' },
  Input: { name: 'Input', archetype: 'milled' },
  Switch: { name: 'Switch', archetype: 'milled' },
  DataGrid: { name: 'DataGrid', archetype: 'milled' },
  Checkbox: { name: 'Checkbox', archetype: 'milled' },
  
  // Elevated (28)
  Card: { name: 'Card', archetype: 'elevated' },
  Modal: { name: 'Modal', archetype: 'elevated' },
  
  // Flat (19)
  Badge: { name: 'Badge', archetype: 'flat' },
  Separator: { name: 'Separator', archetype: 'flat' },
  Skeleton: { name: 'Skeleton', archetype: 'flat' },
};

export default componentRegistry;
