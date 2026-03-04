import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "text-sm font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" && "px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
