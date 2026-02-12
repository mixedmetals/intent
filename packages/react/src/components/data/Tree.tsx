import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Tree Component
// ============================================================================

export interface TreeProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Size of tree items */
  size?: 'sm' | 'md' | 'lg';
  /** Whether items are selectable */
  selectable?: boolean;
  /** Whether multiple items can be selected */
  multiSelect?: boolean;
  children: React.ReactNode;
}

export const Tree = React.forwardRef<HTMLUListElement, TreeProps>(
  ({ 
    size = 'md',
    selectable = false,
    multiSelect = false,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <ul
        ref={ref}
        role="tree"
        className={clsx(
          'intent-tree',
          className
        )}
        data-size={size}
        data-selectable={selectable}
        data-multi-select={multiSelect}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
Tree.displayName = 'Tree';

// ============================================================================
// TreeItem
// ============================================================================

export interface TreeItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Whether item is expanded */
  expanded?: boolean;
  /** Whether item is selected */
  selected?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item has children */
  hasChildren?: boolean;
  /** Nesting depth level */
  depth?: number;
  /** Icon element */
  icon?: React.ReactNode;
  /** Custom expand/collapse icon */
  expandIcon?: React.ReactNode;
  /** Collapse icon */
  collapseIcon?: React.ReactNode;
  /** Leaf icon (no children) */
  leafIcon?: React.ReactNode;
  /** Callback when expand/collapse is toggled */
  onToggle?: () => void;
  children?: React.ReactNode;
}

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  ({ 
    expanded = false,
    selected = false,
    disabled = false,
    hasChildren = false,
    depth = 0,
    icon,
    expandIcon,
    collapseIcon,
    leafIcon,
    onToggle,
    className,
    children,
    ...props 
  }, ref) => {
    const renderToggle = () => {
      if (!hasChildren) {
        return leafIcon ? (
          <span className="intent-tree-toggle intent-tree-toggle-leaf">{leafIcon}</span>
        ) : (
          <span className="intent-tree-toggle intent-tree-toggle-placeholder" />
        );
      }
      
      return (
        <button
          type="button"
          className="intent-tree-toggle"
          onClick={onToggle}
          disabled={disabled}
          aria-expanded={expanded}
          tabIndex={-1}
        >
          {expanded 
            ? (collapseIcon || <ChevronDown />)
            : (expandIcon || <ChevronRight />)
          }
        </button>
      );
    };
    
    return (
      <li
        ref={ref}
        role="treeitem"
        className={clsx(
          'intent-tree-item',
          className
        )}
        data-expanded={expanded}
        data-selected={selected}
        data-disabled={disabled}
        data-has-children={hasChildren}
        data-depth={depth}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
        style={{ '--tree-depth': depth } as React.CSSProperties}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-tree-item-content">
          {renderToggle()}
          {icon && <span className="intent-tree-item-icon">{icon}</span>}
          <span className="intent-tree-item-label">{children}</span>
        </div>
      </li>
    );
  }
);
TreeItem.displayName = 'TreeItem';

// ============================================================================
// TreeBranch - Container for child items
// ============================================================================

export interface TreeBranchProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Whether branch is expanded */
  expanded?: boolean;
  children: React.ReactNode;
}

export const TreeBranch = React.forwardRef<HTMLUListElement, TreeBranchProps>(
  ({ expanded = false, className, children, ...props }, ref) => {
    if (!expanded) return null;
    
    return (
      <ul
        ref={ref}
        role="group"
        className={clsx(
          'intent-tree-branch',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
TreeBranch.displayName = 'TreeBranch';

// ============================================================================
// Icons
// ============================================================================

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
