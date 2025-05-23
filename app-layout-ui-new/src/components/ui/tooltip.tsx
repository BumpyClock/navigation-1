"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

export interface TooltipProviderProps extends React.ComponentProps<typeof TooltipPrimitive.Provider> {}

export function TooltipProvider({ ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider {...props} />
}

export interface TooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Root> {}

export function Tooltip({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />
}

export interface TooltipTriggerProps extends React.ComponentProps<typeof TooltipPrimitive.Trigger> {}

export function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger {...props} />
}

export interface TooltipContentProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  hidden?: boolean;
}

export function TooltipContent({
  className,
  sideOffset = 4,
  hidden,
  ...props
}: TooltipContentProps) {
  if (hidden) {
    return null
  }
  
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
        className
      )}
      {...props}
    />
  )
}