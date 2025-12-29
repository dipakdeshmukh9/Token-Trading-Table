import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

/**
 * Badge component for small UI labels and status indicators
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white",
        success: "bg-green-500/10 text-green-400",
        danger: "bg-red-500/10 text-red-400",
        warning: "bg-yellow-500/10 text-yellow-400",
        info: "bg-blue-500/10 text-blue-400",
        neutral: "bg-white/5 text-white/70",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      className={clsx(badgeVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
