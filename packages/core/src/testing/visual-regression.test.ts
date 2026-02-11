import { describe, it, expect } from 'vitest';
import {
  generateTestHTML,
  generateVisualTestCombinations,
  generateVisualTestCases,
  getBaselinePath,
  getScreenshotPath,
  getDiffPath,
  createVisualRegressionConfig,
  defaultVisualRegressionConfig,
} from './visual-regression.js';
import { defineComponent, prop } from '../schema/define.js';
import type { DesignSystemConfig } from '../types/index.js';

const mockConfig: DesignSystemConfig = {
  name: 'TestSystem',
  tokens: {
    color: {
      'brand-primary': '#3B82F6',
      'brand-secondary': '#64748B',
    },
    space: {
      sm: '0.5rem',
      md: '1rem',
    },
  },
  components: {},
};

const ButtonComponent = defineComponent({
  name: 'Button',
  properties: {
    importance: prop.enum(['primary', 'secondary'], { required: true }),
    size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
  },
  constraints: [],
  mappings: {
    'importance=primary': { background: 'brand-primary' },
    'importance=secondary': { background: 'brand-secondary' },
    'size=sm': { padding: 'space-sm' },
    'size=md': { padding: 'space-md' },
  },
});

describe('generateTestHTML', () => {
  it('should generate valid HTML', () => {
    const html = generateTestHTML(
      ButtonComponent,
      { importance: 'primary', size: 'md' },
      '.button { color: red; }'
    );
    
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('data-importance="primary"');
    expect(html).toContain('data-size="md"');
    expect(html).toContain('.button { color: red; }');
  });
  
  it('should include dark mode class when specified', () => {
    const html = generateTestHTML(
      ButtonComponent,
      {},
      '',
      { darkMode: true }
    );
    
    expect(html).toContain('<html lang="en" class="dark">');
    expect(html).toContain('background: #0F172A');
  });
  
  it('should include test content for buttons', () => {
    const html = generateTestHTML(
      ButtonComponent,
      { importance: 'primary' },
      ''
    );
    
    expect(html).toContain('Button');
  });
});

describe('generateVisualTestCombinations', () => {
  it('should generate combinations for enum properties', () => {
    const combinations = generateVisualTestCombinations(ButtonComponent);
    
    expect(combinations.length).toBeGreaterThan(0);
    expect(combinations).toContainEqual(
      expect.objectContaining({ importance: 'primary' })
    );
    expect(combinations).toContainEqual(
      expect.objectContaining({ importance: 'secondary' })
    );
  });
  
  it('should include default values in combinations', () => {
    const combinations = generateVisualTestCombinations(ButtonComponent);
    
    // All combinations should have size default
    for (const combo of combinations) {
      expect(combo.size).toBeDefined();
    }
  });
  
  it('should respect maxCombinations limit', () => {
    const combinations = generateVisualTestCombinations(ButtonComponent, 2);
    
    expect(combinations.length).toBeLessThanOrEqual(2);
  });
});

describe('generateVisualTestCases', () => {
  it('should generate test cases with HTML', () => {
    const cases = generateVisualTestCases(ButtonComponent, mockConfig);
    
    expect(cases.length).toBeGreaterThan(0);
    expect(cases[0].html).toBeDefined();
    expect(cases[0].combination).toBeDefined();
    expect(cases[0].name).toBeDefined();
  });
  
  it('should include compiled CSS in HTML', () => {
    const cases = generateVisualTestCases(ButtonComponent, mockConfig);
    
    expect(cases[0].html).toContain('--intent-color-brand-primary');
  });
  
  it('should generate unique names for each combination', () => {
    const cases = generateVisualTestCases(ButtonComponent, mockConfig);
    const names = cases.map(c => c.name);
    const uniqueNames = new Set(names);
    
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe('Path Functions', () => {
  const config = createVisualRegressionConfig();
  
  describe('getBaselinePath', () => {
    it('should return correct path', () => {
      const path = getBaselinePath(config, 'Button', 'primary');
      
      expect(path).toContain(config.baselineDir);
      expect(path).toContain('Button');
      expect(path).toContain('primary.png');
    });
  });
  
  describe('getScreenshotPath', () => {
    it('should return correct path', () => {
      const path = getScreenshotPath(config, 'Button', 'primary');
      
      expect(path).toContain(config.screenshotDir);
      expect(path).toContain('Button');
      expect(path).toContain('primary.png');
    });
  });
  
  describe('getDiffPath', () => {
    it('should return correct path', () => {
      const path = getDiffPath(config, 'Button', 'primary');
      
      expect(path).toContain(config.diffDir);
      expect(path).toContain('Button');
      expect(path).toContain('primary.png');
    });
  });
});

describe('createVisualRegressionConfig', () => {
  it('should use default values', () => {
    const config = createVisualRegressionConfig();
    
    expect(config.threshold).toBe(defaultVisualRegressionConfig.threshold);
    expect(config.viewport).toEqual(defaultVisualRegressionConfig.viewport);
  });
  
  it('should override defaults', () => {
    const config = createVisualRegressionConfig({
      threshold: 0.05,
      viewport: { width: 1920, height: 1080 },
    });
    
    expect(config.threshold).toBe(0.05);
    expect(config.viewport).toEqual({ width: 1920, height: 1080 });
  });
  
  it('should keep unspecified defaults', () => {
    const config = createVisualRegressionConfig({ threshold: 0.02 });
    
    expect(config.threshold).toBe(0.02);
    expect(config.screenshotDir).toBe(defaultVisualRegressionConfig.screenshotDir);
  });
});

describe('Different Component Types', () => {
  it('should generate appropriate content for Input', () => {
    const InputComponent = defineComponent({
      name: 'Input',
      properties: { size: prop.enum(['sm', 'lg']) },
      constraints: [],
      mappings: {},
    });
    
    const html = generateTestHTML(InputComponent, { size: 'lg' }, '');
    
    expect(html).toContain('<input');
  });
  
  it('should generate appropriate content for Card', () => {
    const CardComponent = defineComponent({
      name: 'Card',
      properties: { elevation: prop.enum(['low', 'high']) },
      constraints: [],
      mappings: {},
    });
    
    const html = generateTestHTML(CardComponent, { elevation: 'low' }, '');
    
    expect(html).toContain('Card Title');
    expect(html).toContain('Card content');
  });
  
  it('should generate appropriate content for Badge', () => {
    const BadgeComponent = defineComponent({
      name: 'Badge',
      properties: { color: prop.enum(['red', 'blue']) },
      constraints: [],
      mappings: {},
    });
    
    const html = generateTestHTML(BadgeComponent, { color: 'red' }, '');
    
    expect(html).toContain('Badge');
  });
});
