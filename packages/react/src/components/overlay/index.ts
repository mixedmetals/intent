// ============================================================================
// Overlay Components
// ============================================================================

/**
 * Intent Overlay Components
 * 
 * Modal dialogs, drawers, tooltips, and popovers.
 * 
 * @example
 * ```tsx
 * import { Modal, Drawer, Tooltip, Popover, Menu } from 'intent-react/overlay';
 * 
 * function OverlayDemo() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   return (
 *     <>
 *       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *         <p>Modal content</p>
 *       </Modal>
 *       
 *       <Tooltip label="Helpful info">
 *         <Button>Hover me</Button>
 *       </Tooltip>
 *       
 *       <Popover content="Popover content">
 *         <Button>Click me</Button>
 *       </Popover>
 *     </>
 *   );
 * }
 * ```
 */

export { Modal, type ModalProps } from './Modal.js';
export { Drawer, type DrawerProps } from './Drawer.js';
export { Tooltip, type TooltipProps } from './Tooltip.js';
export { Popover, type PopoverProps } from './Popover.js';
export { Menu, MenuItem, type MenuProps, type MenuItemProps, type MenuItemData } from './Menu.js';
