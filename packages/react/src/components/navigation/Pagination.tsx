import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Pagination Component
// ============================================================================

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of pagination items */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'simple' | 'minimal';
  /** Current page number */
  page?: number;
  /** Total number of pages */
  totalPages?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Whether to show first/last buttons */
  showFirstLast?: boolean;
  /** Number of sibling pages to show */
  siblingCount?: number;
  children?: React.ReactNode;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    size = 'md',
    variant = 'default',
    page = 1,
    totalPages = 1,
    onPageChange,
    showFirstLast = false,
    siblingCount = 1,
    className,
    children,
    ...props 
  }, ref) => {
    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
        onPageChange?.(newPage);
      }
    };
    
    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      
      const leftSibling = Math.max(page - siblingCount, 1);
      const rightSibling = Math.min(page + siblingCount, totalPages);
      
      const showLeftEllipsis = leftSibling > 2;
      const showRightEllipsis = rightSibling < totalPages - 1;
      
      // Always show first page
      pages.push(1);
      
      // Left ellipsis
      if (showLeftEllipsis) {
        pages.push('...');
      } else if (leftSibling > 2) {
        for (let i = 2; i < leftSibling; i++) {
          pages.push(i);
        }
      }
      
      // Middle pages
      for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Right ellipsis
      if (showRightEllipsis) {
        pages.push('...');
      } else if (rightSibling < totalPages - 1) {
        for (let i = rightSibling + 1; i < totalPages; i++) {
          pages.push(i);
        }
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    };
    
    // If children provided, render them directly
    if (children) {
      const clonedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === PaginationItem) {
          return React.cloneElement(child as React.ReactElement<PaginationItemProps>, {
            size,
          });
        }
        return child;
      });
      
      return (
        <nav aria-label="Pagination">
          <div
            ref={ref}
            className={clsx(
              'intent-pagination',
              className
            )}
            data-size={size}
            data-variant={variant}
            {...styleAttr(props)}
            {...props}
          >
            {clonedChildren}
          </div>
        </nav>
      );
    }
    
    const pageNumbers = getPageNumbers();
    
    return (
      <nav aria-label="Pagination">
        <div
          ref={ref}
          className={clsx(
            'intent-pagination',
            className
          )}
          data-size={size}
          data-variant={variant}
          {...styleAttr(props)}
          {...props}
        >
          {showFirstLast && (
            <PaginationItem
              size={size}
              disabled={page === 1}
              onClick={() => handlePageChange(1)}
              aria-label="Go to first page"
            >
              «
            </PaginationItem>
          )}
          
          <PaginationItem
            size={size}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            aria-label="Go to previous page"
          >
            ‹
          </PaginationItem>
          
          {pageNumbers.map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <span className="intent-pagination-ellipsis">…</span>
              ) : (
                <PaginationItem
                  size={size}
                  selected={page === pageNum}
                  onClick={() => handlePageChange(pageNum as number)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={page === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
          
          <PaginationItem
            size={size}
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            aria-label="Go to next page"
          >
            ›
          </PaginationItem>
          
          {showFirstLast && (
            <PaginationItem
              size={size}
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
              aria-label="Go to last page"
            >
              »
            </PaginationItem>
          )}
        </div>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

// ============================================================================
// PaginationItem Component
// ============================================================================

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this page is currently selected */
  selected?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Size of the item */
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ 
    selected = false,
    disabled = false,
    size,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'intent-pagination-item',
          className
        )}
        data-selected={selected}
        data-disabled={disabled}
        data-size={size}
        disabled={disabled}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PaginationItem.displayName = 'PaginationItem';
