"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "../../lib/utils"

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {}

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

export interface AvatarImageProps extends React.ComponentProps<typeof AvatarPrimitive.Image> {
  src: string
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
}

export interface AvatarFallbackProps extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "bg-muted flex h-full w-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}