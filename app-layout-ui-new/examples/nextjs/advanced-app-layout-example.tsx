"use client"

import React from 'react';
import { AppLayout, MainContent } from '../../src/components/core';

export default function AdvancedAppLayoutExample() {
  // Define site info with logo and name
  const siteInfo = {
    name: "Advanced Example",
    logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    description: "Demonstrating advanced usage"
  };

  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Product",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Engineering",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
  ];

  // Define custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Main Navigation",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: "home",
          isActive: true,
        },
        {
          title: "Projects",
          url: "#",
          icon: "computer",
        },
        {
          title: "Analytics",
          url: "#",
          icon: "dashboard",
        },
      ],
    },
    secondary: {
      title: "Support",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "#",
          icon: "settings",
        },
        {
          title: "Help",
          url: "#",
          icon: "chat",
        },
      ],
    },
  };

  // Custom settings panel content
  const settingsPanelContent = (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Advanced Settings</h3>
      <div className="space-y-2">
        <label className="block text-sm">
          Theme
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </label>
      </div>
    </div>
  );

  // Custom header content for MainContent
  const customHeader = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">A</span>
        <h1 className="text-xl font-semibold">Custom Header</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">Share</button>
        <button className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">Save</button>
      </div>
    </div>
  );

  return (
    <AppLayout
      siteInfo={siteInfo}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
    >
      {/* Using MainContent directly for advanced customization */}
      <MainContent
        header={customHeader}
        showSettingsPanelTrigger={true}
        settingsPanelContent={settingsPanelContent}
        backgroundClassName="bg-gray-50 dark:bg-gray-900"
      >
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Advanced Usage Example</h2>
            <p className="mb-4">
              This example demonstrates how to use the MainContent component directly 
              inside AppLayout for more advanced customization.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-700 dark:text-blue-300">
                <li>More explicit control over the content area</li>
                <li>Custom header with advanced layout</li>
                <li>Directly control settings panel behavior</li>
                <li>Customize background colors and styling</li>
                <li>Better separation of layout and content concerns</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Component Structure</h2>
            <p className="mb-4">
              With this approach, the component hierarchy is:
            </p>

            <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`<AppLayout>
  {/* Container styling handled by AppLayout */}
  <MainContent 
    header={customHeader}
    showSettingsPanelTrigger={true}
    settingsPanelContent={settingsPanelContent}
  >
    {/* Your custom content */}
  </MainContent>
</AppLayout>`}
            </pre>
            
            <p className="mt-4">
              This pattern provides maximum flexibility while ensuring consistent styling across the application.
            </p>
          </div>
        </div>
      </MainContent>
    </AppLayout>
  );
}