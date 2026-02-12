import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Avatar Types
// ============================================================================

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display when no image */
  initials?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape variant */
  variant?: 'circle' | 'square' | 'rounded';
  /** Background color when showing initials */
  color?: 'neutral' | 'primary' | 'success' | 'warning' | 'error';
  /** Custom icon to show when no image/initials */
  icon?: React.ReactNode;
  /** Callback when image fails to load */
  onError?: () => void;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size for all avatars in group */
  size?: AvatarProps['size'];
  /** Spacing between avatars */
  spacing?: 'tight' | 'normal' | 'loose';
  children: React.ReactNode;
}

// ============================================================================
// Avatar
// ============================================================================

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    src,
    alt,
    initials,
    size = 'md',
    variant = 'circle',
    color = 'neutral',
    icon,
    onError,
    className,
    children,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleError = () => {
      setImageError(true);
      onError?.();
    };

    const renderContent = () => {
      if (src && !imageError) {
        return (
          <img
            src={src}
            alt={alt || ''}
            className="intent-avatar-image"
            onError={handleError}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        );
      }

      if (initials) {
        return <span className="intent-avatar-initials">{initials.slice(0, 2).toUpperCase()}</span>;
      }

      if (icon) {
        return <span className="intent-avatar-icon">{icon}</span>;
      }

      // Default user icon
      return (
        <svg className="intent-avatar-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '60%', height: '60%' }}>
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'intent-avatar',
          className
        )}
        data-size={size}
        data-variant={variant}
        data-color={color}
        role="img"
        aria-label={alt || initials || 'Avatar'}
        {...styleAttr(props)}
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

// ============================================================================
// AvatarGroup
// ============================================================================

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 0, size, spacing = 'tight', className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const totalChildren = childArray.length;
    
    let displayChildren = childArray;
    let remainingCount = 0;

    if (max > 0 && totalChildren > max) {
      displayChildren = childArray.slice(0, max);
      remainingCount = totalChildren - max;
    }

    const spacingValues = {
      tight: '-0.5rem',
      normal: '-0.25rem',
      loose: '0.25rem',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'intent-avatar-group',
          className
        )}
        data-spacing={spacing}
        {...styleAttr(props)}
        {...props}
      >
        {displayChildren.map((child, index) => (
          <div
            key={index}
            className="intent-avatar-group-item"
            style={{
              marginLeft: index > 0 ? spacingValues[spacing] : 0,
              zIndex: displayChildren.length - index,
            }}
          >
            {React.isValidElement(child) && size
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            initials={`+${remainingCount}`}
            color="neutral"
            style={{
              marginLeft: spacingValues[spacing],
            }}
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

// ============================================================================
// AvatarBadge (for online/offline status)
// ============================================================================

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge color/status */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Badge position */
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ status = 'online', position = 'bottom-right', className, ...props }, ref) => {
    const positionStyles: Record<string, React.CSSProperties> = {
      'top-right': { top: '0', right: '0', transform: 'translate(25%, -25%)' },
      'bottom-right': { bottom: '0', right: '0', transform: 'translate(25%, 25%)' },
      'top-left': { top: '0', left: '0', transform: 'translate(-25%, -25%)' },
      'bottom-left': { bottom: '0', left: '0', transform: 'translate(-25%, 25%)' },
    };

    const statusColors = {
      online: '#22c55e',
      offline: '#9ca3af',
      away: '#f59e0b',
      busy: '#ef4444',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'intent-avatar-badge',
          className
        )}
        data-status={status}
        data-position={position}
        style={{
          position: 'absolute',
          width: '25%',
          height: '25%',
          minWidth: '8px',
          minHeight: '8px',
          borderRadius: '50%',
          backgroundColor: statusColors[status],
          border: '2px solid white',
          ...positionStyles[position],
        }}
        {...props}
      />
    );
  }
);
AvatarBadge.displayName = 'AvatarBadge';
