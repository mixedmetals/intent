/**
 * Layout Comparison
 * 
 * Demonstrates how Intent Stack replaces flexbox utilities.
 */

import type { FC } from 'react';
import { Stack, Text, Surface, Badge } from 'intent-react';

// Intent version: Clean, semantic, maintainable
export const IntentLayout: FC = () => {
  return (
    <Surface elevation="low" padding="relaxed" radius="lg">
      <Stack direction="row" gap="relaxed" align="center" justify="between">
        <Stack direction="column" gap="tight">
          <Text size="lg" weight="semibold">Project Dashboard</Text>
          <Text size="sm" color="subtle">Manage your projects and tasks</Text>
        </Stack>
        
        <Stack direction="row" gap="normal" align="center">
          <Badge importance="success" size="sm">Active</Badge>
          <Text size="sm" color="subtle">Last updated: 2m ago</Text>
        </Stack>
      </Stack>
    </Surface>
  );
}

// Tailwind equivalent: Utility soup
export const TailwindLayout: FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900">Project Dashboard</h2>
          <p className="text-sm text-gray-500">Manage your projects and tasks</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
          <span className="text-sm text-gray-400">Last updated: 2m ago</span>
        </div>
      </div>
    </div>
  );
}

export const LayoutComparison: FC = () => {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="lg" weight="semibold">Layout Comparison</Text>
      
      <Stack direction="column" gap="tight">
        <Text size="sm" color="subtle">Intent (Semantic)</Text>
        <IntentLayout />
      </Stack>
      
      <Stack direction="column" gap="tight">
        <Text size="sm" color="subtle">Tailwind (Utility Classes)</Text>
        <TailwindLayout />
      </Stack>
      
      <Text size="sm" color="subtle">
        Intent: 8 semantic props vs Tailwind: 20+ utility classes.
        Refactoring "relaxed" spacing updates 1 token instead of 12 class values.
      </Text>
    </Stack>
  );
}
