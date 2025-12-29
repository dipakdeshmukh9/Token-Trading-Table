import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

/**
 * Input component
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={clsx(
              "w-full h-10 rounded-lg border border-white/10 bg-white/[0.02] px-3 text-sm text-white placeholder-white/30 transition-colors",
              "focus:outline-none focus:border-white/30 focus:bg-white/[0.04]",
              icon && "pl-10",
              error && "border-red-500/30 bg-red-500/5",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        {helperText && (
          <p className="text-xs text-white/50">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
