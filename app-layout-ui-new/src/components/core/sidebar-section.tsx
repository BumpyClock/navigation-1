"use client"

import * as React from "react";
import { cn } from "../../lib/utils";
import { 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel 
} from "../ui/sidebar";
import { Icon } from "./icon";

/**
 * SidebarSection component
 * 
 * A collapsible section for grouping navigation items in the sidebar.
 * Provides a header that can be clicked or keyboard navigated to expand/collapse the content.
 * 
 * @component
 * @example
 * ```tsx
 * <SidebarSection title="Navigation" defaultOpen={true}>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <SidebarMenuButton>Home</SidebarMenuButton>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarSection>
 * ```
 * 
 * @accessibility
 * - The section header is keyboard accessible (Enter/Space to toggle)
 * - Uses appropriate ARIA attributes (aria-expanded, aria-controls)
 * - Focus styles are visible for better keyboard navigation
 * - Proper role attributes for screen readers
 */
export interface SidebarSectionProps {
  /** The title of the section displayed in the header */
  title: string;
  
  /** The content to display inside the collapsible section */
  children: React.ReactNode;
  
  /** Whether the section should be expanded by default (defaults to true) */
  defaultOpen?: boolean;
  
  /** Additional CSS classes to apply to the component */
  className?: string;
}

/**
 * SidebarSection component with memoization for better performance
 */
export const SidebarSection = React.memo(function SidebarSection({ 
  title, 
  children, 
  defaultOpen = true,
  className
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const sectionId = React.useMemo(() => 
    `section-content-${title.replace(/\s+/g, '-').toLowerCase()}`,
    [title]
  );
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <SidebarGroup className={cn("relative", className)}>
      <SidebarGroupLabel 
        className={cn(
          "uppercase text-sidebar-foreground/50 flex items-center justify-between cursor-pointer sidebar-section-header"
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={sectionId}
      >
        <span>{title}</span>
        <Icon 
          name={isOpen ? "arrowDown" : "arrowRight"}
          className="text-sidebar-foreground/50" 
          size={16} 
          aria-hidden="true" 
        />
      </SidebarGroupLabel>
      <SidebarGroupContent 
        id={sectionId}
        className={cn(
          "px-2 transition-all duration-300 ease-in-out overflow-hidden", 
          isOpen ? "max-h-96" : "max-h-0 opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        {children}
      </SidebarGroupContent>
    </SidebarGroup>
  );
});