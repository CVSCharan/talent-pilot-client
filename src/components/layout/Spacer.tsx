
import { cn } from "../lib/utils";

interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function Spacer({ size = "md", className }: SpacerProps) {
  const sizeClasses = {
    xs: "h-2",
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
    "2xl": "h-24",
  };

  return <div className={cn(sizeClasses[size], className)} />;
}