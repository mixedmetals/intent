import { describe, it, expect } from 'vitest';
import {
  calculateStats,
  analyzeBundle,
  compareBundleSizes,
  formatBytes,
} from './index.js';

describe('calculateStats', () => {
  it('should calculate average', () => {
    const stats = calculateStats([10, 20, 30]);
    expect(stats.avg).toBe(20);
  });
  
  it('should find min and max', () => {
    const stats = calculateStats([5, 10, 15, 20]);
    expect(stats.min).toBe(5);
    expect(stats.max).toBe(20);
  });
  
  it('should calculate standard deviation', () => {
    const stats = calculateStats([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(stats.stdDev).toBeGreaterThan(0);
  });
});

describe('analyzeBundle', () => {
  it('should count CSS rules', () => {
    const css = `
      .a { color: red; }
      .b { color: blue; }
      .c { color: green; }
    `;
    
    const analysis = analyzeBundle(css);
    expect(analysis.ruleCount).toBe(3);
  });
  
  it('should count CSS selectors', () => {
    const css = '.a, .b, .c { color: red; }';
    
    const analysis = analyzeBundle(css);
    expect(analysis.selectorCount).toBe(3);
  });
  
  it('should count CSS variables', () => {
    const css = `
      :root {
        --color-primary: #3B82F6;
        --color-secondary: #64748B;
      }
    `;
    
    const analysis = analyzeBundle(css);
    expect(analysis.variableCount).toBe(2);
  });
  
  it('should calculate sizes', () => {
    const css = '.test { color: red; background: blue; }';
    
    const analysis = analyzeBundle(css);
    expect(analysis.rawSize).toBeGreaterThan(0);
    expect(analysis.minifiedSize).toBeGreaterThan(0);
    expect(analysis.gzippedSize).toBeGreaterThan(0);
    expect(analysis.minifiedSize).toBeLessThanOrEqual(analysis.rawSize);
  });
});

describe('compareBundleSizes', () => {
  it('should compare Intent vs Tailwind', () => {
    const intentCSS = '.intent-btn { color: blue; }';
    const tailwindCSS = '.bg-blue-500 { background: blue; } .text-white { color: white; }';
    
    const comparison = compareBundleSizes(intentCSS, tailwindCSS);
    
    expect(comparison.intent).toBeDefined();
    expect(comparison.tailwind).toBeDefined();
    expect(comparison.savings).toBeDefined();
  });
  
  it('should calculate savings percentage', () => {
    const intentCSS = '.a { color: red; }';
    const tailwindCSS = '.a { color: red; } .b { color: blue; } .c { color: green; }';
    
    const comparison = compareBundleSizes(intentCSS, tailwindCSS);
    
    expect(comparison.savings.percentage).toBeGreaterThan(0);
  });
});

describe('formatBytes', () => {
  it('should format bytes', () => {
    const formatted = (formatBytes as any)(500);
    expect(formatted).toBe('500 B');
  });
  
  it('should format kilobytes', () => {
    const formatted = (formatBytes as any)(1536);
    expect(formatted).toBe('1.5 KB');
  });
  
  it('should format megabytes', () => {
    const formatted = (formatBytes as any)(2 * 1024 * 1024);
    expect(formatted).toBe('2.00 MB');
  });
});
