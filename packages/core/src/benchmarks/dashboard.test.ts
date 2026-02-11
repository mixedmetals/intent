import { describe, it, expect, beforeEach } from 'vitest';
import {
  createDashboardConfig,
  loadSnapshots,
  saveSnapshots,
  addSnapshot,
  getLatestSnapshot,
  calculateTrend,
  generateRecommendations,
  type SizeSnapshot,
  type DashboardConfig,
} from './dashboard.js';

const mockConfig: DashboardConfig = {
  dataDir: '/tmp/intent-test-dashboard',
  maxSnapshots: 10,
  warningThreshold: 10,
  errorThreshold: 25,
};

const mockSnapshot = (overrides?: Partial<SizeSnapshot>): SizeSnapshot => ({
  timestamp: Date.now(),
  analysis: {
    rawSize: 10000,
    minifiedSize: 8000,
    gzippedSize: 2000,
    ruleCount: 100,
    selectorCount: 150,
    variableCount: 50,
  },
  componentCount: 8,
  tokenCount: 40,
  version: '0.1.0',
  ...overrides,
});

describe('createDashboardConfig', () => {
  it('should use defaults', () => {
    const config = createDashboardConfig();
    expect(config.maxSnapshots).toBe(100);
    expect(config.warningThreshold).toBe(10);
    expect(config.errorThreshold).toBe(25);
  });
  
  it('should override defaults', () => {
    const config = createDashboardConfig({ maxSnapshots: 50 });
    expect(config.maxSnapshots).toBe(50);
    expect(config.dataDir).toBe('./.intent/dashboard');
  });
});

describe('calculateTrend', () => {
  it('should calculate size increase', () => {
    const previous = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1000 } });
    const current = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1500 } });
    
    const trend = calculateTrend(current, previous, mockConfig);
    
    expect(trend.change).toBe(500);
    expect(trend.percentage).toBe(50);
    expect(trend.direction).toBe('increase');
    expect(trend.alert).toBe('error');
  });
  
  it('should calculate size decrease', () => {
    const previous = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 2000 } });
    const current = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1500 } });
    
    const trend = calculateTrend(current, previous, mockConfig);
    
    expect(trend.change).toBe(-500);
    expect(trend.direction).toBe('decrease');
  });
  
  it('should detect stable size', () => {
    const previous = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1000 } });
    const current = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1005 } });
    
    const trend = calculateTrend(current, previous, mockConfig);
    
    expect(trend.direction).toBe('stable');
  });
  
  it('should trigger warning at 10% increase', () => {
    const previous = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1000 } });
    const current = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1100 } });
    
    const trend = calculateTrend(current, previous, mockConfig);
    
    expect(trend.alert).toBe('warning');
  });
  
  it('should trigger error at 25% increase', () => {
    const previous = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1000 } });
    const current = mockSnapshot({ analysis: { ...mockSnapshot().analysis, gzippedSize: 1300 } });
    
    const trend = calculateTrend(current, previous, mockConfig);
    
    expect(trend.alert).toBe('error');
  });
});

describe('generateRecommendations', () => {
  it('should warn about size increase', () => {
    const report = {
      current: mockSnapshot(),
      previous: mockSnapshot(),
      trend: {
        change: 500,
        percentage: 50,
        direction: 'increase' as const,
        alert: 'error' as const,
      },
      history: [],
      recommendations: [],
    };
    
    const recs = generateRecommendations(report);
    
    expect(recs.some(r => r.includes('Bundle size increased'))).toBe(true);
  });
  
  it('should recommend on high selector count', () => {
    const report = {
      current: mockSnapshot({ analysis: { ...mockSnapshot().analysis, selectorCount: 1500 } }),
      previous: null,
      trend: { change: 0, percentage: 0, direction: 'stable' as const, alert: 'none' as const },
      history: [],
      recommendations: [],
    };
    
    const recs = generateRecommendations(report);
    
    expect(recs.some(r => r.includes('High selector count'))).toBe(true);
  });
  
  it('should recommend on many CSS variables', () => {
    const report = {
      current: mockSnapshot({ analysis: { ...mockSnapshot().analysis, variableCount: 250 } }),
      previous: null,
      trend: { change: 0, percentage: 0, direction: 'stable' as const, alert: 'none' as const },
      history: [],
      recommendations: [],
    };
    
    const recs = generateRecommendations(report);
    
    expect(recs.some(r => r.includes('Many CSS variables'))).toBe(true);
  });
  
  it('should praise size decrease', () => {
    const report = {
      current: mockSnapshot(),
      previous: mockSnapshot(),
      trend: {
        change: -500,
        percentage: -20,
        direction: 'decrease' as const,
        alert: 'none' as const,
      },
      history: [],
      recommendations: [],
    };
    
    const recs = generateRecommendations(report);
    
    expect(recs.some(r => r.includes('Bundle size decreased'))).toBe(true);
  });
});
