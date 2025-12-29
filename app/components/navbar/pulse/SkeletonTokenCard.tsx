"use client";

import { Skeleton, ShimmerSkeleton } from "@/app/components/ui/Skeleton";

/**
 * SkeletonTokenCard - Loading skeleton for token cards
 * Shows shimmer effects while data is loading with progressive loading animation
 */
export default function SkeletonTokenCard() {
  return (
    <div className="flex flex-col p-2.5 rounded-lg border border-white/6 bg-white/2 h-24 gap-2">
      {/* Top: Icon + Name + Star */}
      <div className="flex items-start justify-between gap-1.5">
        <div className="flex items-start gap-1.5 min-w-0 flex-1">
          <ShimmerSkeleton className="w-7 h-7 rounded-md shrink-0" />
          <div className="min-w-0 flex-1 space-y-1">
            <ShimmerSkeleton className="h-3 w-24" />
            <ShimmerSkeleton className="h-2 w-12" />
          </div>
        </div>
        <ShimmerSkeleton className="w-4 h-4 rounded shrink-0" />
      </div>

      {/* Middle: Stats Grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-auto">
        <ShimmerSkeleton className="h-4 w-12" />
        <ShimmerSkeleton className="h-4 w-12" />
        <ShimmerSkeleton className="h-4 w-10" />
      </div>

      {/* Bottom: Price + Badge + Buttons */}
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-0.5">
          <ShimmerSkeleton className="h-3 w-16" />
          <ShimmerSkeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex gap-1">
          <ShimmerSkeleton className="h-6 w-12 rounded" />
          <ShimmerSkeleton className="h-6 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}

