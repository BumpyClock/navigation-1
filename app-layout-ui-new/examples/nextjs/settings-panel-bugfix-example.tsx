"use client"

import React from "react";
import { AppLayout } from "../../src";
import { Button } from "../../src/components/ui/button";

export default function SettingsPanelBugfixExample() {
  const [windowSize, setWindowSize] = React.useState<{width: number, height: number}>({width: 0, height: 0});
  const [viewMode, setViewMode] = React.useState<string>("desktop");
  
  // Update window size when window is resized
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({width, height});
      
      // Determine current view mode based on breakpoint (1024px)
      setViewMode(width < 1024 ? "mobile" : "desktop");
    };
    
    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample site info
  const siteInfo = {
    name: "Bugfix Demo",
    logo: "/logo.svg",
    description: "Testing fixes",
  };

  // Sample navigation items
  const sidebarNavItems = {
    main: {
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: "home",
          isActive: true,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: "settings",
        },
      ],
    },
  };

  // Content for settings panel
  const settingsContent = (
    <div className="space-y-6 pt-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Bug Fixes</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Current view mode:</span>
            <span className="font-medium">{viewMode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Window size:</span>
            <span className="font-mono text-sm">{windowSize.width}×{windowSize.height}</span>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-sidebar-foreground/10" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Fixed Issues</h3>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Settings button and chevron no longer overlap</li>
          <li>Settings button now works in mobile view</li>
          <li>Consistent chevron direction based on panel state</li>
          <li>Clear visual indication of open/closed state</li>
        </ul>
      </div>
    </div>
  );

  return (
    <AppLayout
      siteInfo={siteInfo}
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
      settingsPanelContent={settingsContent}
      contentHeader="Settings Panel Bugfix Demo"
      showSettingsPanelTrigger={true}
      mobileBreakpoint={1024} // Set to 1024px to match our code
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Panel Bug Fixes</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This example demonstrates the fixed settings panel behavior with improved controls.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Current view information:</h3>
            <p className="font-mono">Mode: <span className="text-blue-600 dark:text-blue-400">{viewMode}</span></p>
            <p className="font-mono">Window size: <span className="text-blue-600 dark:text-blue-400">{windowSize.width}px × {windowSize.height}px</span></p>
            <p className="font-mono">Breakpoint: <span className="text-blue-600 dark:text-blue-400">1024px</span></p>
          </div>
        </section>
        
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3">Bug Fixes Implemented</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>Fixed:</strong> Settings button and chevron overlap in header</li>
            <li><strong>Fixed:</strong> Settings button not working in mobile view</li>
            <li><strong>Improved:</strong> Combined settings button and chevron for cleaner UI</li>
            <li><strong>Enhanced:</strong> Added consistent opening/closing behavior across breakpoints</li>
          </ul>
        </section>
        
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Testing Instructions</h3>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <p className="mb-2">To test the fixes:</p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Click the settings button in desktop view to toggle the panel</li>
              <li>Resize your browser to mobile size (&lt;1024px)</li>
              <li>Click the settings button in mobile view to open the sheet</li>
              <li>Use close buttons to dismiss the panel in both views</li>
            </ol>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}