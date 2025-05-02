"use client"

import React from "react";
import { AppLayout } from "../../src";
import { Button } from "../../src/components/ui/button";

export default function EnhancedFocusRingsExample() {
  // Sample site info
  const siteInfo = {
    name: "Better Focus Rings",
    logo: "/logo.svg",
    description: "Accessibility Demo",
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

  // Settings panel content
  const settingsContent = (
    <div className="space-y-6 pt-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Enhanced Focus Rings</h3>
        <p className="text-sm text-sidebar-foreground/70 mb-4">
          This example demonstrates the enhanced focus ring behavior where keyboard users see clear, consistent focus indicators.
        </p>
        
        <div className="space-y-3">
          <button className="bg-sidebar-primary text-sidebar-primary-foreground px-4 py-2 rounded-md w-full">
            Focusable Button 1
          </button>
          <button className="bg-sidebar-accent text-sidebar-accent-foreground px-4 py-2 rounded-md w-full">
            Focusable Button 2
          </button>
          <a href="#" className="block bg-sidebar-foreground/10 text-sidebar-foreground px-4 py-2 rounded-md text-center">
            Focusable Link
          </a>
          <input 
            type="text" 
            placeholder="Focusable Input" 
            className="block w-full px-4 py-2 rounded-md bg-sidebar-foreground/5 text-sidebar-foreground border border-sidebar-foreground/20"
          />
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
      contentHeader="Enhanced Focus Rings Demo"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Enhanced Focus Ring Visibility</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This example demonstrates improved focus ring visibility for all interactive elements.
            The focus rings now appear consistently on all controls during keyboard navigation.
          </p>
        </section>
        
        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-3">How to Test Focus Rings</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Click somewhere on this page, then press Tab key repeatedly</li>
            <li>Notice how all interactive elements show a clear blue focus ring</li>
            <li>Try tabbing through the sidebar, section headers, and navigation items</li>
            <li>Compare with clicking on elements (which should not show focus rings)</li>
          </ol>
        </section>
        
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Interactive Elements to Test</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Buttons</h4>
              <div className="space-y-2">
                <Button>Default Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Links</h4>
              <div className="space-y-2">
                <a href="#" className="text-blue-600 dark:text-blue-400 block">Simple Link</a>
                <a href="#" className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded block">Button-style Link</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Form Controls</h4>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Text Input" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                />
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                  <option>Select Option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Custom Elements</h4>
              <div className="space-y-2">
                <div role="button" tabIndex={0} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded text-center">
                  Custom Role="button"
                </div>
                <div tabIndex={0} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded text-center">
                  Element with tabIndex="0"
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
          Open the settings panel to see additional interactive elements with proper focus styling.
        </p>
      </div>
    </AppLayout>
  );
}