import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Table Component
// ============================================================================

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Size of table cells */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'striped' | 'bordered' | 'ghost';
  /** Row density */
  density?: 'compact' | 'normal' | 'relaxed';
  /** Whether header is sticky */
  stickyHeader?: boolean;
  /** Whether footer is sticky */
  stickyFooter?: boolean;
  /** Whether table fills full width */
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ 
    size = 'md',
    variant = 'default',
    density = 'normal',
    stickyHeader = false,
    stickyFooter = false,
    fullWidth = true,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <table
        ref={ref}
        className={clsx(
          'intent-table',
          className
        )}
        data-size={size}
        data-variant={variant}
        data-density={density}
        data-sticky-header={stickyHeader}
        data-sticky-footer={stickyFooter}
        data-full-width={fullWidth}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </table>
    );
  }
);
Table.displayName = 'Table';

// ============================================================================
// TableHeader
// ============================================================================

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Whether header is sticky */
  sticky?: boolean;
  children: React.ReactNode;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ sticky = false, className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={clsx(
          'intent-table-header',
          className
        )}
        data-sticky={sticky}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </thead>
    );
  }
);
TableHeader.displayName = 'TableHeader';

// ============================================================================
// TableBody
// ============================================================================

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={clsx(
          'intent-table-body',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);
TableBody.displayName = 'TableBody';

// ============================================================================
// TableFooter
// ============================================================================

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={clsx(
          'intent-table-footer',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);
TableFooter.displayName = 'TableFooter';

// ============================================================================
// TableRow
// ============================================================================

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Whether row is selected */
  selected?: boolean;
  /** Whether row is disabled */
  disabled?: boolean;
  /** Whether row is hoverable */
  hoverable?: boolean;
  children: React.ReactNode;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ 
    selected = false,
    disabled = false,
    hoverable = true,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <tr
        ref={ref}
        className={clsx(
          'intent-table-row',
          className
        )}
        data-selected={selected}
        data-disabled={disabled}
        data-hoverable={hoverable}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'TableRow';

// ============================================================================
// TableCell (th or td)
// ============================================================================

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Padding variant */
  padding?: 'normal' | 'checkbox' | 'none';
  /** Whether this is a header cell */
  header?: boolean;
  children?: React.ReactNode;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ 
    align = 'left',
    padding = 'normal',
    header = false,
    className,
    children,
    ...props 
  }, ref) => {
    const Component = header ? 'th' : 'td';
    return (
      <Component
        ref={ref}
        className={clsx(
          'intent-table-cell',
          className
        )}
        data-align={align}
        data-padding={padding}
        data-header={header}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
TableCell.displayName = 'TableCell';
