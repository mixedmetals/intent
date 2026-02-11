// ============================================================================
// Bundle Size Dashboard
// ============================================================================

import { analyzeBundle, type BundleAnalysis } from './index.js';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

// ============================================================================
// Types
// ============================================================================

export interface SizeSnapshot {
  /** Timestamp */
  timestamp: number;
  /** Git commit hash (if available) */
  commit?: string;
  /** Git branch */
  branch?: string;
  /** Bundle analysis */
  analysis: BundleAnalysis;
  /** Component count */
  componentCount: number;
  /** Token count */
  tokenCount: number;
  /** Intent version */
  version: string;
}

export interface DashboardConfig {
  /** Directory to store dashboard data */
  dataDir: string;
  /** Maximum number of snapshots to keep */
  maxSnapshots: number;
  /** Threshold for size warnings (percentage increase) */
  warningThreshold: number;
  /** Threshold for size errors (percentage increase) */
  errorThreshold: number;
}

export interface SizeTrend {
  /** Size change from previous snapshot */
  change: number;
  /** Percentage change */
  percentage: number;
  /** Trend direction */
  direction: 'increase' | 'decrease' | 'stable';
  /** Alert level */
  alert: 'none' | 'warning' | 'error';
}

export interface DashboardReport {
  /** Current snapshot */
  current: SizeSnapshot;
  /** Previous snapshot for comparison */
  previous?: SizeSnapshot;
  /** Trend analysis */
  trend: SizeTrend;
  /** All historical snapshots */
  history: SizeSnapshot[];
  /** Recommendations */
  recommendations: string[];
}

// ============================================================================
// Configuration
// ============================================================================

export const defaultDashboardConfig: DashboardConfig = {
  dataDir: './.intent/dashboard',
  maxSnapshots: 100,
  warningThreshold: 10,  // 10% increase
  errorThreshold: 25,    // 25% increase
};

export function createDashboardConfig(
  overrides: Partial<DashboardConfig> = {}
): DashboardConfig {
  return {
    ...defaultDashboardConfig,
    ...overrides,
  };
}

// ============================================================================
// Snapshot Management
// ============================================================================

const SNAPSHOTS_FILE = 'snapshots.json';

/**
 * Get snapshots file path
 */
function getSnapshotsPath(config: DashboardConfig): string {
  return join(config.dataDir, SNAPSHOTS_FILE);
}

/**
 * Load all snapshots
 */
