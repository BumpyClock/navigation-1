"use client"

import React from "react";
import { AppLayout } from "../../src";
import { Button } from "../../src/components/ui/button";

export default function MainContentExample() {
  // Different examples of using the contentHeader prop
  const exampleTypes = [
    { type: "string", label: "String Header" },
    { type: "component", label: "Component Header" },
    { type: "none", label: "No Header" },
  ];

  const [headerType, setHeaderType] = React.useState("string");
  const [showSettingsTrigger, setShowSettingsTrigger] = React.useState(true);

  // Content for the settings panel
  const settingsContent = (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Header Type</h3>
        <div className="flex flex-col space-y-2">
          {exampleTypes.map((example) => (
            <Button
              key={example.type}
              variant={headerType === example.type ? "default" : "outline"}
              onClick={() => setHeaderType(example.type)}
              className="justify-start"
            >
              {example.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Settings Trigger</h3>
        <div className="flex space-x-2">
          <Button
            variant={showSettingsTrigger ? "default" : "outline"}
            onClick={() => setShowSettingsTrigger(true)}
          >
            Show
          </Button>
          <Button
            variant={!showSettingsTrigger ? "default" : "outline"}
            onClick={() => setShowSettingsTrigger(false)}
          >
            Hide
          </Button>
        </div>
      </div>
    </div>
  );

  // Generate the appropriate header based on selected type
  const getHeader = () => {
    switch (headerType) {
      case "string":
        return "Page Title";
      case "component":
        return (
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl font-bold">Custom Header Component</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Action</Button>
              <Button size="sm">Primary Action</Button>
            </div>
          </div>
        );
      case "none":
        return undefined;
      default:
        return "Page Title";
    }
  };

  // Example siteInfo
  const siteInfo = {
    name: "MainContent Demo",
    logo: "/logo.svg",
    description: "Testing the MainContent component",
  };

  // Example sidebar navigation
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

  return (
    <AppLayout
      siteInfo={siteInfo}
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
      contentHeader={getHeader()}
      showSettingsPanelTrigger={showSettingsTrigger}
      settingsPanelContent={settingsContent}
    >
      <div className="space-y-4">
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">MainContent Component Demo</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This example demonstrates the customizable MainContent component with different header configurations.
            Use the settings panel to toggle between different header types and control the settings panel trigger visibility.
          </p>
        </section>

        <section className="space-y-2 mt-8">
          <h3 className="text-lg font-medium">Current Configuration:</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <pre className="text-sm">
              {JSON.stringify({
                headerType,
                showSettingsTrigger,
              }, null, 2)}
            </pre>
          </div>
        </section>

        <section className="mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Open the settings panel to change the header configuration.
          </p>
        </section>
      </div>
    </AppLayout>
  );
}