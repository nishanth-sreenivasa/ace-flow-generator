"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  style = {},
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 inline-flex items-center justify-center";
  
  const variantStyles = {
    primary: disabled || loading 
      ? "bg-gray-400 text-white cursor-not-allowed" 
      : "text-white hover:opacity-90 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border-2 bg-transparent hover:bg-gray-50 focus:ring-blue-500"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const primaryBgColor = disabled || loading ? "#9ca3af" : "var(--color-button-bg)";
  const primaryHoverColor = disabled || loading ? "#9ca3af" : "var(--color-button-hover)";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="save-flow-btn"
      style={{
        ...(variant === "primary" ? {
          backgroundColor: primaryBgColor,
          border: "none"
        } : {}),
        ...style
      }}
      onMouseEnter={(e) => {
        if (variant === "primary" && !disabled && !loading) {
          e.currentTarget.style.backgroundColor = primaryHoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary" && !disabled && !loading) {
          e.currentTarget.style.backgroundColor = primaryBgColor;
        }
      }}
    >
      {loading && (
        <div 
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
          style={{ animation: 'spin 1s linear infinite' }}
        />
      )}
      {children}
    </button>
  );
}