export function loadSnapshots(config: DashboardConfig): SizeSnapshot[] {
  const path = getSnapshotsPath(config);
  
  if (!existsSync(path)) {
    return [];
  }
  
  try {
    const data = readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Save snapshots
 */
export function saveSnapshots(
  snapshots: SizeSnapshot[],
  config: DashboardConfig
): void {
  const path = getSnapshotsPath(config);
  ensureDir(dirname(path));
  
  // Trim to max snapshots
  const trimmed = snapshots.slice(-config.maxSnapshots);
  
  writeFileSync(path, JSON.stringify(trimmed, null, 2));
}

/**
 * Add a new snapshot
 */
export function addSnapshot(
  snapshot: SizeSnapshot,
  config: DashboardConfig
): void {
  const snapshots = loadSnapshots(config);
  snapshots.push(snapshot);
  saveSnapshots(snapshots, config);
}

/**
 * Get latest snapshot
 */
export function getLatestSnapshot(
  config: DashboardConfig
): SizeSnapshot | undefined {
  const snapshots = loadSnapshots(config);
  return snapshots[snapshots.length - 1];
}

// ============================================================================
// Trend Analysis
// ============================================================================

/**
 * Calculate trend between two snapshots
 */
export function calculateTrend(
  current: SizeSnapshot,
  previous: SizeSnapshot,
  config: DashboardConfig
): SizeTrend {
  const change = current.analysis.gzippedSize - previous.analysis.gzippedSize;
  const percentage = previous.analysis.gzippedSize > 0
    ? (change / previous.analysis.gzippedSize) * 100
    : 0;
  
  let direction: SizeTrend['direction'];
  if (Math.abs(percentage) < 1) {
    direction = 'stable';
  } else if (change > 0) {
    direction = 'increase';
  } else {
    direction = 'decrease';
  }
  
  let alert: SizeTrend['alert'] = 'none';
  if (percentage >= config.errorThreshold) {
    alert = 'error';
  } else if (percentage >= config.warningThreshold) {
    alert = 'warning';
  }
  
  return {
    change,
    percentage,
    direction,
    alert,
  };
}

/**
 * Generate recommendations based on analysis
 */
export function generateRecommendations(
  report: DashboardReport
): string[] {
  const recommendations: string[] = [];
  const { current, trend } = report;
  
  // Size alerts
  if (trend.alert === 'error') {
    recommendations.push(
      `⚠️ Bundle size increased by ${trend.percentage.toFixed(1)}%. Consider reviewing recent changes.`
    );
  } else if (trend.alert === 'warning') {
    recommendations.push(
      `⚡ Bundle size increased by ${trend.percentage.toFixed(1)}%. Monitor for further growth.`
    );
  }
  
  // Selector count
  if (current.analysis.selectorCount > 1000) {
    recommendations.push(
      `🎯 High selector count (${current.analysis.selectorCount}). Consider component consolidation.`
    );
  }
  
  // Variable count
  if (current.analysis.variableCount > 200) {
    recommendations.push(
      `🎨 Many CSS variables (${current.analysis.variableCount}). Check for unused tokens.`
    );
  }
  
  // Minification ratio
  const minRatio = current.analysis.minifiedSize / current.analysis.rawSize;
  if (minRatio > 0.9) {
    recommendations.push(
      `📦 Low minification ratio (${(minRatio * 100).toFixed(1)}%). Check for excessive comments.`
    );
  }
  
  // Positive trends
  if (trend.direction === 'decrease') {
    recommendations.push(
      `✅ Bundle size decreased by ${Math.abs(trend.percentage).toFixed(1)}%. Great job!`
    );
  }
  
  return recommendations;
}

// ============================================================================
// Report Generation
// ============================================================================

/**
 * Generate dashboard report
 */
export function generateReport(
  css: string,
  componentCount: number,
  tokenCount: number,
  config: DashboardConfig,
  metadata?: { commit?: string; branch?: string; version?: string }
): DashboardReport {
  const analysis = analyzeBundle(css);
  
  const current: SizeSnapshot = {
    timestamp: Date.now(),
    commit: metadata?.commit || getGitCommit(),
    branch: metadata?.branch || getGitBranch(),
    analysis,
    componentCount,
    tokenCount,
    version: metadata?.version || '0.1.0',
  };
  
  // Add to history
  addSnapshot(current, config);
  
  // Load full history
  const history = loadSnapshots(config);
  
  // Get previous for comparison
  const previous = history.length > 1 ? history[history.length - 2] : undefined;
  
  // Calculate trend
  const trend = previous
    ? calculateTrend(current, previous, config)
    : {
        change: 0,
        percentage: 0,
        direction: 'stable' as const,
        alert: 'none' as const,
      };
  
  const report: DashboardReport = {
    current,
    previous,
    trend,
    history,
    recommendations: [],
  };
  
  report.recommendations = generateRecommendations(report);
  
  return report;
}

/**
 * Format report as markdown
 */
export function formatDashboardReport(report: DashboardReport): string {
  const lines: string[] = [];
  const { current, trend, recommendations } = report;
  
  lines.push('# Bundle Size Dashboard\n');
  
  // Current stats
  lines.push('## Current Snapshot\n');
  lines.push(`**Date:** ${new Date(current.timestamp).toISOString()}`);
  if (current.commit) lines.push(`**Commit:** ${current.commit.slice(0, 7)}`);
  if (current.branch) lines.push(`**Branch:** ${current.branch}`);
  lines.push(`**Version:** ${current.version}\n`);
  
  // Size metrics
  lines.push('### Size Metrics\n');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Raw Size | ${formatBytes(current.analysis.rawSize)} |`);
  lines.push(`| Minified | ${formatBytes(current.analysis.minifiedSize)} |`);
  lines.push(`| Gzipped | ${formatBytes(current.analysis.gzippedSize)} |`);
  lines.push('');
  
  // Complexity metrics
  lines.push('### Complexity\n');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| CSS Rules | ${current.analysis.ruleCount} |`);
  lines.push(`| Selectors | ${current.analysis.selectorCount} |`);
  lines.push(`| Variables | ${current.analysis.variableCount} |`);
  lines.push(`| Components | ${current.componentCount} |`);
  lines.push(`| Tokens | ${current.tokenCount} |`);
  lines.push('');
  
  // Trend
  if (report.previous) {
    lines.push('## Trend\n');
    const emoji = trend.direction === 'increase' ? '📈' : trend.direction === 'decrease' ? '📉' : '➡️';
    lines.push(`${emoji} **${trend.direction.toUpperCase()}**`);
    lines.push(`- Change: ${trend.change > 0 ? '+' : ''}${formatBytes(trend.change)}`);
    lines.push(`- Percentage: ${trend.percentage > 0 ? '+' : ''}${trend.percentage.toFixed(2)}%`);
    
    if (trend.alert !== 'none') {
      lines.push(`- Alert: ${trend.alert.toUpperCase()}`);
    }
    lines.push('');
  }
  
  // Recommendations
  if (recommendations.length > 0) {
    lines.push('## Recommendations\n');
    for (const rec of recommendations) {
      lines.push(`- ${rec}`);
    }
    lines.push('');
  }
  
  // History
  if (report.history.length > 1) {
    lines.push('## History (Last 10)\n');
    lines.push('| Date | Gzipped Size | Components |');
    lines.push('|------|--------------|------------|');
    
    const recentHistory = report.history.slice(-10);
    for (const snapshot of recentHistory) {
      const date = new Date(snapshot.timestamp).toLocaleDateString();
      lines.push(`| ${date} | ${formatBytes(snapshot.analysis.gzippedSize)} | ${snapshot.componentCount} |`);
    }
  }
  
  return lines.join('\n');
}

/**
 * Generate HTML dashboard
 */
export function generateHTMLDashboard(report: DashboardReport): string {
  const { current, history } = report;
  
  // Prepare chart data
  const chartData = history.map(s => ({
    date: new Date(s.timestamp).toLocaleDateString(),
    size: s.analysis.gzippedSize,
    components: s.componentCount,
  }));
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Intent Bundle Size Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #1a1a1a;
      margin-bottom: 2rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .card h2 {
      font-size: 0.875rem;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .card .value {
      font-size: 2rem;
      font-weight: 600;
      color: #1a1a1a;
    }
    .card .change {
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .change.positive { color: #22c55e; }
    .change.negative { color: #ef4444; }
    .chart-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      height: 400px;
    }
    .recommendations {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: 1.5rem;
    }
    .recommendations ul {
      list-style: none;
      margin-top: 1rem;
    }
    .recommendations li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .recommendations li:last-child {
      border-bottom: none;
    }
    .alert {
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
    }
    .alert.warning { background: #fef3c7; color: #92400e; }
    .alert.error { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 Intent Bundle Size Dashboard</h1>
    
    ${report.trend.alert !== 'none' ? `
    <div class="alert ${report.trend.alert}">
      Bundle size ${report.trend.direction} by ${Math.abs(report.trend.percentage).toFixed(1)}%
    </div>
    ` : ''}
    
    <div class="grid">
      <div class="card">
        <h2>Gzipped Size</h2>
        <div class="value">${formatBytes(current.analysis.gzippedSize)}</div>
        ${report.previous ? `
        <div class="change ${report.trend.change <= 0 ? 'positive' : 'negative'}">
          ${report.trend.change > 0 ? '+' : ''}${formatBytes(report.trend.change)}
          (${report.trend.percentage > 0 ? '+' : ''}${report.trend.percentage.toFixed(1)}%)
        </div>
        ` : ''}
      </div>
      
      <div class="card">
        <h2>CSS Rules</h2>
        <div class="value">${current.analysis.ruleCount.toLocaleString()}</div>
      </div>
      
      <div class="card">
        <h2>Components</h2>
        <div class="value">${current.componentCount}</div>
      </div>
      
      <div class="card">
        <h2>Selectors</h2>
        <div class="value">${current.analysis.selectorCount.toLocaleString()}</div>
      </div>
    </div>
    
    <div class="chart-container">
      <canvas id="sizeChart"></canvas>
    </div>
    
    ${report.recommendations.length > 0 ? `
    <div class="recommendations">
      <h2>Recommendations</h2>
      <ul>
        ${report.recommendations.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
  </div>
  
  <script>
    const ctx = document.getElementById('sizeChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(chartData.map(d => d.date))},
        datasets: [{
          label: 'Gzipped Size (bytes)',
          data: ${JSON.stringify(chartData.map(d => d.size))},
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Bundle Size History'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value >= 1024 ? (value/1024).toFixed(1) + ' KB' : value + ' B';
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;
}

// ============================================================================
// Utilities
// ============================================================================

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getGitCommit(): string | undefined {
  try {
    return require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}

function getGitBranch(): string | undefined {
  try {
    return require('child_process')
      .execSync('git branch --show-current')
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}

// ============================================================================
// CLI Output
// ============================================================================

/**
 * Print dashboard report to console
 */
export function printDashboard(report: DashboardReport): void {
  console.log(formatDashboardReport(report));
}

/**
 * Save HTML dashboard
 */
export function saveHTMLDashboard(
  report: DashboardReport,
  config: DashboardConfig,
  filename = 'index.html'
): void {
  const html = generateHTMLDashboard(report);
  const path = join(config.dataDir, filename);
  ensureDir(dirname(path));
  writeFileSync(path, html);
  console.log(`📊 Dashboard saved to: ${path}`);
}
