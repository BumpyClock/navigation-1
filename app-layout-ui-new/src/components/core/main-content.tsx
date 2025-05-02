"use client"

import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { SettingsPanelTrigger } from "./settings-panel";
import { ErrorBoundary } from "./error-boundary";

export interface MainContentProps {
  /** Main content */
  children: React.ReactNode;
  
  /** Header content (string or component) */
  header?: React.ReactNode;
  
  /** Whether to show the settings panel trigger in the header (defaults to true) */
  showSettingsPanelTrigger?: boolean;
  
  /** CSS class name for the header */
  headerClassName?: string;
  
  /** CSS class name for the background */
  backgroundClassName?: string;
}

/**
 * The main content area component
 * Handles common layout elements like headers and scrolling
 */
export function MainContent({
  children,
  header,
  showSettingsPanelTrigger = true,
  headerClassName,
  backgroundClassName = "bg-content dark:bg-content-dark",
}: MainContentProps) {
  return (
    <div 
      className={cn(
        "flex-1 w-full h-full overflow-hidden",
        "md:rounded-s-[inherit] md:rounded-e-[inherit]",
        backgroundClassName
      )}
      style={{ width: '100%', flex: 1, height: 'calc(100vh - 4rem)' }}
    >
      <ScrollArea id="main-content-area" className="h-full w-full">
        {/* Header (if needed) */}
        {(header || showSettingsPanelTrigger) && (
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
        )}
        
        {/* Content */}
        <div className="px-4">
          <ErrorBoundary fallback={
            <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Content Error</h2>
              <p>There was a problem loading the content.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded"
              >
                Reload
              </button>
            </div>
          }>
            {children}
          </ErrorBoundary>
        </div>
      </ScrollArea>
    </div>
  );
}