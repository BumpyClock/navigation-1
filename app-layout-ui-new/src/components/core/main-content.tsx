"use client"

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { SettingsPanel, SettingsPanelTrigger, useSettingsPanel } from "./settings-panel";
import { MainContentProps } from "../../types";

// Memoized header component for better performance
const MainContentHeader = React.memo(function MainContentHeader({
  header,
  showSettingsPanelTrigger,
  headerClassName,
}: {
  header?: React.ReactNode;
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
  showSettingsPanel = true,
  backgroundClassName = "bg-content dark:bg-content-dark",
  settingsPanelContent,
  header,
  showSettingsPanelTrigger = true,
  headerClassName,
}: MainContentProps) {
  const { 
    state: settingsPanelState, 
    isMobile: isSettingsMobile,
  } = useSettingsPanel();
  const settingsIsCollapsed = settingsPanelState === "collapsed";
  
  return (
    <div className="flex h-[calc(100vh-4rem)] p-2 md:p-2 lg:p-2 md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-lg transition-all ease-in-out duration-300 overflow-hidden">
      <div className={cn(
        "flex-1 w-full h-full transition-all ease-in-out duration-300 overflow-hidden",
        // Rounded corners for sidebar edge
        "md:rounded-s-[inherit]",
        // Rounded corners for settings panel edge (only when NOT mobile)
        !isSettingsMobile && showSettingsPanel && settingsIsCollapsed 
          ? "min-[1024px]:rounded-e-lg" 
          : "min-[1024px]:rounded-e-3xl",
        backgroundClassName
      )}>
        <ScrollArea 
          id="main-content-area" 
          className="h-full w-full"
        >
          <MainContentHeader 
            header={header}
            showSettingsPanelTrigger={showSettingsPanelTrigger}
            headerClassName={headerClassName}
          />
          <div className="px-4">
            {children}
          </div>
        </ScrollArea>
      </div>
      {/* Show settings panel in desktop view */}
      {!isSettingsMobile && showSettingsPanel && (
        <SettingsPanel content={settingsPanelContent} />
      )}
      {/* For mobile view, always render the Settings Panel */}
      {isSettingsMobile && showSettingsPanel && (
        <SettingsPanel content={settingsPanelContent} />
      )}
    </div>
  );
});

export default MainContent;