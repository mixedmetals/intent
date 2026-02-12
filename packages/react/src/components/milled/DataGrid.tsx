/**
 * ============================================================================
 * Data Grid Component - Ultimate Milled Archetype Test
 * ============================================================================
 * 
 * Tests: Density propagation, tabular alignment, cap-height icon alignment
 */

import React, { forwardRef, useState, useCallback, useMemo, createContext, useContext } from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../icon/Icon.js';
import { Checkbox } from './Checkbox.js';
import { Badge } from '../flat/Badge.js';

// ============================================================================
// Types & Context
// ============================================================================

export type DataGridDensity = 'compact' | 'normal' | 'relaxed';
export type ColumnAlign = 'left' | 'center' | 'right';

export interface DataGridColumn<T = Record<string, unknown>> {
  key: string;
  title: React.ReactNode;
  width?: string;
  align?: ColumnAlign;
  tabular?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

export interface DataGridProps<T = Record<string, unknown>> {
  data: T[];
  columns: DataGridColumn<T>[];
  density?: DataGridDensity;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  rowKey?: (row: T) => string;
}

interface DataGridContextValue {
  density: DataGridDensity;
  selectable: boolean;
  selectedKeys: Set<string>;
  toggleSelection: (key: string) => void;
}

const DataGridContext = createContext<DataGridContextValue>({
  density: 'normal',
  selectable: false,
  selectedKeys: new Set(),
  toggleSelection: () => {},
});

// ============================================================================
// Sort Icon with Cap-Height Alignment
// ============================================================================

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (!direction) {
    return <Icon name="chevronUp" size="xs" className="intent-datagrid-sort-icon" style={{ opacity: 0.3 }} />;
  }
  return (
    <Icon 
      name={direction === 'asc' ? 'chevronUp' : 'chevronDown'} 
      size="xs"
      className="intent-datagrid-sort-icon intent-datagrid-sort-icon--active"
      alignment="cap"
    />
  );
}

// ============================================================================
// Main DataGrid Component
// ============================================================================

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  function DataGrid<T extends Record<string, unknown>>(
    {
      data,
      columns,
      density = 'normal',
      selectable = false,
      selectedKeys: controlledSelectedKeys,
      onSelectionChange,
      loading = false,
      emptyState,
      rowKey = (row: T) => String(row.id ?? row.key),
    }: DataGridProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(new Set());
    const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
    
    const toggleSelection = useCallback((key: string) => {
      const newKeys = new Set(selectedKeys);
      if (newKeys.has(key)) newKeys.delete(key);
      else newKeys.add(key);
      setInternalSelectedKeys(newKeys);
      onSelectionChange?.(newKeys);
    }, [selectedKeys, onSelectionChange]);

    const contextValue = useMemo(() => ({
      density, selectable, selectedKeys, toggleSelection,
    }), [density, selectable, selectedKeys, toggleSelection]);

    const allSelected = data.length > 0 && data.every(row => selectedKeys.has(rowKey(row)));
    const someSelected = data.some(row => selectedKeys.has(rowKey(row))) && !allSelected;

    const handleSelectAll = () => {
      if (allSelected) {
        setInternalSelectedKeys(new Set());
        onSelectionChange?.(new Set());
      } else {
        const newKeys = new Set(data.map(rowKey));
        setInternalSelectedKeys(newKeys);
        onSelectionChange?.(newKeys);
      }
    };

    // Density multiplier calculation
    const densityMultiplier = density === 'compact' ? 0.75 : density === 'relaxed' ? 1.25 : 1;

    return (
      <DataGridContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cx('intent-datagrid', `intent-datagrid--density-${density}`)}
          data-intent-component="datagrid"
          data-intent-archetype="milled"
          data-intent-density={density}
          style={{ '--intent-datagrid-density': densityMultiplier } as React.CSSProperties}
        >
          {/* Header - Flat archetype for structure, Milled for sort buttons */}
          <div className="intent-datagrid-header" role="rowgroup">
            <div className="intent-datagrid-row intent-datagrid-row--header" role="row">
              {selectable && (
                <div className="intent-datagrid-cell intent-datagrid-cell--checkbox" role="columnheader">
                  <Checkbox checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} />
                </div>
              )}
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={cx(
                    'intent-datagrid-cell',
                    'intent-datagrid-cell--header',
                    `intent-datagrid-cell--align-${column.align ?? 'left'}`,
                    column.tabular && 'intent-datagrid-cell--tabular'
                  )}
                  role="columnheader"
                  style={{ width: column.width }}
                >
                  <span className="intent-datagrid-header-content">
                    {column.title}
                    {column.sortable && (
                      <button className="intent-datagrid-sort-button" aria-label={`Sort by ${String(column.title)}`}>
                        <SortIcon direction={column.sortDirection ?? null} />
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Body - Milled archetype */}
          <div className="intent-datagrid-body" role="rowgroup">
            {loading ? (
              <div className="intent-datagrid-loading">Loading...</div>
            ) : data.length === 0 ? (
              <div className="intent-datagrid-empty">{emptyState ?? 'No data'}</div>
            ) : (
              data.map((row, rowIndex) => (
                <DataGridRow
                  key={rowKey(row)}
                  row={row}
                  rowKey={rowKey(row)}
                  rowIndex={rowIndex}
                  columns={columns}
                  isSelected={selectedKeys.has(rowKey(row))}
                />
              ))
            )}
          </div>
        </div>
      </DataGridContext.Provider>
    );
  }
);

// ============================================================================
// DataGridRow
// ============================================================================

function DataGridRow<T extends Record<string, unknown>>({
  row, rowKey, rowIndex, columns, isSelected,
}: { row: T; rowKey: string; rowIndex: number; columns: DataGridColumn<T>[]; isSelected: boolean }) {
  const { selectable, toggleSelection, density } = useContext(DataGridContext);

  return (
    <div
      className={cx('intent-datagrid-row', 'intent-datagrid-row--body', isSelected && 'intent-datagrid-row--selected')}
      role="row"
      data-intent-density={density}
      data-selected={isSelected}
    >
      {selectable && (
        <div className="intent-datagrid-cell intent-datagrid-cell--checkbox" role="cell" onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={isSelected} onChange={() => toggleSelection(rowKey)} />
        </div>
      )}
      {columns.map((column) => {
        const value = row[column.key];
        const displayValue = column.render ? column.render(value, row, rowIndex) : String(value ?? '');
        return (
          <div
            key={column.key}
            className={cx(
              'intent-datagrid-cell',
              'intent-datagrid-cell--body',
              `intent-datagrid-cell--align-${column.align ?? 'left'}`,
              column.tabular && 'intent-datagrid-cell--tabular'
            )}
            role="cell"
          >
            {displayValue}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// Schema
// ============================================================================

export const DataGridSchema = {
  name: 'DataGrid',
  archetype: 'milled',
  description: 'Complex data table with density propagation and tabular alignment',
  properties: {
    density: { type: 'enum', values: ['compact', 'normal', 'relaxed'], default: 'normal' },
    selectable: { type: 'boolean', default: false },
  },
  tokens: {
    rowBackground: '--intent-surface-milled-bg',
    rowHoverBackground: '--intent-surface-milled-hover-bg',
    selectedBackground: '--intent-color-primary-alpha',
    cellPadding: 'calc(var(--intent-space-3) * var(--intent-datagrid-density))',
    tabularNums: 'tabular-nums',
  },
};

export default Object.assign(DataGrid, { schema: DataGridSchema });
