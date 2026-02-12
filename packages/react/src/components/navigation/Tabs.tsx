import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Tabs Component
// ============================================================================

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal or vertical tab layout */
  orientation?: 'horizontal' | 'vertical';
  /** Visual style variant */
  variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded';
  /** Size of the tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Alignment of tabs within container */
  align?: 'start' | 'center' | 'end';
  /** Whether tabs should fill the full width */
  fullWidth?: boolean;
  /** Currently selected tab index */
  value?: number;
  /** Callback when tab changes */
  onValueChange?: (value: number) => void;
  children: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    orientation = 'horizontal', 
    variant = 'line',
    size = 'md',
    align = 'start',
    fullWidth = false,
    value,
    onValueChange,
    className,
    children,
    ...props 
  }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(value ?? 0);
    
    const currentIndex = value !== undefined ? value : selectedIndex;
    
    const handleTabChange = (index: number) => {
      if (value === undefined) {
        setSelectedIndex(index);
      }
      onValueChange?.(index);
    };
    
    // Clone children to pass state
    const clonedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === TabList) {
        return React.cloneElement(child as React.ReactElement<TabListProps>, {
          selectedIndex: currentIndex,
          onTabSelect: handleTabChange,
          variant,
          size,
          align,
          fullWidth,
        });
      }
      if (React.isValidElement(child) && child.type === TabPanels) {
        return React.cloneElement(child as React.ReactElement<TabPanelsProps>, {
          selectedIndex: currentIndex,
        });
      }
      return child;
    });
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-tabs',
          className
        )}
        data-orientation={orientation}
        {...styleAttr(props)}
        {...props}
      >
        {clonedChildren}
      </div>
    );
  }
);
Tabs.displayName = 'Tabs';

// ============================================================================
// TabList
// ============================================================================

interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedIndex?: number;
  onTabSelect?: (index: number) => void;
  variant?: TabsProps['variant'];
  size?: TabsProps['size'];
  align?: TabsProps['align'];
  fullWidth?: boolean;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ 
    selectedIndex, 
    onTabSelect,
    variant,
    size,
    align,
    fullWidth,
    className,
    children,
    ...props 
  }, ref) => {
    const clonedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === Tab) {
        return React.cloneElement(child as React.ReactElement<TabProps>, {
          selected: selectedIndex === index,
          onSelect: () => onTabSelect?.(index),
          variant,
          size,
        });
      }
      return child;
    });
    
    return (
      <div
        ref={ref}
        role="tablist"
        className={clsx(
          'intent-tabs-list',
          className
        )}
        data-variant={variant}
        data-size={size}
        data-align={align}
        data-full-width={fullWidth}
        {...styleAttr(props)}
        {...props}
      >
        {clonedChildren}
      </div>
    );
  }
);
TabList.displayName = 'TabList';

// ============================================================================
// Tab
// ============================================================================

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this tab is selected */
  selected?: boolean;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Callback when tab is selected */
  onSelect?: () => void;
  /** Visual variant (passed from Tabs) */
  variant?: TabsProps['variant'];
  /** Size (passed from Tabs) */
  size?: TabsProps['size'];
  children: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ 
    selected = false,
    disabled = false,
    onSelect,
    variant,
    size,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        className={clsx(
          'intent-tab',
          className
        )}
        data-selected={selected}
        data-disabled={disabled}
        data-variant={variant}
        data-size={size}
        onClick={onSelect}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Tab.displayName = 'Tab';

// ============================================================================
// TabPanels
// ============================================================================

interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedIndex?: number;
}

const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ selectedIndex, className, children, ...props }, ref) => {
    const panels = React.Children.toArray(children);
    const selectedPanel = panels[selectedIndex ?? 0];
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-tabs-panels',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {selectedPanel}
      </div>
    );
  }
);
TabPanels.displayName = 'TabPanels';

// ============================================================================
// TabPanel
// ============================================================================

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={clsx(
          'intent-tab-panel',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = 'TabPanel';

// ============================================================================
// Compound Component Exports
// ============================================================================

export { TabList, TabPanels };
