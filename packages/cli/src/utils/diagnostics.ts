/**
 * Diagnostics Formatter
 * 
 * Formats validation diagnostics for CLI output.
 */

export function formatDiagnostics(diagnostics: string[]): string {
  return diagnostics.map(d => `  ${d}`).join('\n');
}
