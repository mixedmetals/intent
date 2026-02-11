import { describe, it, expect, beforeEach } from 'vitest';
import {
  SourceMapBuilder,
  createComponentSourceMap,
  createInlineSourceMapComment,
  generateDebugReport,
} from './generator.js';
import type { CompilationTrace } from './types.js';

describe('SourceMapBuilder', () => {
  let builder: SourceMapBuilder;
  
  beforeEach(() => {
    builder = new SourceMapBuilder();
  });
  
  describe('startComponent', () => {
    it('should start tracking a component', () => {
      builder.startComponent('Button', 'Button.tsx');
      const map = builder.build();
      
      expect(map.component).toBe('Button');
      expect(map.sources).toContain('Button.tsx');
    });
  });
  
  describe('trackCSSGeneration', () => {
    it('should track CSS generation from schema', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button[data-importance="primary"]',
        [{ property: 'background', value: '#3B82F6' }],
        { component: 'Button', property: 'importance', value: 'primary' }
      );
      
      const trace = builder.getTrace();
      expect(trace).toHaveLength(1);
      expect(trace[0].component).toBe('Button');
      expect(trace[0].property).toBe('importance');
      expect(trace[0].value).toBe('primary');
    });
    
    it('should track debug info for each declaration', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button',
        [
          { property: 'background', value: '#3B82F6' },
          { property: 'color', value: '#FFFFFF' },
        ],
        { component: 'Button', property: 'importance', value: 'primary' }
      );
      
      const debugInfo = builder.getComponentDebugInfo('Button');
      expect(debugInfo).toHaveLength(2);
      expect(debugInfo[0].property).toBe('background');
      expect(debugInfo[1].property).toBe('color');
    });
    
    it('should track conditions in source info', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button[data-importance="primary"][data-size="lg"]',
        [{ property: 'padding', value: '1rem' }],
        { 
          component: 'Button', 
          property: 'importance', 
          value: 'primary',
          condition: 'size=lg'
        }
      );
      
      const debugInfo = builder.getDebugInfo(1);
      expect(debugInfo?.source.condition).toBe('size=lg');
    });
  });
  
  describe('trackPropertyMapping', () => {
    it('should track property to CSS mapping', () => {
      builder.trackPropertyMapping(
        'Button',
        'importance',
        'primary',
        '.intent-button[data-importance="primary"]',
        'background: #3B82F6; color: #FFFFFF;'
      );
      
      const trace = builder.getTrace();
      expect(trace).toHaveLength(1);
      expect(trace[0].generatedSelector).toBe('.intent-button[data-importance="primary"]');
      expect(trace[0].generatedDeclarations).toHaveLength(2);
    });
  });
  
  describe('build', () => {
    it('should build valid source map v3', () => {
      builder.startComponent('Button', 'Button.tsx');
      builder.addMapping(1, 0, 'Button.tsx', 10, 5, 'primary');
      
      const map = builder.build();
      
      expect(map.version).toBe(3);
      expect(map.component).toBe('Button');
      expect(map.sources).toEqual(['Button.tsx']);
      expect(map.names).toContain('primary');
    });
    
    it('should encode mappings in VLQ format', () => {
      builder.startComponent('Button');
      builder.addMapping(1, 0, 'source.ts', 1, 0);
      builder.addMapping(2, 0, 'source.ts', 2, 0);
      
      const map = builder.build();
      
      expect(map.mappings).toBeTruthy();
      expect(typeof map.mappings).toBe('string');
    });
  });
  
  describe('buildFull', () => {
    it('should build full compilation source map', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button',
        [{ property: 'padding', value: '0.5rem' }],
        { component: 'Button', property: 'size', value: 'md' }
      );
      
      const full = builder.buildFull();
      
      expect(full.version).toBe('3');
      expect(full.timestamp).toBeGreaterThan(0);
      expect(full.components.has('Button')).toBe(true);
      expect(full.debugInfo).toHaveLength(1);
      expect(full.trace).toHaveLength(1);
    });
  });
  
  describe('toDataUrl', () => {
    it('should generate valid data URL', () => {
      builder.startComponent('Button');
      const dataUrl = builder.toDataUrl();
      
      expect(dataUrl).toMatch(/^data:application\/json;base64,/);
      
      // Should be decodable
      const base64 = dataUrl.split(',')[1];
      const json = Buffer.from(base64, 'base64').toString();
      const parsed = JSON.parse(json);
      
      expect(parsed.version).toBe(3);
      expect(parsed.component).toBe('Button');
    });
  });
  
  describe('getDebugInfo', () => {
    it('should find debug info by line', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button',
        [{ property: 'padding', value: '0.5rem' }],
        { component: 'Button', property: 'size', value: 'md' }
      );
      
      const info = builder.getDebugInfo(1);
      
      expect(info).toBeDefined();
      expect(info?.property).toBe('padding');
    });
    
    it('should return undefined for unknown line', () => {
      const info = builder.getDebugInfo(999);
      expect(info).toBeUndefined();
    });
  });
  
  describe('getComponentDebugInfo', () => {
    it('should filter by component name', () => {
      builder.startComponent('Button');
      builder.trackCSSGeneration(
        '.intent-button',
        [{ property: 'padding', value: '0.5rem' }],
        { component: 'Button', property: 'size', value: 'md' }
      );
      
      const buttonInfo = builder.getComponentDebugInfo('Button');
      const otherInfo = builder.getComponentDebugInfo('Other');
      
      expect(buttonInfo).toHaveLength(1);
      expect(otherInfo).toHaveLength(0);
    });
  });
});

describe('createComponentSourceMap', () => {
  it('should create source map builder for component', () => {
    const schema = {
      name: 'Button',
      properties: {},
      constraints: [],
      mappings: {},
    };
    
    const builder = createComponentSourceMap(schema);
    
    expect(builder).toBeInstanceOf(SourceMapBuilder);
  });
});

describe('createInlineSourceMapComment', () => {
  it('should create CSS comment with source map', () => {
    const sourceMap = {
      version: 3,
      component: 'Button',
      sources: ['Button.tsx'],
      names: [],
      mappings: 'AAAA',
    };
    
    const comment = createInlineSourceMapComment(sourceMap as any);
    
    expect(comment).toMatch(/^\/\*# sourceMappingURL=data:application\/json;base64,/);
  });
});

describe('generateDebugReport', () => {
  it('should generate markdown debug report', () => {
    const trace: CompilationTrace[] = [
      {
        timestamp: Date.now(),
        component: 'Button',
        property: 'importance',
        value: 'primary',
        generatedSelector: '.intent-button[data-importance="primary"]',
        generatedDeclarations: [
          { property: 'background', value: '#3B82F6' },
        ],
      },
    ];
    
    const report = generateDebugReport(trace);
    
    expect(report).toContain('# Intent Compilation Debug Report');
    expect(report).toContain('## Component: Button');
    expect(report).toContain('### importance = "primary"');
    expect(report).toContain('.intent-button[data-importance="primary"]');
    expect(report).toContain('background: #3B82F6');
  });
  
  it('should group by component', () => {
    const trace: CompilationTrace[] = [
      {
        timestamp: Date.now(),
        component: 'Button',
        property: 'size',
        value: 'md',
        generatedSelector: '.intent-button',
        generatedDeclarations: [],
      },
      {
        timestamp: Date.now(),
        component: 'Card',
        property: 'elevation',
        value: 'low',
        generatedSelector: '.intent-card',
        generatedDeclarations: [],
      },
    ];
    
    const report = generateDebugReport(trace);
    
    expect(report).toContain('## Component: Button');
    expect(report).toContain('## Component: Card');
  });
});
