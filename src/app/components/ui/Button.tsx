import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles that apply to all buttons
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variant styles
    const variantStyles = {
      primary: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
      outline:
        "border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100",
      ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200",
      link: "bg-transparent text-gray-800 underline-offset-4 hover:underline",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    };

    // Size styles
    const sizeStyles = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0", // For icon-only buttons
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && (
          <span
            className={cn("mr-2", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span
            className={cn("ml-2", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
