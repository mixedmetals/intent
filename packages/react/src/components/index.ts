/**
 * Intent Component Exports - Core Components
 */

// Top 5 Components (Verified)
export { Button, ButtonSchema } from './Button.js';
export { Card, CardHeader, CardContent, CardFooter, CardSchema } from './Card.js';
export { Input, InputSchema, TextArea } from './Input.js';
export { Switch, SwitchSchema } from './Switch.js';
export { Modal, ModalHeader, ModalContent, ModalFooter, ModalSchema } from './Modal.js';

// Icon System
export { Icon, IconText, iconRegistry, getIcon, hasIcon, getIconNames } from './icon/index.js';
export type { IconProps, IconTextProps, IconDefinition, IconSize } from './icon/index.js';

// Data Grid (Ultimate Milled Test)
export { DataGrid, DataGridSchema } from './milled/DataGrid.js';

// Flat Components
export { Badge } from './flat/Badge.js';
export { Separator } from './flat/Separator.js';
export { Divider } from './flat/Divider.js';
export { Skeleton, SkeletonText, SkeletonCircle } from './flat/Skeleton.js';
export { Code, CodeBlock } from './flat/Code.js';
export { Blockquote } from './flat/Blockquote.js';
export { Mark, Highlight } from './flat/Highlight.js';
export { VisuallyHidden } from './flat/VisuallyHidden.js';
export { SkipLink } from './flat/SkipLink.js';

// Milled Components
export { Checkbox } from './milled/Checkbox.js';

// Hooks
export { useDensity, DensityContext } from '../hooks/useDensity.js';
export { useContainerDensity } from '../hooks/useContainerDensity.js';
export { useForm, createFormContext } from '../hooks/useForm.js';
export { useStagger, useStaggerGroup, StaggerPresets } from '../hooks/useStagger.js';

// Utils
export { cx, intentVariants } from '../utils/cx.js';
export { capHeightAlign } from '../utils/capHeightAlign.js';

// Registry
export { componentRegistry } from './registry.js';
export type { ComponentArchetype, ComponentSchema } from './registry.js';
