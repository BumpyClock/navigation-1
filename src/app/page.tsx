import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AppLayout Demo",
  description: "Demonstration of the reusable AppLayout component",
};

import { AppLayout } from "@/components/app-layout";
import ChatInterface from "@/components/chat-interface";

export default function Page() {
  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Demo Team",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Example Corp",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
  ];

  // Define custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: "computer",
          isActive: true,
        },
        {
          title: "Projects",
          url: "#",
          icon: "braces",
        },
        {
          title: "Explorer",
          url: "#",
          icon: "planet",
        },
      ],
    },
    secondary: {
      title: "Support",
      url: "#",
      items: [
        {
          title: "Documentation",
          url: "#",
          icon: "braces",
        },
        {
          title: "Help",
          url: "#",
          icon: "seedling",
        },
        {
          title: "Settings",
          url: "#",
          icon: "settings",
        },
      ],
    },
  };

  // Example of how to use the AppLayout component with ChatInterface
  return (
    <AppLayout 
      showSettingsPanel={true}
      defaultSettingsPanelOpen={true}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
    >
      <ChatInterface title="AI Assistant" />
    </AppLayout>
  );
}