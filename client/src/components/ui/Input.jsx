import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        className,
        "text-md flex h-10 w-full rounded-lg border border-input  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:text-foreground placeholder:text-grey-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
