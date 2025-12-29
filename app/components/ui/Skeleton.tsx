"use client";

import React from "react";
import clsx from "clsx";
import { useEffect } from "react";

/**
 * Skeleton component for loading states with smooth pulse animation
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative overflow-hidden rounded-lg bg-gradient-to-r from-white/3 via-white/8 to-white/3",
      "animate-pulse",
      className
    )}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";

/**
 * Shimmer skeleton component with loading wave effect
 */
const ShimmerSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "relative overflow-hidden rounded-lg bg-white/3",
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-animation {
          animation: shimmer 2s infinite;
        }
      `}</style>
      <div
        className="absolute inset-0 shimmer-animation"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />
    </div>
  );
});

ShimmerSkeleton.displayName = "ShimmerSkeleton";

/**
 * Token card skeleton
 */
export const TokenCardSkeleton = () => (
  <div className="flex gap-3 p-3 rounded-lg border border-white/6 bg-white/2">
    {/* Icon */}
    <Skeleton className="w-10 h-10 rounded-md shrink-0" />

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
    <div className="flex gap-2 shrink-0">
      <Skeleton className="w-12 h-8 rounded" />
      <Skeleton className="w-8 h-8 rounded" />
    </div>
  </div>
);

export { Skeleton, ShimmerSkeleton };
