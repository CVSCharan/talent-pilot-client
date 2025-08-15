import React from "react";
import { cn } from "../lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ 
  title, 
  description, 
  className, 
  children 
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 space-y-2", className)}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}