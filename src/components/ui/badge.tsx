import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "required" | "preferred" | "keyword" | "info";
}

export function Badge({ className, variant = "info", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        variant === "required" && "bg-accent/15 text-accent",
        variant === "preferred" && "bg-secondary text-secondary-foreground",
        variant === "keyword" && "bg-emerald-500/15 text-emerald-400",
        variant === "info" && "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
