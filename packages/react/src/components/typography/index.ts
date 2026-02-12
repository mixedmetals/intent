// ============================================================================
// Typography Components
// ============================================================================

/**
 * Intent Typography Components
 * 
 * Comprehensive text and content components for all typography needs.
 * 
 * @example
 * ```tsx
 * import {
 *   Heading,
 *   Paragraph,
 *   Text,
 *   List,
 *   ListItem,
 *   Code,
 *   Quote,
 * } from 'intent-react/typography';
 * 
 * function Article() {
 *   return (
 *     <article>
 *       <Heading level="1">Article Title</Heading>
 *       <Paragraph variant="lead">
 *         Introduction paragraph with larger text.
 *       </Paragraph>
 *       <Paragraph>
 *         Body content with <Code>inline code</Code> and <Text weight="bold">bold text</Text>.
 *       </Paragraph>
 *       <List>
 *         <ListItem>First point</ListItem>
 *         <ListItem>Second point</ListItem>
 *       </List>
 *       <Quote cite="Author Name">
 *         A memorable quote from the article.
 *       </Quote>
 *     </article>
 *   );
 * }
 * ```
 */

export { Heading, H1, H2, H3, H4, H5, H6, type HeadingProps } from './Heading.js';
export { Paragraph, P, type ParagraphProps } from './Paragraph.js';
export { Text, type TextProps } from './Text.js';
export { List, ListItem, Ul, Ol, Li, type ListProps, type ListItemProps } from './List.js';
export { Code, type CodeProps } from './Code.js';
export { Quote, Blockquote, type QuoteProps } from './Quote.js';
export { Prose, type ProseProps } from './Prose.js';
export { Kbd, type KbdProps } from './Kbd.js';
export { Mark, Highlight, SearchHighlight, type MarkProps } from './Mark.js';
