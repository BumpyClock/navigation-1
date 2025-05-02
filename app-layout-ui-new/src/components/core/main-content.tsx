"use client"

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { SettingsPanelTrigger, useSettingsPanel } from "./settings-panel";
import { useSidebar } from "../ui/sidebar";
import { MainContentProps } from "../../types";

/**
 * This component can be used in two ways:
 * 1. Directly as a standalone component
 * 2. As a child of AppLayout - in this case, AppLayout will extract its props
 *    and render it properly without nesting ScrollAreas
 * 
 * When used as a child of AppLayout, height and width constraints are managed by AppLayout.
 */

// Memoized header component for better performance
const MainContentHeader = React.memo(function MainContentHeader({
  header,
  showSettingsPanelTrigger,
  headerClassName,
}: {
  header?: React.ReactNode | string;
  showSettingsPanelTrigger?: boolean;
  headerClassName?: string;
}) {
  if (!header && !showSettingsPanelTrigger) return null;
  
  return (
    <div className={cn(
      "flex justify-between items-center py-2 px-4 mb-4",
      headerClassName
    )}>
      <div className="flex-1">
        {typeof header === 'string' ? (
          <h1 className="text-xl font-semibold">{header}</h1>
        ) : (
          header
        )}
      </div>
      
      {showSettingsPanelTrigger && (
        <div className="flex items-center">
          <SettingsPanelTrigger />
        </div>
      )}
    </div>
  );
});

// MainContent component
export const MainContent = React.memo(function MainContent({
  children,
  backgroundClassName = "bg-content dark:bg-content-dark",
  header,
  showSettingsPanelTrigger = true,
  headerClassName,
}: MainContentProps) {
  const { 
    state: settingsPanelState, 
    isMobile: isSettingsMobile,
  } = useSettingsPanel();
  const { 
    state: sidebarState,
    isMobile: isSidebarMobile
  } = useSidebar();
  
  const settingsIsCollapsed = settingsPanelState === "collapsed";
  const sidebarIsCollapsed = sidebarState === "collapsed";
  
  // Check if this component is a direct child of AppLayout
  // This is determined at runtime by AppLayout
  const isAppLayoutChild = false; // This will be overridden by AppLayout's logic
  
  // Create style based on sidebar state to match the animations
  const contentStyle = React.useMemo(() => {
    // Simple style that lets parent container handle the spacing
    return {
      width: '100%',
      flex: '1 1 auto',
      height: '100%'
    };
  }, []);
  
  return (
    <div
      className={cn(
        "flex-1 w-full h-full overflow-hidden ",
        // Rounded corners for sidebar edge
        "md:rounded-s-[inherit]",
        // Rounded corners for settings panel edge (only when NOT mobile)
        !isSettingsMobile && settingsIsCollapsed 
          ? "min-[1024px]:rounded-e-lg" 
          : "min-[1024px]:rounded-e-3xl",
        backgroundClassName
      )}
      style={contentStyle}
    >
      <ScrollArea 
        id="main-content-area" 
        className="h-full w-full m-4"
      >
        {/* Only render header if provided or settings panel trigger is enabled */}
        {(header || showSettingsPanelTrigger) && (
          <MainContentHeader 
            header={header}
            showSettingsPanelTrigger={showSettingsPanelTrigger}
            headerClassName={headerClassName}
          />
        )}
        <div className={cn(!header && !showSettingsPanelTrigger ? "pt-4" : "")}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
});

export default MainContent;