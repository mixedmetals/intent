/**
 * StatCard Component
 * 
 * A dashboard stat card using Intent components.
 */

import type { FC } from 'react';
import { Stack, Text, Surface, Badge } from 'intent-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export const StatCard: FC<StatCardProps> = ({ label, value, change, trend }) => {
  const importanceMap: Record<string, 'success' | 'error' | 'default'> = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  };
  
  return (
    <Surface elevation="low" padding="relaxed" radius="lg" background="elevated">
      <Stack direction="column" gap="tight">
        <Text size="sm" color="subtle">{label}</Text>
        <Stack direction="row" gap="normal" align="start">
          <Text size="2xl" weight="bold">{value}</Text>
          <Badge importance={importanceMap[trend]} size="sm">
            {change}
          </Badge>
        </Stack>
      </Stack>
    </Surface>
  );
}
