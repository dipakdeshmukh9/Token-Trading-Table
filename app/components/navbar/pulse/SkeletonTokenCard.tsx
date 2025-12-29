export default function SkeletonTokenCard() {
  return (
    <div className="flex gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
      {/* Icon */}
      <div className="w-10 h-10 rounded-md skeleton" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded skeleton" />
        <div className="h-3 w-56 rounded skeleton" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-12 rounded skeleton" />
          <div className="h-5 w-12 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}
