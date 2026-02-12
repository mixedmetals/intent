import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Types
// ============================================================================

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'contained' | 'separated';
  allowMultiple?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ============================================================================
// Context
// ============================================================================

interface AccordionContextValue {
  value: string[];
  onToggle: (itemValue: string) => void;
  variant: AccordionProps['variant'];
  registerItem: (value: string, disabled: boolean) => void;
  isExpanded: (value: string) => boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
}

// ============================================================================
// Accordion
// ============================================================================

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    variant = 'default',
    allowMultiple = false,
    defaultValue,
    value: controlledValue,
    onValueChange,
    className,
    children,
    ...props 
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      () => {
        if (defaultValue === undefined) return [];
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled 
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : uncontrolledValue;

    const handleToggle = React.useCallback((itemValue: string) => {
      let newValue: string[];
      
      if (allowMultiple) {
        newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];
      } else {
        newValue = value.includes(itemValue) ? [] : [itemValue];
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      
      onValueChange?.(allowMultiple ? newValue : newValue[0] || '');
    }, [value, allowMultiple, isControlled, onValueChange]);

    const isExpanded = React.useCallback((itemValue: string) => {
      return value.includes(itemValue);
    }, [value]);

    const registerItem = React.useCallback(() => {}, []);

    const contextValue = React.useMemo(
      () => ({ value, onToggle: handleToggle, variant, registerItem, isExpanded }),
      [value, handleToggle, variant, isExpanded]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={clsx('intent-accordion', className)}
          data-variant={variant}
          {...styleAttr(props)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

// ============================================================================
// AccordionItem
// ============================================================================

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { isExpanded, variant } = useAccordion();
    const expanded = isExpanded(value);

    return (
      <AccordionItemContext.Provider value={{ value, disabled, expanded }}>
        <div
          ref={ref}
          className={clsx('intent-accordion-item', className)}
          data-expanded={expanded}
          data-disabled={disabled}
          data-variant={variant}
          {...styleAttr(props)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

// ============================================================================
// Item Context
// ============================================================================

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  expanded: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within AccordionItem');
  }
  return context;
}

// ============================================================================
// AccordionTrigger
// ============================================================================

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { onToggle } = useAccordion();
    const { value, disabled, expanded } = useAccordionItem();

    return (
      <button
        ref={ref}
        type="button"
        className={clsx('intent-accordion-trigger', className)}
        disabled={disabled}
        aria-expanded={expanded}
        onClick={() => onToggle(value)}
        {...styleAttr(props)}
        {...props}
      >
        {children}
        <ChevronIcon expanded={expanded} />
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ============================================================================
// AccordionContent
// ============================================================================

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded } = useAccordionItem();

    if (!expanded) return null;

    return (
      <div
        ref={ref}
        className={clsx('intent-accordion-content', className)}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

// ============================================================================
// Chevron Icon
// ============================================================================

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className="intent-accordion-chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{
        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 200ms',
        flexShrink: 0,
      }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
