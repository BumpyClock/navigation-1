"use client"

import { AppLayout } from "@/components/app-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiHome4Line, RiComputerLine, RiDashboardLine, RiStackLine } from "@remixicon/react";
import ChatInterface from "@/components/chat-interface";

export default function CustomLayoutPage() {
  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Custom App",
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
          url: "/custom-example",
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
        href="/custom-example"
        aria-current
      >
        Custom Example
      </a>
    </nav>
  );

  return (
    <AppLayout
      showSettingsPanel={true}
      defaultSettingsPanelOpen={true}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
      mainNavItems={mainNavItems}
      backgroundClassName="bg-white dark:bg-gray-950"
    >
      <ChatInterface title="Custom Chat Example" />
    </AppLayout>
  );
} 