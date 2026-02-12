import React, { forwardRef } from 'react';
import { cx } from '../../utils/cx.js';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ variant = 'text', className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('intent-skeleton', `intent-skeleton--${variant}`, className)}
        data-intent-component="skeleton"
        data-intent-archetype="flat"
        {...props}
      />
    );
  }
);

export const SkeletonText = Skeleton;
export const SkeletonCircle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <Skeleton ref={ref} variant="circle" {...props} />
);

export default Object.assign(Skeleton, { Text: SkeletonText, Circle: SkeletonCircle });
