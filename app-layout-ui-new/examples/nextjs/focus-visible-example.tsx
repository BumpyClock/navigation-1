"use client"

import React from "react";
import { AppLayout } from "../../src";

export default function FocusVisibleExample() {
  // Sample site info
  const siteInfo = {
    name: "Focus Visible Demo",
    logo: "/logo.svg",
    description: "Accessibility Features",
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
          title: "Profile",
          url: "/profile",
          icon: "braces",
        },
        {
          title: "Settings",
          url: "/settings",
          icon: "settings",
        },
        {
          title: "Reports",
          url: "/reports",
          icon: "computer",
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
        <h3 className="text-lg font-medium mb-2">Focus Visibility Settings</h3>
        <div className="space-y-2">
          <p className="text-sm text-sidebar-foreground/70">
            This demo demonstrates improved keyboard accessibility where focus outlines are only shown when using keyboard navigation.
          </p>
        </div>
      </div>
      
      <div className="h-px bg-sidebar-foreground/10" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">How to Test</h3>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li><strong>Mouse users:</strong> No focus rings shown when clicking</li>
          <li><strong>Keyboard users:</strong> Clear focus rings when tabbing</li>
          <li>Press Tab to navigate through the sidebar items</li>
          <li>Click with mouse to verify no focus rings appear</li>
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
      contentHeader="Focus Visibility Demo"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Keyboard Accessibility Enhancement</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This example demonstrates the improved focus visibility behavior in the app sidebar. 
            Focus rings are now only shown when navigating with the keyboard (Tab key), 
            not when clicking with the mouse.
          </p>
        </section>
        
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">How to Test the Focus Behavior:</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2">Mouse Navigation</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click on different sidebar items</li>
                <li>Notice there are no focus rings or outlines</li>
                <li>The UI remains clean and uncluttered</li>
              </ol>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2">Keyboard Navigation</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Press the Tab key to move focus through the UI</li>
                <li>Notice the clear focus rings around the focused elements</li>
                <li>This helps keyboard users see where they are in the UI</li>
              </ol>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Accessibility Benefits</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Cleaner Visual Design</strong>: No distracting focus rings for mouse users</li>
            <li><strong>Better Keyboard Navigation</strong>: Clear focus indicators for keyboard users</li>
            <li><strong>Improved Usability</strong>: Follows best practices for focus management</li>
            <li><strong>WCAG Compliance</strong>: Helps meet accessibility guidelines</li>
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}