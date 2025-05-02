"use client"

import React from "react";
import { AppLayout } from "../../src";

export default function FocusRingsFixedExample() {
  // Sample site info
  const siteInfo = {
    name: "Focus Rings Fixed",
    logo: "/logo.svg",
    description: "Accessibility Improvements",
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
        <h3 className="text-lg font-medium mb-2">Focus Ring Improvements</h3>
        <p className="text-sm text-sidebar-foreground/70">
          This example demonstrates the fixed focus ring behavior where focus rings only appear when navigating with the keyboard, not when clicking with the mouse.
        </p>
      </div>
      
      <div className="h-px bg-sidebar-foreground/10" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Testing Focus Rings</h3>
        <ol className="list-decimal ml-5 space-y-2 text-sm">
          <li><strong>Click Testing:</strong> Click on any sidebar item, section header, or logo - no focus rings should appear</li>
          <li><strong>Keyboard Testing:</strong> Press Tab key to navigate - focus rings should now be visible</li>
          <li><strong>Mobile Testing:</strong> On mobile view, no focus rings should show when tapping elements</li>
        </ol>
      </div>
    </div>
  );

  return (
    <AppLayout
      siteInfo={siteInfo}
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
      settingsPanelContent={settingsContent}
      contentHeader="Focus Rings Fixed"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Fixed Focus Ring Behavior</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This example shows the fixed focus ring implementation where focus rings only appear 
            when using keyboard navigation (Tab key), not when clicking with the mouse. This includes:
          </p>
          
          <ul className="list-disc ml-5 space-y-2 mb-6">
            <li>Logo and site title in sidebar</li>
            <li>Navigation items in sidebar</li>
            <li>Section headers (like "Navigation" and "Support")</li>
            <li>Settings panel elements</li>
          </ul>
        </section>
        
        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">How to Test</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Testing with Mouse/Touch:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click on the sidebar logo</li>
                <li>Click on section headers to expand/collapse</li>
                <li>Click on navigation items</li>
                <li>Click on the settings panel trigger</li>
                <li>Verify no focus rings appear during any of these actions</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Testing with Keyboard:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click somewhere on the page, then press Tab</li>
                <li>Continue pressing Tab to navigate through interactive elements</li>
                <li>Verify focus rings appear during keyboard navigation</li>
                <li>Use Enter or Space to activate focused elements</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}