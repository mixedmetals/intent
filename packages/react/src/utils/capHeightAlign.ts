/**
 * Cap-height alignment utility for icons
 * Ensures icons visually center with text
 */

export function capHeightAlign(size: string | number = '1em'): string {
  return `translateY(calc((${size} * -0.1)))`;
}

export default capHeightAlign;
