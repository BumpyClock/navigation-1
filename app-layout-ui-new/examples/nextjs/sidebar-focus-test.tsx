"use client"

import React from "react";
import { AppLayout } from "../../src";
import { Button } from "../../src/components/ui/button";

export default function SidebarFocusTest() {
  // Sample site info
  const siteInfo = {
    name: "Sidebar Focus Test",
    logo: "/logo.svg",
    description: "Testing Focus Rings",
  };

  // Many navigation items to ensure tabbing works through all of them
  const sidebarNavItems = {
    main: {
      title: "Navigation Focus",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "home",
          isActive: true,
        },
        {
          title: "Profile Settings",
          url: "/profile",
          icon: "braces",
        },
        {
          title: "Account Settings",
          url: "/settings",
          icon: "settings",
        },
        {
          title: "Projects",
          url: "/projects",
          icon: "computer",
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: "checkDouble",
        },
        {
          title: "Messages",
          url: "/messages",
          icon: "chat",
        },
      ],
    },
    secondary: {
      title: "Support Focus",
      url: "#",
      items: [
        {
          title: "Help Center",
          url: "/help",
          icon: "information",
        },
        {
          title: "Contact Support",
          url: "/contact",
          icon: "mic",
        },
        {
          title: "Documentation",
          url: "/docs",
          icon: "bard",
        },
      ],
    },
  };

  // Content for settings panel for testing focus
  const settingsContent = (
    <div className="space-y-6 pt-4">
      <h3 className="text-lg font-medium mb-4">Testing Sidebar Focus</h3>
      
      <div className="space-y-4">
        <p className="text-sm">
          To test focus in the sidebar, follow these steps:
        </p>
        
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>Click on this settings panel to start</li>
          <li>Press Tab repeatedly to move through the app</li>
          <li>Watch for focus rings on all interactive elements</li>
          <li>Pay special attention to the sidebar navigation items</li>
          <li>Note if focus rings show correctly on all elements</li>
        </ol>
        
        <div className="pt-4 space-y-2">
          <Button className="w-full">Test Button 1</Button>
          <Button className="w-full">Test Button 2</Button>
          <a href="#" className="block text-center bg-sidebar-foreground/10 p-2 rounded">Test Link</a>
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
      contentHeader="Sidebar Focus Test"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Testing Focus Rings in Sidebar</h2>
          <p className="mb-4">
            This example is specifically designed to test focus ring visibility in the sidebar navigation.
            The focus rings should appear when navigating with the Tab key, not when clicking with the mouse.
          </p>
          
          <div className="space-y-3">
            <p className="font-medium">To test:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on this text to start</li>
              <li>Press Tab to move focus through the page</li>
              <li>The Tab order should include sidebar elements</li>
              <li>Watch for clear focus rings around each nav item</li>
              <li>Focus should be visible on:</li>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Navigation items (Dashboard, Profile, etc.)</li>
                <li>Section headers (Navigation Focus, Support Focus)</li>
                <li>The site logo and title</li>
                <li>The sidebar toggle button</li>
              </ul>
            </ol>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Interactive Elements</h3>
            <div className="space-y-4">
              <Button className="w-full">Focus Test Button 1</Button>
              <Button className="w-full" variant="outline">Focus Test Button 2</Button>
              <input 
                type="text" 
                placeholder="Focus Test Input" 
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              />
              <a href="#" className="block text-center bg-gray-100 dark:bg-gray-800 p-2 rounded">
                Focus Test Link
              </a>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Focus Order Test</h3>
            <p className="mb-4 text-sm">
              The tab order should be logical and include both app content and sidebar navigation elements.
              Press Tab repeatedly and observe how focus moves through the page.
            </p>
            <div className="text-sm space-y-2">
              <p>Expected tab order:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Sidebar toggle button</li>
                <li>Logo and site title</li>
                <li>Navigation section header</li>
                <li>Dashboard item</li>
                <li>Profile Settings item</li>
                <li>And so on through all navigation items</li>
                <li>Then to page content elements</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}