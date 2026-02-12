// ============================================================================
// Feedback Components
// ============================================================================

/**
 * Intent Feedback Components
 * 
 * Status indicators, loading states, and notifications.
 * 
 * @example
 * ```tsx
 * import { Alert, Progress, Spinner, Skeleton } from 'intent-react/feedback';
 * 
 * function StatusDemo() {
 *   return (
 *     <>
 *       <Alert status="success">
 *         Operation completed successfully!
 *       </Alert>
 *       
 *       <Progress value={75} showLabel />
 *       
 *       <Spinner size="lg" color="blue" />
 *       
 *       <Skeleton variant="circle" width="md" height="md" />
 *     </>
 *   );
 * }
 * ```
 */

export { Alert, type AlertProps } from './Alert.js';
export { Progress, type ProgressProps } from './Progress.js';
export { Spinner, type SpinnerProps } from './Spinner.js';
export { Skeleton, SkeletonText, type SkeletonProps, type SkeletonTextProps } from './Skeleton.js';
