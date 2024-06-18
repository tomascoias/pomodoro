import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-default py-2 px-3 gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        focus: "bg-[#6EE7B7]/10 text-emerald-600 border-emerald-600 dark:bg-[#10B981]/10 dark:text-emerald-500 border dark:border-emerald-500",
        shortpause: "bg-[#F59E0B]/10 text-amber-500 border border-amber-500",
        longpause: "bg-[#06B6D4]/10 text-cyan-500 border border-cyan-500",
        custom: "bg-[#0A0A0A]/10 text-neutral-950 border-neutral-950 dark:bg-[#A3A3A3]/10 dark:text-neutral-400 border dark:border-neutral-400",
        modesLight:"bg-zinc-300 text-zinc-500 rounded hover:bg-zinc-500 hover:text-zinc-300",
        modesDark:"bg-zinc-800  text-zinc-400 rounded hover:bg-zinc-400 hover:text-zinc-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
