/**
 * App Component
 * 
 * Demonstrates Intent framework with comparison to Tailwind.
 */

import { useState, useEffect } from 'react';
import { Stack, Text, Surface, Button } from 'intent-react';
import { Dashboard } from './components/Dashboard.js';
import { ButtonComparison } from './comparisons/ButtonComparison.js';
import { LayoutComparison } from './comparisons/LayoutComparison.js';

type View = 'dashboard' | 'comparisons';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  
  return (
    <Stack direction="column" style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <Surface elevation="low" padding="normal" background="elevated">
        <Stack direction="row" gap="normal" align="center" justify="between">
          <Text size="xl" weight="bold" color="brand">Intent Framework Demo</Text>
          
          <Stack direction="row" gap="normal">
            <Button 
              importance={view === 'dashboard' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              importance={view === 'comparisons' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('comparisons')}
            >
              Comparisons
            </Button>
            <Button 
              importance="ghost" 
              size="sm"
              onClick={() => setDark(d => !d)}
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </Stack>
        </Stack>
      </Surface>
      
      {/* Content */}
      <div style={{ flex: 1 }}>
        {view === 'dashboard' ? (
          <Dashboard />
        ) : (
          <Stack direction="column" gap="loose" style={{ padding: '32px', maxWidth: '800px' }}>
            <Surface elevation="low" padding="relaxed" radius="lg">
              <ButtonComparison />
            </Surface>
            
            <Surface elevation="low" padding="relaxed" radius="lg">
              <LayoutComparison />
            </Surface>
            
            <Surface elevation="low" padding="relaxed" radius="lg">
              <Stack direction="column" gap="relaxed">
                <Text size="lg" weight="semibold">Token Efficiency Analysis</Text>
                
                <Stack direction="column" gap="tight">
                  <Text size="md" weight="medium">Dashboard Implementation</Text>
                  <Stack direction="row" gap="loose">
                    <Stack direction="column" gap="tight">
                      <Text size="sm" color="subtle">Intent</Text>
                      <Text size="2xl" weight="bold" color="brand">~45 tokens</Text>
                      <Text size="xs" color="subtle">Semantic props only</Text>
                    </Stack>
                    <Stack direction="column" gap="tight">
                      <Text size="sm" color="subtle">Tailwind</Text>
                      <Text size="2xl" weight="bold" color="brand">~180 tokens</Text>
                      <Text size="xs" color="subtle">Utility classes</Text>
                    </Stack>
                  </Stack>
                </Stack>
                
                <Text size="sm" color="subtle">
                  Intent achieves 75% token reduction vs Tailwind for equivalent UI.
                  More importantly: Intent prevents invalid states at compile time,
                  while Tailwind allows any class combination (including broken ones).
                </Text>
              </Stack>
            </Surface>
          </Stack>
        )}
      </div>
    </Stack>
  );
}
