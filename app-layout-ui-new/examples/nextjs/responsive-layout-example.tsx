"use client"

import React from "react";
import { AppLayout } from "../../src";
import { Button } from "../../src/components/ui/button";

export default function ResponsiveLayoutExample() {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<string>("");
  const [windowSize, setWindowSize] = React.useState<{width: number, height: number}>({width: 0, height: 0});
  
  // Update window size and breakpoint when window is resized
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({width, height});
      
      // Determine current breakpoint
      if (width < 640) {
        setCurrentBreakpoint("xs (< 640px)");
      } else if (width < 768) {
        setCurrentBreakpoint("sm (640px - 767px)");
      } else if (width < 1024) {
        setCurrentBreakpoint("md (768px - 1023px)");
      } else if (width < 1280) {
        setCurrentBreakpoint("lg (1024px - 1279px)");
      } else if (width < 1536) {
        setCurrentBreakpoint("xl (1280px - 1535px)");
      } else {
        setCurrentBreakpoint("2xl (≥ 1536px)");
      }
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
    name: "Responsive Demo",
    logo: "/logo.svg",
    description: "Breakpoint testing",
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
        {
          title: "Profile",
          url: "/profile",
          icon: "braces",
        },
      ],
    },
    secondary: {
      title: "Support",
      url: "#",
      items: [
        {
          title: "Help",
          url: "/help",
          icon: "information",
        },
        {
          title: "Contact",
          url: "/contact",
          icon: "chat",
        },
      ],
    },
  };

  // Content for settings panel
  const settingsContent = (
    <div className="space-y-6 pt-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Display Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select className="px-2 py-1 rounded border">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Density</span>
            <select className="px-2 py-1 rounded border">
              <option>Compact</option>
              <option>Comfortable</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-sidebar-foreground/10" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Breakpoint Info</h3>
        <div className="space-y-2 text-sm">
          <div className="bg-sidebar-foreground/5 p-3 rounded">
            <p className="font-medium">Current breakpoint:</p>
            <p className="text-sidebar-foreground/70">{currentBreakpoint}</p>
          </div>
          <div className="bg-sidebar-foreground/5 p-3 rounded">
            <p className="font-medium">Window dimensions:</p>
            <p className="text-sidebar-foreground/70">{windowSize.width}px × {windowSize.height}px</p>
          </div>
          <div className="bg-sidebar-foreground/5 p-3 rounded">
            <p className="font-medium">Breakpoint thresholds:</p>
            <ul className="list-disc ml-5 text-sidebar-foreground/70 space-y-1">
              <li>Mobile view: &lt; 1024px</li>
              <li>Desktop view: ≥ 1024px</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout
      siteInfo={siteInfo}
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
      settingsPanelContent={settingsContent}
      contentHeader="Responsive Layout Demo"
      showSettingsPanelTrigger={true}
      mobileBreakpoint={1024} // Set to 1024px to match our code
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Responsive Layout Behavior</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This example demonstrates how the AppLayout component behaves at different screen sizes.
            Resize your browser window to see the changes in real-time.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Current viewport:</h3>
            <p className="font-mono">Breakpoint: <span className="text-blue-600 dark:text-blue-400">{currentBreakpoint}</span></p>
            <p className="font-mono">Window size: <span className="text-blue-600 dark:text-blue-400">{windowSize.width}px × {windowSize.height}px</span></p>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Mobile View (&lt; 1024px)</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Sidebar appears as a Sheet from the left edge</li>
              <li>Settings panel appears as a Sheet from the right edge</li>
              <li>Content takes full width of the viewport</li>
              <li>Toggle sidebar and settings panel with their respective buttons</li>
            </ul>
          </section>
          
          <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Desktop View (≥ 1024px)</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Sidebar appears inline, pushing content to the right</li>
              <li>Settings panel appears inline, pushing content to the left</li>
              <li>Content area adjusts its width to accommodate the sidebar and settings panel</li>
              <li>Collapsing the sidebar or settings panel expands the content area</li>
            </ul>
          </section>
        </div>
        
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Component Behavior Instructions</h3>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <p className="mb-2">Try the following actions to test the layout:</p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Click the sidebar toggle button in the top-left corner</li>
              <li>Click the settings button in the header area</li>
              <li>Resize your browser between mobile and desktop breakpoints</li>
              <li>Use keyboard shortcuts: Ctrl/Cmd+B for sidebar, Ctrl/Cmd+S for settings panel</li>
            </ol>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}