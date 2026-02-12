import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Types
// ============================================================================

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  section?: string;
  onSelect?: () => void;
}

export interface CommandSection {
  id: string;
  label: string;
  items: CommandItem[];
}

// ============================================================================
// Command Component
// ============================================================================

export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Sections of commands */
  sections?: CommandSection[];
  /** Flat array of items (alternative to sections) */
  items?: CommandItem[];
  /** Search placeholder */
  placeholder?: string;
  /** Current search value */
  search?: string;
  /** Callback when search changes */
  onSearchChange?: (value: string) => void;
  /** Callback when an item is selected */
  onSelect?: (item: CommandItem) => void;
  /** Whether the command palette is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Empty state message */
  emptyMessage?: string;
  children?: React.ReactNode;
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ 
    sections,
    items,
    placeholder = 'Type a command or search...',
    search: controlledSearch,
    onSearchChange,
    onSelect,
    open = true,
    onOpenChange,
    emptyMessage = 'No results found.',
    className,
    children,
    ...props 
  }, ref) => {
    const [internalSearch, setInternalSearch] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const searchRef = React.useRef<HTMLInputElement>(null);
    
    const search = controlledSearch !== undefined ? controlledSearch : internalSearch;
    
    // Flatten items for keyboard navigation
    const allItems = React.useMemo(() => {
      if (items) return items;
      if (sections) {
        return sections.flatMap(section => 
          section.items.map(item => ({ ...item, section: section.label }))
        );
      }
      return [];
    }, [items, sections]);
    
    // Filter items based on search
    const filteredItems = React.useMemo(() => {
      if (!search) return allItems;
      const query = search.toLowerCase();
      return allItems.filter(item => 
        item.label.toLowerCase().includes(query) ||
        item.section?.toLowerCase().includes(query)
      );
    }, [allItems, search]);
    
    // Group filtered items by section
    const groupedItems = React.useMemo(() => {
      const groups: Record<string, CommandItem[]> = {};
      filteredItems.forEach(item => {
        const section = item.section || 'Other';
        if (!groups[section]) groups[section] = [];
        groups[section].push(item);
      });
      return groups;
    }, [filteredItems]);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (controlledSearch === undefined) {
        setInternalSearch(value);
      }
      onSearchChange?.(value);
      setSelectedIndex(0);
    };
    
    const handleItemSelect = (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      onSelect?.(item);
      onOpenChange?.(false);
    };
    
    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleItemSelect(filteredItems[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onOpenChange?.(false);
          break;
      }
    };
    
    // Focus search input on open
    React.useEffect(() => {
      if (open) {
        searchRef.current?.focus();
      }
    }, [open]);
    
    if (!open) return null;
    
    // If children provided, render them directly
    if (children) {
      return (
        <div
          ref={ref}
          className={clsx(
            'intent-command',
            className
          )}
          {...styleAttr(props)}
          {...props}
        >
          {children}
        </div>
      );
    }
    
    let itemIndex = 0;
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-command',
          className
        )}
        onKeyDown={handleKeyDown}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-command-input-wrapper">
          <span className="intent-command-search-icon">⌘</span>
          <input
            ref={searchRef}
            type="text"
            className="intent-command-input"
            placeholder={placeholder}
            value={search}
            onChange={handleSearchChange}
            aria-autocomplete="list"
            aria-controls="command-list"
          />
          <kbd className="intent-command-kbd">ESC</kbd>
        </div>
        
        <div id="command-list" className="intent-command-list" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="intent-command-empty">{emptyMessage}</div>
          ) : (
            Object.entries(groupedItems).map(([sectionName, sectionItems]) => (
              <div key={sectionName} className="intent-command-section">
                <div className="intent-command-section-label">{sectionName}</div>
                {sectionItems.map(item => {
                  const index = itemIndex++;
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <button
                      key={item.id}
                      className={clsx(
                        'intent-command-item',
                        isSelected && 'intent-command-item-selected'
                      )}
                      role="option"
                      aria-selected={isSelected}
                      disabled={item.disabled}
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {item.icon && (
                        <span className="intent-command-item-icon">{item.icon}</span>
                      )}
                      <span className="intent-command-item-label">{item.label}</span>
                      {item.shortcut && (
                        <kbd className="intent-command-item-shortcut">{item.shortcut}</kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);
Command.displayName = 'Command';

// ============================================================================
// CommandDialog Component (wrapper with overlay)
// ============================================================================

export interface CommandDialogProps extends CommandProps {
  /** Backdrop click closes dialog */
  closeOnBackdropClick?: boolean;
}

export const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  ({ closeOnBackdropClick = true, onOpenChange, ...props }, ref) => {
    const handleBackdropClick = () => {
      if (closeOnBackdropClick) {
        onOpenChange?.(false);
      }
    };
    
    if (!props.open) return null;
    
    return (
      <div 
        className="intent-command-overlay"
        onClick={handleBackdropClick}
      >
        <div 
          className="intent-command-dialog"
          onClick={e => e.stopPropagation()}
        >
          <Command ref={ref} onOpenChange={onOpenChange} {...props} />
        </div>
      </div>
    );
  }
);
CommandDialog.displayName = 'CommandDialog';
