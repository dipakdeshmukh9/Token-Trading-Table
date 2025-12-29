"use client";

import { Skeleton, ShimmerSkeleton } from "@/app/components/ui/Skeleton";

/**
 * SkeletonTokenCard - Loading skeleton for token cards
 * Shows a shimmer effect while data is loading
 */
export default function SkeletonTokenCard() {
  return (
    <div className="flex gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
      {/* Icon Skeleton */}
      <ShimmerSkeleton className="w-10 h-10 rounded-md flex-shrink-0" />

      {/* Content Skeleton */}
      <div className="flex-1 space-y-2">
        {/* Name and Symbol */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex gap-2 flex-shrink-0">
        <Skeleton className="w-16 h-8 rounded" />
        <Skeleton className="w-12 h-8 rounded" />
        <Skeleton className="w-10 h-8 rounded" />
      </div>
    </div>
  );
}

