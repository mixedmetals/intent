/**
 * Intent React
 * 
 * React integration for the Intent styling framework.
 * 
 * @example
 * ```tsx
 * import { Stack, Button, Text } from 'intent-react';
 * 
 * function App() {
 *   return (
 *     <Stack direction="column" gap="relaxed">
 *       <Text size="lg" weight="bold">Hello Intent</Text>
 *       <Stack direction="row" gap="normal">
 *         <Button importance="primary">Save</Button>
 *         <Button importance="secondary">Cancel</Button>
 *       </Stack>
 *     </Stack>
 *   );
 * }
 * ```
 */

// Components
export { Stack, VStack, HStack } from './components/Stack.js';
export { Button } from './components/Button.js';
export { Surface } from './components/Surface.js';
export { Card } from './components/Card.js';
export { Badge } from './components/Badge.js';
export { Divider } from './components/Divider.js';

// Layout Components
export {
  Container,
  Grid,
  GridItem,
  Box,
  AspectRatio,
  Center,
  Spacer,
  Show,
  Hide,
} from './components/layout/index.js';

// Typography Components
export {
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  P,
  Text,
  List,
  ListItem,
  Ul,
  Ol,
  Li,
  Code,
  Quote,
  Blockquote,
  Prose,
  Kbd,
  Mark,
  Highlight,
  SearchHighlight,
} from './components/typography/index.js';

// Form Components
export {
  Input,
  InputField,
  Textarea,
  TextareaField,
  Select,
  SelectField,
  Checkbox,
  CheckboxField,
  Radio,
  RadioField,
  Switch,
  SwitchField,
  Label,
  Field,
  Form,
  useFormContext,
  useFormField,
} from './components/form/index.js';

// Feedback Components
export {
  Alert,
  Progress,
  Spinner,
  Skeleton,
  SkeletonText,
  Toast,
  ToastProvider,
  useToast,
} from './components/feedback/index.js';

// Overlay Components
export {
  Modal,
  Drawer,
  Tooltip,
  Popover,
  Menu,
  MenuItem,
} from './components/overlay/index.js';

// Navigation Components
export {
  Tabs,
  Tab,
  TabPanel,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  Link,
  Nav,
  NavItem,
  Command,
  CommandDialog,
  Steps,
  Step,
  Sidebar,
  SidebarSection,
  SidebarItem,
  Navbar,
  NavbarItem,
} from './components/navigation/index.js';

// Data Display Components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Stat,
  StatLabel,
  StatValue,
  StatHelpText,
  StatGroup,
  Timeline,
  TimelineItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
  DescriptionGroup,
  Tree,
  TreeItem,
  TreeBranch,
  Calendar,
  CalendarDay,
  CardMedia,
  CardHeader,
  CardFooter,
  CardBody,
  HorizontalCard,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarGroup,
  AvatarBadge,
} from './components/data/index.js';

// Types
export type {
  IntentComponentProps,
  StackProps,
  ButtonProps,
  SurfaceProps,
  CardProps,
  BadgeProps,
  DividerProps,
} from './types.js';

// Layout Types
export type {
  ContainerProps,
  GridProps,
  GridItemProps,
  BoxProps,
  AspectRatioProps,
  CenterProps,
  SpacerProps,
  ShowProps,
  HideProps,
} from './components/layout/index.js';

// Typography Types
export type {
  HeadingProps,
  ParagraphProps,
  TextProps,
  ListProps,
  ListItemProps,
  CodeProps,
  QuoteProps,
  ProseProps,
  KbdProps,
  MarkProps,
} from './components/typography/index.js';

// Form Types
export type {
  InputProps,
  TextareaProps,
  SelectProps,
  SelectOption,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  LabelProps,
  FieldProps,
  FormProps,
  FormContextValue,
} from './components/form/index.js';

// Feedback Types
export type {
  AlertProps,
  ProgressProps,
  SpinnerProps,
  SkeletonProps,
  SkeletonTextProps,
  ToastProps,
  ToastItem,
  ToastProviderProps,
  ToastContextValue,
} from './components/feedback/index.js';

// Overlay Types
export type {
  ModalProps,
  DrawerProps,
  TooltipProps,
  PopoverProps,
  MenuProps,
  MenuItemProps,
  MenuItemData,
} from './components/overlay/index.js';

// Navigation Types
export type {
  TabsProps,
  TabProps,
  TabPanelProps,
  BreadcrumbsProps,
  BreadcrumbItemProps,
  PaginationProps,
  PaginationItemProps,
  LinkProps,
  NavProps,
  NavItemProps,
  CommandProps,
  CommandDialogProps,
  CommandItem,
  CommandSection,
  StepsProps,
  StepProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
  NavbarProps,
  NavbarItemProps,
} from './components/navigation/index.js';

// Data Display Types
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableCellProps,
  StatProps,
  StatLabelProps,
  StatValueProps,
  StatHelpTextProps,
  StatGroupProps,
  TimelineProps,
  TimelineItemProps,
  DescriptionListProps,
  DescriptionTermProps,
  DescriptionDetailProps,
  DescriptionGroupProps,
  TreeProps,
  TreeItemProps,
  TreeBranchProps,
  CalendarProps,
  CalendarDayProps,
  DayRenderProps,
  CardMediaProps,
  CardHeaderProps,
  CardFooterProps,
  CardBodyProps,
  HorizontalCardProps,
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AvatarProps,
  AvatarGroupProps,
  AvatarBadgeProps,
} from './components/data/index.js';

// Utils
export {
  intentPropsToDataAttributes,
  generateIntentClassName,
  applyDefaultProps,
  validateProps,
} from './utils/factory.js';

// Version
export const VERSION = '1.0.0';
