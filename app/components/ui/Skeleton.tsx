"use client";

import React from "react";
import clsx from "clsx";

/**
 * Skeleton component for loading states with shimmer animation
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "animate-pulse rounded-lg bg-white/5",
      className
    )}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";

/**
 * Shimmer effect component
 */
const ShimmerSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative overflow-hidden rounded-lg bg-white/5",
      className
    )}
    {...props}
  >
    <div
      className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
      style={{
        animation: "shimmer 2s infinite",
      }}
    />
  </div>
));

ShimmerSkeleton.displayName = "ShimmerSkeleton";

/**
 * Token card skeleton
 */
export const TokenCardSkeleton = () => (
  <div className="flex gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
    {/* Icon */}
    <Skeleton className="w-10 h-10 rounded-md flex-shrink-0" />

    {/* Content */}
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2 flex-shrink-0">
      <Skeleton className="w-12 h-8 rounded" />
      <Skeleton className="w-8 h-8 rounded" />
    </div>
  </div>
);

export { Skeleton, ShimmerSkeleton };
