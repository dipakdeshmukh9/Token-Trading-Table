import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

/**
 * Button component with CVA variants for flexible styling
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-green-500 text-black hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-400",
        secondary:
          "bg-white/10 text-white hover:bg-white/20 active:bg-white/30 focus-visible:ring-white",
        outline:
          "border border-white/20 text-white hover:bg-white/5 active:bg-white/10",
        ghost:
          "text-white hover:bg-white/5 active:bg-white/10",
        danger:
          "bg-red-500/20 text-red-400 hover:bg-red-500/30 focus-visible:ring-red-400",
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1",
        sm: "h-8 px-3 text-sm gap-1.5",
        md: "h-10 px-4 text-base gap-2",
        lg: "h-12 px-6 text-lg gap-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <button
      className={clsx(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
