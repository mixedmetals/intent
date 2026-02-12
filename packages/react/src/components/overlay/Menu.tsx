import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface MenuProps {
  /** Menu size */
  size?: 'sm' | 'md' | 'lg';
  /** Menu variant */
  variant?: 'default' | 'compact';
  /** Menu trigger element */
  children: React.ReactElement;
  /** Menu items */
  items?: MenuItemData[];
  /** Whether menu is open */
  isOpen?: boolean;
  /** Open handler */
  onOpen?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Item click handler */
  onSelect?: (value: string) => void;
  /** Additional className */
  className?: string;
}

export interface MenuItemData {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  shortcut?: string;
}

export interface MenuItemProps {
  /** Whether item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Item icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut */
  shortcut?: string;
  /** Item content */
  children: React.ReactNode;
}

/**
 * Menu - Dropdown menu system
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * // Basic menu
 * <Menu
 *   isOpen={isOpen}
 *   onOpen={() => setIsOpen(true)}
 *   onClose={() => setIsOpen(false)}
 *   items={[
 *     { value: 'edit', label: 'Edit' },
 *     { value: 'copy', label: 'Copy' },
 *     { value: 'delete', label: 'Delete', disabled: true },
 *   ]}
 * >
 *   <Button>Open Menu</Button>
 * </Menu>
 * 
 * // With icons and shortcuts
 * <Menu
 *   items={[
 *     { value: 'cut', label: 'Cut', icon: <Scissors />, shortcut: '⌘X' },
 *     { value: 'copy', label: 'Copy', icon: <Copy />, shortcut: '⌘C' },
 *     { value: 'paste', label: 'Paste', icon: <Clipboard />, shortcut: '⌘V' },
 *   ]}
 * >
 *   <Button>Edit</Button>
 * </Menu>
 * 
 * // Custom menu items
 * <Menu>
 *   <Button>Actions</Button>
 *   <MenuItem onClick={handleEdit}>Edit</MenuItem>
 *   <MenuItem onClick={handleDelete} disabled>Delete</MenuItem>
 *   <MenuItem shortcut="⌘S" onClick={handleSave}>Save</MenuItem>
 * </Menu>
 * ```
 */
export const Menu = createComponent<MenuProps>('Menu', {
  size: 'md',
  variant: 'default',
});

/**
 * MenuItem - Individual menu item
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  disabled,
  onClick,
  icon,
  shortcut,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-sm
        text-neutral-700 hover:bg-neutral-100
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="text-xs text-neutral-400 ml-4">{shortcut}</span>
      )}
    </button>
  );
};

export default Menu;
