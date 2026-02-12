import { useState, useCallback } from 'react';
import { Stack, Text, Button, Surface, Badge } from 'intent-react';

function App() {
  const [dark, setDark] = useState(false);

  const toggleDark = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="site-header">
        <div className="site-container site-header-inner">
          <span className="site-logo">intent<span className="logo-dot">.</span></span>
          <nav className="site-nav">
            <a href="#compare">Compare</a>
            <a href="#features">Features</a>
            <a href="#components">Components</a>
            <a href="https://github.com/mixedmetals/intent-framework" target="_blank" rel="noopener">GitHub</a>
            <button className="dark-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              {dark ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="site-container hero-content">
          <Stack gap="compact" align="center">
            <Badge importance="primary" size="md">v0.1.0 — Now on npm</Badge>
          </Stack>
          <h1 className="hero-title">
            Stop counting<br />
            <span className="gradient-text">CSS classes.</span>
          </h1>
          <p className="hero-subtitle">
            Intent is a schema-first styling framework built for AI. Replace 60 Tailwind utility classes with 4 semantic tokens that both humans and LLMs understand.
          </p>
          <div className="hero-actions">
            <Button importance="primary" size="lg">
              <a href="#compare" style={{ color: 'inherit' }}>See the Difference</a>
            </Button>
            <Button importance="secondary" size="lg">
              <a href="https://github.com/mixedmetals/intent-framework" target="_blank" rel="noopener" style={{ color: 'inherit' }}>GitHub →</a>
            </Button>
          </div>
          <div className="hero-install" onClick={() => navigator.clipboard.writeText('npm install intent-core intent-react')}>
            <span className="dollar">$</span>
            npm install intent-core intent-react
            <span style={{ opacity: 0.5, fontSize: 12 }}>📋</span>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="section">
        <div className="site-container">
          <Stack gap="loose" align="center">
            <div style={{ textAlign: 'center' }}>
              <Text size="2xl" weight="bold" align="center">Intent vs. Tailwind</Text>
              <Text size="lg" color="subtle" align="center">Same button. Same visual output. Radically different DX.</Text>
            </div>
            <div className="comparison-grid">
              {/* Intent side */}
              <div className="code-panel intent-side">
                <div className="code-panel-header">
                  <span>Intent</span>
                  <span className="token-count good">4 tokens</span>
                </div>
                <pre><code>{`<`}<span className="code-component">Button</span>
                  <span className="code-prop">importance</span>=<span className="code-string">"primary"</span>
                  <span className="code-prop">size</span>=<span className="code-string">"lg"</span>
                  {`>`}
                  Get Started
                  {`</`}<span className="code-component">Button</span>{`>`}</code></pre>
              </div>
              {/* Tailwind side */}
              <div className="code-panel tailwind-side">
                <div className="code-panel-header">
                  <span>Tailwind</span>
                  <span className="token-count bad">17 classes</span>
                </div>
                <pre><code>{`<`}<span className="code-component">button</span>
                  <span className="code-attr">className</span>=<span className="code-string">"</span>
                  <span className="code-class">inline-flex items-center</span>
                  <span className="code-class">justify-center px-6 py-3</span>
                  <span className="code-class">text-lg font-medium</span>
                  <span className="code-class">text-white bg-indigo-500</span>
                  <span className="code-class">rounded-lg cursor-pointer</span>
                  <span className="code-class">hover:bg-indigo-600</span>
                  <span className="code-class">transition-all duration-150</span>
                  <span className="code-class">whitespace-nowrap</span>
                  <span className="code-string">"</span>
                  {`>`}
                  Get Started
                  {`</`}<span className="code-component">button</span>{`>`}</code></pre>
              </div>
            </div>

            <Surface elevation="low" padding="relaxed" radius="lg" background="subtle">
              <Stack direction="row" gap="loose" align="center" justify="center">
                <Stack gap="tight" align="center">
                  <Text size="2xl" weight="bold" color="brand">~95%</Text>
                  <Text size="sm" color="subtle">fewer tokens for AI</Text>
                </Stack>
                <Stack gap="tight" align="center">
                  <Text size="2xl" weight="bold" color="brand">0</Text>
                  <Text size="sm" color="subtle">invalid combinations</Text>
                </Stack>
                <Stack gap="tight" align="center">
                  <Text size="2xl" weight="bold" color="brand">63</Text>
                  <Text size="sm" color="subtle">tests passing</Text>
                </Stack>
              </Stack>
            </Surface>
          </Stack>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="site-container">
          <Stack gap="loose">
            <div style={{ textAlign: 'center' }}>
              <Text size="2xl" weight="bold" align="center">Built different.</Text>
              <Text size="lg" color="subtle" align="center">Every choice optimized for AI + human collaboration.</Text>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">🎯</span>
                <div className="feature-title">Schema-First</div>
                <div className="feature-desc">
                  Define your design system as TypeScript schemas. The compiler generates CSS — no hand-writing utility classes.
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🤖</span>
                <div className="feature-title">AI-Native</div>
                <div className="feature-desc">
                  MCP server exposes your design system to AI assistants. Constraints prevent invalid combinations before they're generated.
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">⚡</span>
                <div className="feature-title">Per-Prop Selectors</div>
                <div className="feature-desc">
                  No combinatorial explosion. Each prop generates one CSS selector. 5 props with 4 values each = 20 rules, not 1,024.
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌗</span>
                <div className="feature-title">Dark Mode Built In</div>
                <div className="feature-desc">
                  Define dark tokens alongside light tokens. The compiler generates both <code>@media</code> queries and <code>.dark</code> class overrides.
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🔒</span>
                <div className="feature-title">Constraint Engine</div>
                <div className="feature-desc">
                  <code>when(&#123; importance: 'ghost' &#125;).forbid(['state'])</code> — invalid combinations are caught at compile time.
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📦</span>
                <div className="feature-title">Tiny Output</div>
                <div className="feature-desc">
                  Core is 34KB. React components are 10KB. The entire framework ships less CSS than most component libraries' reset.
                </div>
              </div>
            </div>
          </Stack>
        </div>
      </section>

      {/* Component Showcase */}
      <section id="components" className="section">
        <div className="site-container">
          <Stack gap="loose">
            <div style={{ textAlign: 'center' }}>
              <Text size="2xl" weight="bold" align="center">Live Components</Text>
              <Text size="lg" color="subtle" align="center">These are real Intent components. Toggle dark mode to see token switching.</Text>
            </div>

            <Surface elevation="medium" padding="loose" radius="lg" background="default">
              <Stack gap="loose">
                {/* Buttons */}
                <div className="showcase-section">
                  <div className="showcase-label">Buttons</div>
                  <div className="showcase-row">
                    <Button importance="primary" size="sm">Primary SM</Button>
                    <Button importance="primary" size="md">Primary MD</Button>
                    <Button importance="primary" size="lg">Primary LG</Button>
                    <Button importance="secondary" size="md">Secondary</Button>
                    <Button importance="ghost" size="md">Ghost</Button>
                    <Button importance="danger" size="md">Danger</Button>
                  </div>
                </div>

                {/* Text */}
                <div className="showcase-section">
                  <div className="showcase-label">Typography</div>
                  <Stack gap="compact">
                    <Text size="2xl" weight="bold">Heading 2XL Bold</Text>
                    <Text size="xl" weight="semibold">Heading XL Semibold</Text>
                    <Text size="lg" weight="medium">Body Large Medium</Text>
                    <Text size="md">Body Medium — default size for reading</Text>
                    <Text size="sm" color="subtle">Caption Small Subtle</Text>
                    <Text size="xs" color="muted">Label XS Muted</Text>
                  </Stack>
                </div>

                {/* Badges */}
                <div className="showcase-section">
                  <div className="showcase-label">Badges</div>
                  <div className="showcase-row">
                    <Badge importance="default" size="sm">Default</Badge>
                    <Badge importance="primary" size="sm">Primary</Badge>
                    <Badge importance="success" size="sm">Success</Badge>
                    <Badge importance="warning" size="sm">Warning</Badge>
                    <Badge importance="error" size="sm">Error</Badge>
                    <Badge importance="primary" size="md">Size MD</Badge>
                  </div>
                </div>

                {/* Surfaces */}
                <div className="showcase-section">
                  <div className="showcase-label">Surfaces</div>
                  <Stack direction="row" gap="normal">
                    <Surface elevation="none" padding="normal" radius="md" background="subtle">
                      <Text size="sm">elevation=none</Text>
                    </Surface>
                    <Surface elevation="low" padding="normal" radius="md" background="default">
                      <Text size="sm">elevation=low</Text>
                    </Surface>
                    <Surface elevation="medium" padding="normal" radius="md" background="default">
                      <Text size="sm">elevation=medium</Text>
                    </Surface>
                    <Surface elevation="high" padding="normal" radius="md" background="default">
                      <Text size="sm">elevation=high</Text>
                    </Surface>
                  </Stack>
                </div>

                {/* Layout */}
                <div className="showcase-section">
                  <div className="showcase-label">Stack Layout</div>
                  <Surface elevation="low" padding="normal" radius="md" background="subtle">
                    <Stack direction="row" gap="normal" align="center" justify="between">
                      <Stack direction="row" gap="compact" align="center">
                        <Badge importance="success">Live</Badge>
                        <Text size="sm" weight="medium">intent-core@0.1.0</Text>
                      </Stack>
                      <Text size="sm" color="subtle">Published today</Text>
                      <Button importance="ghost" size="sm">
                        <a href="https://npmjs.com/package/intent-core" target="_blank" rel="noopener" style={{ color: 'inherit' }}>
                          View on npm →
                        </a>
                      </Button>
                    </Stack>
                  </Surface>
                </div>
              </Stack>
            </Surface>
          </Stack>
        </div>
      </section>

      {/* Get Started */}
      <section className="section">
        <div className="site-container">
          <Stack gap="loose" align="center">
            <div style={{ textAlign: 'center' }}>
              <Text size="2xl" weight="bold" align="center">Get Started</Text>
              <Text size="lg" color="subtle" align="center">Three commands to a complete design system.</Text>
            </div>
            <div className="comparison-grid" style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
              <div className="code-panel" style={{ gridColumn: '1 / -1' }}>
                <div className="code-panel-header">
                  <span>Terminal</span>
                </div>
                <pre><code><span className="code-comment"># Install</span>
                  <span className="code-keyword">npm install</span> intent-core intent-react
                  <span className="code-keyword">npm install</span> -D intentcss-cli

                  <span className="code-comment"># Scaffold a complete design system</span>
                  <span className="code-keyword">npx</span> intent init

                  <span className="code-comment"># Compile schema to CSS</span>
                  <span className="code-keyword">npx</span> intent compile

                  <span className="code-comment"># Import and use</span>
                  <span className="code-keyword">import</span> {'{'} <span className="code-component">Button</span> {'}'} from <span className="code-string">'intent-react'</span>;
                </code></pre>
              </div>
            </div>

            <Stack gap="normal" align="center">
              <Text size="sm" color="muted" align="center">
                4 packages • 63 tests • MIT License
              </Text>
              <Stack direction="row" gap="compact" align="center" justify="center">
                <a href="https://npmjs.com/package/intent-core" target="_blank" rel="noopener">
                  <Badge importance="default" size="sm">intent-core</Badge>
                </a>
                <a href="https://npmjs.com/package/intent-react" target="_blank" rel="noopener">
                  <Badge importance="default" size="sm">intent-react</Badge>
                </a>
                <a href="https://npmjs.com/package/intentcss-cli" target="_blank" rel="noopener">
                  <Badge importance="default" size="sm">intentcss-cli</Badge>
                </a>
                <a href="https://npmjs.com/package/intent-mcp" target="_blank" rel="noopener">
                  <Badge importance="default" size="sm">intent-mcp</Badge>
                </a>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-container">
          <Text size="sm" color="muted" align="center">
            Built with Intent — this entire page uses Intent components.
          </Text>
        </div>
      </footer>
    </div>
  );
}

export default App;
