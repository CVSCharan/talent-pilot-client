import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20",
        subtle: "bg-muted/50 text-foreground hover:bg-muted",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-10 rounded-md px-4 text-xs",
        md: "h-11 rounded-md px-6",
        lg: "h-12 rounded-md px-10 text-base",
        xl: "h-14 rounded-md px-12 text-lg",
        icon: "h-11 w-11 p-2",
        "icon-sm": "h-9 w-9 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
