"use client"

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * SidebarLogo component
 * 
 * A component for displaying a site's logo and name in the sidebar header.
 * Can be clickable for navigation purposes if an onClick handler is provided.
 * 
 * @component
 * @example
 * ```tsx
 * <SidebarLogo
 *   logo="/path/to/logo.png"
 *   title="Company Name"
 *   subtitle="Workspace"
 *   onClick={() => router.push('/')}
 * />
 * ```
 * 
 * @accessibility
 * - When onClick is provided, the component is keyboard accessible (Enter/Space to trigger)
 * - Proper focus styles for keyboard navigation
 * - Appropriate aria-label for screen readers
 * - Images have proper alt text
 */
export interface SidebarLogoProps {
  /** URL of the logo image */
  logo?: string;
  
  /** Primary text, typically the company or site name */
  title?: string;
  
  /** Secondary text, typically a subtitle or description */
  subtitle?: string;
  
  /** Additional CSS classes to apply to the component */
  className?: string;
  
  /** 
   * Optional click handler. If provided, the component becomes
   * interactive with keyboard navigation support
   */
  onClick?: () => void;
}

/**
 * SidebarLogo component with memoization for better performance
 */
export const SidebarLogo = React.memo(function SidebarLogo({ 
  logo, 
  title, 
  subtitle, 
  className,
  onClick
}: SidebarLogoProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const logoContainerProps = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: handleKeyDown,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault(); // Prevent default behavior
          onClick();
        },
        "aria-label": title ? `Go to ${title}` : "Go to homepage",
        "data-sidebar": "logo-button",
        className: cn(
          "flex items-center gap-3 px-3 py-4 cursor-pointer sidebar-logo transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]", 
          className
        )
      }
    : {
        className: cn("flex items-center gap-3 px-3 py-4", className)
      };

  return (
    <div {...logoContainerProps}>
      {logo && (
        <div className="flex shrink-0 items-center justify-center">
          <div 
            className="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sidebar-primary-foreground relative after:rounded-[inherit] after:absolute after:inset-0 after:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] after:pointer-events-none transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <img
              src={logo}
              alt={title || "Logo"}
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
      {(title || subtitle) && (
        <div className="grid flex-1 text-left overflow-hidden">
          {title && (
            <span 
              className="truncate text-base font-semibold text-sidebar-foreground transition-opacity duration-300"
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span 
              className="truncate text-xs text-sidebar-foreground/60 transition-opacity duration-300"
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
});