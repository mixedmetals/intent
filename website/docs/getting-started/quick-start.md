---
sidebar_position: 3
---

# Quick Start

Build your first Intent screen in 5 minutes.

## Prerequisites

- Node.js 18+
- React 18+ project set up
- Intent installed ([Installation Guide](./installation))

## Create a Login Form

Let's build a complete login form using Intent components.

### 1. Import Components

```tsx
import { 
  Stack, 
  Card, 
  Text, 
  Input, 
  Button,
  Field 
} from 'intent-react'
```

### 2. Build the Layout

```tsx
function LoginForm() {
  return (
    <Stack align="center" justify="center" padding="loose">
      <Card elevation="medium" padding="relaxed">
        {/* Content goes here */}
      </Card>
    </Stack>
  )
}
```

### 3. Add Form Fields

```tsx
<Stack gap="relaxed">
  <Text size="2xl" weight="bold" align="center">
    Welcome Back
  </Text>
  
  <Stack gap="normal">
    <Field label="Email">
      <Input 
        type="email" 
        placeholder="you@example.com"
        icon="mail"
      />
    </Field>
    
    <Field label="Password">
      <Input 
        type="password"
        placeholder="••••••••"
        icon="lock"
      />
    </Field>
  </Stack>
  
  <Button importance="primary" fullWidth>
    Sign In
  </Button>
</Stack>
```

### 4. Complete Component

```tsx
import { useState } from 'react'
import { 
  Stack, Card, Text, Input, 
  Button, Field, Spinner 
} from 'intent-react'

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Handle login...
    setLoading(false)
  }
  
  return (
    <Stack 
      direction="column"
      align="center" 
      justify="center" 
      padding="loose"
      style={{ minHeight: '100vh' }}
    >
      <Card elevation="medium" padding="relaxed" style={{ width: 360 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap="relaxed">
            <Text size="2xl" weight="bold" align="center">
              Welcome Back
            </Text>
            
            <Stack gap="normal">
              <Field label="Email">
                <Input 
                  type="email" 
                  placeholder="you@example.com"
                  icon="mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Field>
              
              <Field label="Password">
                <Input 
                  type="password"
                  placeholder="••••••••"
                  icon="lock"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Field>
            </Stack>
            
            <Button 
              importance="primary" 
              fullWidth
              disabled={loading}
            >
              {loading ? <Spinner size="small" /> : 'Sign In'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  )
}
```

## Key Patterns

### 1. Stack for Layout

Always use `Stack` for spacing:

```tsx
{/* Vertical spacing */}
<Stack direction="column" gap="normal">
  <Item />
  <Item />
</Stack>

{/* Horizontal spacing */}
<Stack direction="row" gap="normal">
  <Button>Cancel</Button>
  <Button importance="primary">Save</Button>
</Stack>
```

### 2. Cards for Grouping

Use `Card` to visually group related content:

```tsx
<Card elevation="low" padding="normal">
  <Text weight="bold">Section Title</Text>
  <Text color="muted">Section content...</Text>
</Card>
```

### 3. Field + Input Pattern

Always wrap inputs with Field for labels:

```tsx
<Field label="Username" error={errors.username}>
  <Input 
    validation={errors.username ? 'invalid' : 'none'}
  />
</Field>
```

## Next Steps

- Browse all [Components](../components)
- Learn [Schema Definition](../api/schema)
- Customize the [Theme](../api/theme)

## Complete Example

Here's a dashboard layout combining multiple components:

```tsx
import { 
  Stack, Card, Text, Button, 
  Badge, Tabs, Table, Avatar 
} from 'intent-react'

function Dashboard() {
  return (
    <Stack gap="relaxed" padding="normal">
      {/* Header */}
      <Stack direction="row" justify="between" align="center">
        <Text size="2xl" weight="bold">Dashboard</Text>
        <Button importance="primary">New Project</Button>
      </Stack>
      
      {/* Stats */}
      <Stack direction="row" gap="normal">
        <StatCard label="Users" value="1,234" trend="up" />
        <StatCard label="Revenue" value="$12.5k" trend="up" />
        <StatCard label="Churn" value="2.3%" trend="down" />
      </Stack>
      
      {/* Content */}
      <Tabs defaultValue="projects">
        <Tabs.List>
          <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
          <Tabs.Trigger value="team">Team</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="projects">
          <ProjectsTable />
        </Tabs.Content>
      </Tabs>
    </Stack>
  )
}
```

Happy building! 🚀
