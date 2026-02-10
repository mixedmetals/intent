/**
 * Sidebar Component
 * 
 * Dashboard sidebar navigation using Intent.
 */

import type { FC } from 'react';
import { Stack, Text, Surface, Button } from 'intent-react';

const navItems = [
  { label: 'Dashboard', active: true },
  { label: 'Projects', active: false },
  { label: 'Team', active: false },
  { label: 'Settings', active: false },
];

export const Sidebar: FC = () => {
  return (
    <Surface 
      elevation="none" 
      padding="relaxed" 
      background="subtle"
      style={{ width: '240px', minHeight: '100vh' }}
    >
      <Stack direction="column" gap="loose">
        <Text size="xl" weight="bold" color="brand">Intent Dashboard</Text>
        
        <Stack direction="column" gap="tight">
          {navItems.map((item) => (
            <Button
              key={item.label}
              importance={item.active ? 'primary' : 'ghost'}
              size="md"
              style={{ justifyContent: 'flex-start' }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
}
