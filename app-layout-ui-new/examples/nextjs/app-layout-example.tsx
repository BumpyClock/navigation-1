"use client"

import { AppLayout } from "app-layout-ui"; // In actual usage, this would be imported from the package

export default function AppLayoutExample() {
  // Note: This layout has been enhanced with:
  // 1. Responsive breakpoints - settings panel collapses at 1170px, sidebar at 1000px
  // 2. Smooth animations with framer-motion for better UX
  // 3. Intelligent adaptation to screen width
  
  // Define site info with logo and name
  const siteInfo = {
    name: "NextJS App",
    logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    description: "Admin Dashboard"
  };

  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Engineering",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Marketing",
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
          title: "Dashboard",
          url: "/dashboard",
          icon: "dashboard",
          isActive: true,
        },
        {
          title: "Projects",
          url: "/projects",
          icon: "computer",
        },
        {
          title: "Resources",
          url: "/resources",
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
          url: "/account",
          icon: "settings",
        },
        {
          title: "Help",
          url: "/help",
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
        href="/dashboard"
        aria-current
      >
        Dashboard
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
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-medium">Card 1</h2>
            <p className="text-gray-500">Content for card 1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-medium">Card 2</h2>
            <p className="text-gray-500">Content for card 2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-medium">Card 3</h2>
            <p className="text-gray-500">Content for card 3</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}