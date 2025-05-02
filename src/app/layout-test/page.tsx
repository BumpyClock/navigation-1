"use client"

import dynamic from 'next/dynamic';
import ChatInterface from "@/components/chat-interface";

// Dynamically import the AppLayout component from our new package
// In a real app, you'd import from the package: import { AppLayout } from "app-layout-ui"
const AppLayout = dynamic(() => import('../../../app-layout-ui-new/src/components/core/app-layout').then(mod => mod.AppLayout), {
  ssr: false,
});

export default function NewLayoutTestPage() {
  // Define site info with logo and name
  const siteInfo = {
    name: "Next.js App",
    logo: "https://picsum.photos/200",
    description: "Layout Test Page"
  };

  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Development",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Design",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
  ];

  // Define custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Application",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: "home",
        },
        {
          title: "Layout Test",
          url: "/layout-test",
          icon: "dashboard",
          isActive: true,
        },
        {
          title: "Projects",
          url: "#",
          icon: "computer",
        },
        {
          title: "Resources",
          url: "#",
          icon: "stack",
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
        aria-current
      >
        Layout Test
      </a>
    </nav>
  );

  // Define custom settings panel content
  const settingsPanelContent = (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-sm mb-1">Theme</h3>
        <select className="w-full bg-background border border-sidebar-border rounded-md p-2 text-sm">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1">Language</h3>
        <select className="w-full bg-background border border-sidebar-border rounded-md p-2 text-sm">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1">Notifications</h3>
        <div className="flex items-center">
          <input type="checkbox" id="enable-notifications" className="mr-2" />
          <label htmlFor="enable-notifications" className="text-sm">Enable notifications</label>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {AppLayout ? (
        <AppLayout
          showSettingsPanel={true}
          defaultSettingsPanelOpen={true}
          siteInfo={siteInfo}
          teams={teams}
          sidebarNavItems={sidebarNavItems}
          mainNavItems={mainNavItems}
          backgroundClassName="bg-white dark:bg-gray-950"
          settingsPanelContent={settingsPanelContent}
          onLogoClick={() => console.log("Logo clicked")}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Enhanced Layout Component Test</h1>
            <p className="mb-4">This page demonstrates the updated AppLayout component with new features.</p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-2">Latest Updates</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Site logo and name in sidebar header</li>
                <li>Team switcher moved to top of main navigation area</li>
                <li>Collapsible navigation sections</li>
                <li>Secondary navigation (collapsed by default)</li>
                <li>More modular sidebar structure</li>
                <li>Logo click interaction support</li>
                <li>Dark mode support</li>
              </ul>
            </div>
            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-2">New Sidebar Structure</h2>
              <p className="mb-2">The sidebar now has a more organized structure:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Logo and site info at the top</li>
                <li>Team switcher immediately below</li>
                <li>Collapsible main navigation sections</li>
                <li>Collapsible secondary navigation in the footer</li>
              </ol>
              <p className="mt-3 mb-1">Try clicking on the section headers to collapse/expand them!</p>
            </div>
            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-2">Usage</h2>
              <p className="mb-2">The updated components are configured like this:</p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`// Site information with logo
const siteInfo = {
  name: "Next.js App",
  logo: "https://picsum.photos/200",
  description: "Layout Test Page"
};

// Teams for the team switcher (now at top of main content)
const teams = [
  { name: "Development", logo: "/team1-logo.png" },
  { name: "Design", logo: "/team2-logo.png" }
];

// Navigation items with collapsible sections
const sidebarNavItems = {
  main: {
    title: "Application", // This section is collapsible
    url: "#",
    items: [/* items here */]
  },
  secondary: {
    title: "Settings", // This section is also collapsible 
    url: "#",
    items: [/* items here */]
  }
};

<AppLayout
  siteInfo={siteInfo}
  teams={teams}
  sidebarNavItems={sidebarNavItems}
  onLogoClick={() => console.log("Logo clicked")}
  // ... other props
/>`}
              </pre>
            </div>
          </div>
        </AppLayout>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Loading layout component...</h1>
        </div>
      )}
    </div>
  );
}