/**
 * Dashboard Component
 * 
 * Main dashboard layout demonstrating Intent components.
 */

import React from 'react';
import type { FC } from 'react';
import { Stack, Text, Surface, Button, Divider } from 'intent-react';
import { Sidebar } from './Sidebar.js';
import { StatCard } from './StatCard.js';

export const Dashboard: FC = () => {
  return (
    <Stack direction="row" style={{ minHeight: '100vh' }}>
      <Sidebar />
      
      <Stack direction="column" gap="loose" style={{ flex: 1, padding: '32px' }}>
        {/* Header */}
        <Stack direction="row" gap="normal" align="center" justify="between">
          <Stack direction="column" gap="tight">
            <Text size="2xl" weight="bold">Dashboard</Text>
            <Text size="sm" color="subtle">Welcome back! Here's what's happening.</Text>
          </Stack>
          
          <Stack direction="row" gap="normal">
            <Button importance="secondary" size="sm">Export</Button>
            <Button importance="primary" size="sm">Create New</Button>
          </Stack>
        </Stack>
        
        <Divider />
        
        {/* Stats Grid */}
        <Stack direction="row" gap="relaxed">
          <StatCard label="Total Revenue" value="$45,231" change="+12%" trend="up" />
          <StatCard label="Active Users" value="2,345" change="+5%" trend="up" />
          <StatCard label="Churn Rate" value="2.4%" change="-0.5%" trend="down" />
          <StatCard label="Avg. Session" value="4m 32s" change="0%" trend="neutral" />
        </Stack>
        
        {/* Main Content */}
        <Surface elevation="low" padding="relaxed" radius="lg" style={{ flex: 1 }}>
          <Stack direction="column" gap="relaxed">
            <Text size="lg" weight="semibold">Recent Activity</Text>
            
            <Stack direction="column">
              {[1, 2, 3].map((i, index) => (
                <React.Fragment key={i}>
                  {index > 0 && <Divider />}
                  <Stack 
                    direction="row" 
                    gap="normal" 
                    align="center"
                    style={{ paddingBlock: '12px' }}
                  >
                    <Surface 
                      elevation="none" 
                      padding="normal" 
                      radius="lg"
                      background="subtle"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <Stack direction="column" gap="tight" style={{ flex: 1 }}>
                      <Text size="md" weight="medium">Project Update {i}</Text>
                      <Text size="sm" color="subtle">Modified 2 hours ago by Team Member</Text>
                    </Stack>
                    <Button importance="ghost" size="sm">View</Button>
                  </Stack>
                </React.Fragment>
              ))}
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Stack>
  );
}
