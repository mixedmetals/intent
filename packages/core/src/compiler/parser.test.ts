import { describe, it, expect } from 'vitest';
import { parseFile } from './parser.js';

describe('parseFile', () => {
  const parseOptions = {
    intentImports: ['intent-react'],
    componentNames: ['Button', 'Stack'],
  };

  it('should extract Button component usage', () => {
    const code = `
      import { Button } from 'intent-react';
      
      function App() {
        return <Button importance="primary" size="lg">Click</Button>;
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.usages).toHaveLength(1);
    expect(result.usages[0].component).toBe('Button');
    expect(result.usages[0].props).toMatchObject({
      importance: 'primary',
      size: 'lg',
    });
  });

  it('should extract Stack component usage', () => {
    const code = `
      import { Stack } from 'intent-react';
      
      function App() {
        return (
          <Stack direction="row" gap="normal" align="center">
            Content
          </Stack>
        );
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.usages).toHaveLength(1);
    expect(result.usages[0].component).toBe('Stack');
    expect(result.usages[0].props.direction).toBe('row');
    expect(result.usages[0].props.gap).toBe('normal');
  });

  it('should detect arbitrary Tailwind values', () => {
    const code = `
      import { Button } from 'intent-react';
      
      function App() {
        return <Button importance="primary" className="pt-[7px]">Bad</Button>;
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].code).toBe('ARBITRARY_VALUE');
    expect(result.issues[0].message).toContain('pt-[7px]');
  });

  it('should detect utility class usage', () => {
    const code = `
      import { Stack } from 'intent-react';
      
      function App() {
        return <Stack className="flex items-center">Bad</Stack>;
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].code).toBe('UTILITY_CLASS');
  });

  it('should ignore non-Intent components', () => {
    const code = `
      import { SomeOtherButton } from 'other-lib';
      
      function App() {
        return <SomeOtherButton className="flex">Click</SomeOtherButton>;
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.usages).toHaveLength(0);
    expect(result.issues).toHaveLength(0);
  });

  it('should handle renamed imports', () => {
    const code = `
      import { Button as IntentButton } from 'intent-react';
      
      function App() {
        return <IntentButton importance="secondary">Click</IntentButton>;
      }
    `;

    const result = parseFile('test.tsx', code, parseOptions);
    
    expect(result.usages).toHaveLength(1);
    expect(result.usages[0].component).toBe('Button');
  });
});
