// ============================================================================
// Layout Components
// ============================================================================

/**
 * Intent Layout Components
 * 
 * A complete set of layout primitives for building responsive interfaces.
 * 
 * @example
 * ```tsx
 * import { Container, Grid, Box, Center } from 'intent-react/layout';
 * 
 * function Page() {
 *   return (
 *     <Container size="lg">
 *       <Grid columns="3" gap="4">
 *         <Box>Content 1</Box>
 *         <Box>Content 2</Box>
 *         <Box>Content 3</Box>
 *       </Grid>
 *       <Center height="screen">
 *         <h1>Hero</h1>
 *       </Center>
 *     </Container>
 *   );
 * }
 * ```
 */

export { Container, type ContainerProps } from './Container.js';
export { Grid, GridItem, type GridProps, type GridItemProps } from './Grid.js';
export { Box, type BoxProps } from './Box.js';
export { AspectRatio, type AspectRatioProps } from './AspectRatio.js';
export { Center, type CenterProps } from './Center.js';
export { Spacer, type SpacerProps } from './Spacer.js';
export { Show, Hide, type ShowProps, type HideProps } from './Visibility.js';
