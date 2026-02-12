import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Calendar Component
// ============================================================================

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Size of calendar */
  size?: 'sm' | 'md' | 'lg';
  /** Current view mode */
  view?: 'month' | 'year' | 'decade';
  /** Currently displayed month/year */
  currentDate?: Date;
  /** Selected date(s) */
  selectedDate?: Date | Date[];
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when month changes */
  onMonthChange?: (date: Date) => void;
  /** Custom day renderer */
  renderDay?: (date: Date, props: DayRenderProps) => React.ReactNode;
  children?: React.ReactNode;
}

export interface DayRenderProps {
  selected: boolean;
  disabled: boolean;
  today: boolean;
  inCurrentMonth: boolean;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ 
    size = 'md',
    view = 'month',
    currentDate: controlledCurrent,
    selectedDate,
    minDate,
    maxDate,
    onSelect,
    onMonthChange,
    renderDay,
    className,
    children,
    ...props 
  }, ref) => {
    const [internalCurrent, setInternalCurrent] = React.useState(new Date());
    const current = controlledCurrent || internalCurrent;
    
    const handlePrevMonth = () => {
      const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
      if (!controlledCurrent) setInternalCurrent(newDate);
      onMonthChange?.(newDate);
    };
    
    const handleNextMonth = () => {
      const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      if (!controlledCurrent) setInternalCurrent(newDate);
      onMonthChange?.(newDate);
    };
    
    const handleToday = () => {
      const today = new Date();
      if (!controlledCurrent) setInternalCurrent(today);
      onMonthChange?.(today);
    };
    
    // Generate days for current month view
    const days = React.useMemo(() => {
      const year = current.getFullYear();
      const month = current.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startPadding = firstDay.getDay();
      const daysInMonth = lastDay.getDate();
      
      const result: Date[] = [];
      
      // Previous month padding
      const prevMonth = new Date(year, month, 0);
      for (let i = startPadding - 1; i >= 0; i--) {
        result.push(new Date(year, month - 1, prevMonth.getDate() - i));
      }
      
      // Current month
      for (let i = 1; i <= daysInMonth; i++) {
        result.push(new Date(year, month, i));
      }
      
      // Next month padding
      const remaining = (7 - (result.length % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        result.push(new Date(year, month + 1, i));
      }
      
      return result;
    }, [current]);
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    
    const isSelected = (date: Date): boolean => {
      if (!selectedDate) return false;
      const dates = Array.isArray(selectedDate) ? selectedDate : [selectedDate];
      return dates.some(d => isSameDay(d, date));
    };
    
    const isDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };
    
    const isToday = (date: Date): boolean => isSameDay(date, new Date());
    const isInCurrentMonth = (date: Date): boolean => 
      date.getMonth() === current.getMonth();
    
    if (children) {
      return (
        <div
          ref={ref}
          className={clsx(
            'intent-calendar',
            className
          )}
          data-size={size}
          data-view={view}
          {...styleAttr(props)}
          {...props}
        >
          {children}
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-calendar',
          className
        )}
        data-size={size}
        data-view={view}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-calendar-header">
          <button type="button" onClick={handlePrevMonth} aria-label="Previous month">
            ‹
          </button>
          <span className="intent-calendar-title">
            {monthNames[current.getMonth()]} {current.getFullYear()}
          </span>
          <button type="button" onClick={handleNextMonth} aria-label="Next month">
            ›
          </button>
        </div>
        
        <div className="intent-calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="intent-calendar-weekday">{day}</div>
          ))}
        </div>
        
        <div className="intent-calendar-grid">
          {days.map((date, index) => {
            const dayProps: DayRenderProps = {
              selected: isSelected(date),
              disabled: isDisabled(date),
              today: isToday(date),
              inCurrentMonth: isInCurrentMonth(date),
            };
            
            if (renderDay) {
              return (
                <div key={index} className="intent-calendar-day-wrapper">
                  {renderDay(date, dayProps)}
                </div>
              );
            }
            
            return (
              <CalendarDay
                key={index}
                date={date}
                selected={dayProps.selected}
                disabled={dayProps.disabled}
                today={dayProps.today}
                outside={!dayProps.inCurrentMonth}
                onClick={() => !dayProps.disabled && onSelect?.(date)}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
Calendar.displayName = 'Calendar';

// ============================================================================
// CalendarDay
// ============================================================================

export interface CalendarDayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Date this day represents */
  date: Date;
  /** Whether day is selected */
  selected?: boolean;
  /** Whether day is disabled */
  disabled?: boolean;
  /** Whether day is today */
  today?: boolean;
  /** Whether day is in range */
  inRange?: boolean;
  /** Whether day is outside current month */
  outside?: boolean;
}

export const CalendarDay = React.forwardRef<HTMLButtonElement, CalendarDayProps>(
  ({ 
    date,
    selected = false,
    disabled = false,
    today = false,
    inRange = false,
    outside = false,
    className,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'intent-calendar-day',
          className
        )}
        data-selected={selected}
        data-disabled={disabled}
        data-today={today}
        data-in-range={inRange}
        data-outside={outside}
        disabled={disabled}
        {...styleAttr(props)}
        {...props}
      >
        {date.getDate()}
      </button>
    );
  }
);
CalendarDay.displayName = 'CalendarDay';

// ============================================================================
// Utilities
// ============================================================================

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
