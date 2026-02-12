/**
 * Button Comparison
 * 
 * Demonstrates token efficiency: Intent vs Tailwind
 */

import type { FC } from 'react';
import { Stack, Button, Text } from 'intent-react';

// Intent version: 4 tokens per button
// Total: ~20 tokens for this entire section
export const IntentButtons: FC = () => {
  return (
    <Stack direction="row" gap="normal" align="center">
      <Button importance="primary" size="md">Primary</Button>
      <Button importance="secondary" size="md">Secondary</Button>
      <Button importance="ghost" size="md">Ghost</Button>
      <Button importance="danger" size="md">Danger</Button>
    </Stack>
  );
}

// Tailwind equivalent: ~60+ tokens
// className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium
//   bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
export const TailwindButtons: FC = () => {
  return (
    <div className="inline-flex items-center gap-3">
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
        Primary
      </button>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium border border-gray-300 text-indigo-500 hover:bg-gray-50 transition-colors">
        Secondary
      </button>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-indigo-500 hover:bg-gray-50 transition-colors">
        Ghost
      </button>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
        Danger
      </button>
    </div>
  );
}

export const ButtonComparison: FC = () => {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="lg" weight="semibold">Button Component Comparison</Text>
      
      <Stack direction="column" gap="tight">
        <Text size="sm" color="muted">Intent (Semantic Props)</Text>
        <IntentButtons />
      </Stack>
      
      <Stack direction="column" gap="tight">
        <Text size="sm" color="muted">Tailwind (Utility Classes)</Text>
        <TailwindButtons />
      </Stack>
      
      <Text size="sm" color="muted">
        Intent uses 20 tokens vs Tailwind's 60+ tokens for equivalent UI.
        More importantly: Intent guarantees valid output; Tailwind allows any combination.
      </Text>
    </Stack>
  );
}
