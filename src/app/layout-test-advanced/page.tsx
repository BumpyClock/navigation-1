"use client"

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the AppLayout and MainContent components
// In a real app, you'd import from the package: import { AppLayout, MainContent } from "app-layout-ui"
const AppLayout = dynamic(() => import('../../../app-layout-ui-new/src/components/core/app-layout').then(mod => mod.AppLayout), {
  ssr: false,
});

const MainContent = dynamic(() => import('../../../app-layout-ui-new/src/components/core/main-content').then(mod => mod.MainContent), {
  ssr: false,
});

export default function AdvancedLayoutTestPage() {
  // Define site info with logo and name
  const siteInfo = {
    name: "Advanced Demo",
    logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    description: "Advanced Layout Pattern"
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
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: "home",
        },
        {
          title: "Basic Demo",
          url: "/layout-test",
          icon: "stack",
        },
        {
          title: "Advanced Demo",
          url: "/layout-test-advanced",
          icon: "dashboard",
          isActive: true,
        },
        {
          title: "Projects",
          url: "#",
          icon: "computer",
        },
      ],
    },
    secondary: {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Account",
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

  // Define custom top navigation
  const mainNavItems = (
    <nav className="flex items-center text-sm font-medium max-sm:hidden">
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
        href="/"
      >
        Home
      </a>
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
        href="/layout-test"
      >
        Basic Demo
      </a>
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
        href="/layout-test-advanced"
        aria-current
      >
        Advanced Demo
      </a>
    </nav>
  );

  // Define custom settings panel content
  const settingsPanelContent = (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="font-medium text-base mb-2">Advanced Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="font-medium text-sm mb-1 block">Theme Mode</label>
            <select className="w-full bg-background border border-sidebar-border rounded-md p-2 text-sm">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          
          <div>
            <label className="font-medium text-sm mb-1 block">Color Theme</label>
            <div className="flex gap-2 mt-1">
              <button className="w-6 h-6 rounded-full bg-blue-500 ring-offset-2 ring-2 ring-blue-500/30"></button>
              <button className="w-6 h-6 rounded-full bg-purple-500"></button>
              <button className="w-6 h-6 rounded-full bg-green-500"></button>
              <button className="w-6 h-6 rounded-full bg-orange-500"></button>
              <button className="w-6 h-6 rounded-full bg-red-500"></button>
            </div>
          </div>
          
          <div>
            <label className="font-medium text-sm mb-1 block">Interface Density</label>
            <div className="flex gap-2 mt-1">
              <button className="px-3 py-1.5 text-xs rounded bg-sidebar-primary text-sidebar-primary-foreground">Compact</button>
              <button className="px-3 py-1.5 text-xs rounded bg-gray-100 dark:bg-gray-800">Comfortable</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm mb-1">Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="enable-animations" className="mr-2" checked />
            <label htmlFor="enable-animations" className="text-sm">Enable animations</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="enable-sounds" className="mr-2" />
            <label htmlFor="enable-sounds" className="text-sm">Enable sounds</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="show-tooltips" className="mr-2" checked />
            <label htmlFor="show-tooltips" className="text-sm">Show tooltips</label>
          </div>
        </div>
      </div>
    </div>
  );

  // Custom header content with fancy design
  const customHeader = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md blur-sm opacity-70"></div>
          <div className="relative p-1.5 bg-white dark:bg-gray-900 rounded-md shadow-sm">
            <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Advanced Layout Pattern</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Using MainContent for enhanced customization</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Share
        </button>
        <button className="px-2 py-1 text-sm rounded-md bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90 transition-opacity">
          Save
        </button>
      </div>
    </div>
  );

  // Example with mixed usage - showcasing both approaches
  const [useHeaderContent, setUseHeaderContent] = React.useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = React.useState(true);

  // Make sure to handle settingsPanelContent properly
  // It should only be passed to AppLayout, not to MainContent now
  
  return (
    <div>
      {AppLayout && MainContent ? (
        <AppLayout
          siteInfo={siteInfo}
          teams={teams}
          sidebarNavItems={sidebarNavItems}
          mainNavItems={mainNavItems}
          defaultSettingsPanelOpen={true}
          showSettingsPanel={true}
          showSettingsPanelTrigger={false}
          settingsPanelContent={settingsPanelContent}
         
        >
          <MainContent
            header={!useHeaderContent ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md blur-sm opacity-70"></div>
                    <div className="relative p-1.5 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                      <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">Using MainContent's header</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">MainContent for enhanced customization</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                    className="px-3 py-1.5 text-sm rounded-md border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  >
                    {showSettingsPanel ? "Hide Settings Panel" : "Show Settings Panel"}
                  </button>
                  <button 
                    onClick={() => setUseHeaderContent(true)}
                    className="px-3 py-1.5 text-sm rounded-md bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Switch to AppLayout Header
                  </button>
                </div>
              </div>
            ) : undefined}
            // Only pass settings panel trigger control, not the panel itself
            showSettingsPanelTrigger={!useHeaderContent && showSettingsPanel}
            
          >
           <div> <div className="py-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
                <h2 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">Advanced Component Pattern</h2>
                <p className="mb-4">
                  This example demonstrates the advanced usage pattern, where the MainContent component is explicitly used
                  within AppLayout for greater control and customization.
                </p>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-900/50 mb-4">
                  <h3 className="text-yellow-800 dark:text-yellow-300 font-medium text-sm mb-1">Current Demo Status:</h3>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1 ml-4 list-disc">
                    <li>
                      <strong>Header Location:</strong> {useHeaderContent ? 
                        "AppLayout's top bar (MainContent header disabled)" : 
                        "MainContent's content area"}
                    </li>
                    <li>
                      <strong>Settings Panel:</strong> {showSettingsPanel ? 
                        "Visible (controlled by AppLayout)" : 
                        "Hidden (controlled by AppLayout)"}
                    </li>
                    <li>
                      <strong>Settings Trigger:</strong> {!useHeaderContent && showSettingsPanel ? 
                        "Visible in content header (controlled by MainContent)" : 
                        useHeaderContent ? "Hidden (when using AppLayout header, MainContent header is completely disabled)" :
                        "Hidden (settings panel is hidden)"}
                    </li>
                    <li className="font-bold text-green-700 dark:text-green-400">
                      ✅ Fixed: Now using streamlined architecture - no nested ScrollAreas
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-4 mb-6">
                  <h3 className="text-purple-800 dark:text-purple-300 font-medium mb-2">Key Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-purple-700 dark:text-purple-300">
                    <li>Explicit control over content presentation</li>
                    <li>Custom header with advanced styling</li>
                    <li>Direct control over settings panel integration</li>
                    <li>Clearer separation of layout and content concerns</li>
                    <li>Better code organization for complex layouts</li>
                  </ul>
                </div>
                
                <h3 className="text-md font-medium mb-2">Component Code</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto mb-4">
{`// Import both components
import { AppLayout, MainContent } from 'app-layout-ui';
import { useState } from 'react';

// Example with header and settings panel control
const AdvancedDemo = () => {
  // State to control header location and settings panel visibility
  const [useHeaderContent, setUseHeaderContent] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);

  return (
    <AppLayout
      siteInfo={siteInfo}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
      // Settings panel is controlled at AppLayout level
      showSettingsPanel={showSettingsPanel}
      settingsPanelContent={<SettingsPanel />}
      // When using headerContent, MainContent header AND trigger are completely disabled
      headerContent={useHeaderContent ? (
        <div className="flex items-center w-full">
          <h2 className="text-lg font-semibold">Top Navigation</h2>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setShowSettingsPanel(!showSettingsPanel)}>
              {showSettingsPanel ? "Hide Settings" : "Show Settings"}
            </button>
            <button onClick={() => setUseHeaderContent(false)}>
              Switch to Content Header
            </button>
          </div>
        </div>
      ) : undefined}
    >
      <MainContent
        // This header only shows when headerContent is not provided
        header={!useHeaderContent ? (
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Content Area Header</h1>
            <button onClick={() => setUseHeaderContent(true)}>
              Switch to Top Navigation
            </button>
          </div>
        ) : undefined}
        // Only show settings trigger when using content header and settings panel is visible
        showSettingsPanelTrigger={!useHeaderContent && showSettingsPanel}
        backgroundClassName="bg-gray-50 dark:bg-gray-950"
      >
        {/* Your content here */}
        <div className="space-y-4">
          <p>Your main content goes here</p>
        </div>
      </MainContent>
    </AppLayout>
  );
}`}
                </pre>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
                  <h3 className="text-md font-medium mb-3">Custom Header</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The header above demonstrates a complex layout with gradient effects, icons, and multiple buttons.
                    This level of customization is much easier with the advanced pattern.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
                  <h3 className="text-md font-medium mb-3">Custom Settings Panel</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The settings panel (click the gear icon in header) has been enhanced with color pickers,
                    density controls, and grouped preferences - all passed directly to MainContent.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
                <h3 className="text-md font-medium mb-3">Component Integration Features</h3>
                <div className="space-y-3">
                  <p className="text-sm">This advanced demo showcases how MainContent integrates with AppLayout:</p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1 text-blue-700 dark:text-blue-300">Streamlined Architecture</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        When passing MainContent directly as a child, AppLayout will extract and use the child's 
                        props while avoiding nested scrolling areas. This creates a flatter DOM structure while
                        preserving the flexible API.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1 text-purple-700 dark:text-purple-300">Component Composition Without Nesting</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        AppLayout intelligently extracts MainContent props when used as a direct child,
                        avoiding unnecessary DOM nesting. This creates a cleaner rendering architecture while
                        maintaining the semantic benefits of component composition.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1 text-green-700 dark:text-green-300">Prop Precedence</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        When props are specified on both components (e.g., backgroundClassName), the values
                        from MainContent take precedence over those from AppLayout.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 mt-2">
                      <p className="text-sm font-medium mb-1">Try it out:</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Use the buttons to see how these components interact:
                      </p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc ml-4 mt-1 space-y-1">
                        <li>Switch between header locations (top bar vs. content area)</li>
                        <li>Toggle settings panel visibility</li>
                        <li>See how settings panel trigger automatically appears/disappears</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
                <h3 className="text-md font-medium mb-3">When To Use Each Pattern</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1">✅ Sticky Navigation & Global Controls</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Use AppLayout's headerContent for app-wide navigation, user dropdown, notifications that stay visible while scrolling</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1">✅ Page-Specific Headings & Actions</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Use MainContent's header for page titles, contextual actions, breadcrumbs specific to the current view</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1">✅ Dashboard & Analytics</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Use AppLayout headerContent for persistent filters and time range selectors, with MainContent for content-specific controls</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1">✅ Document Editing</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Use MainContent header for document title and actions (save, share, etc.) while using settings panel for document properties</p>
                    </div>
                  </div>
                </div>
              </div>
            </div></div>
          </MainContent>
        </AppLayout>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Loading advanced layout components...</h1>
        </div>
      )}
    </div>
  );
}