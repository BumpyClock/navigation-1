"use client"
import * as React from "react";
import {
  RiChat1Line,
  RiBardLine,
  RiMickeyLine,
  RiMicLine,
  RiCheckDoubleLine,
  RiBracesLine,
  RiPlanetLine,
  RiSeedlingLine,
  RiSettings3Line,
  RiHome4Line,
  RiDashboardLine,
  RiComputerLine,
  RiStackLine,
} from "@remixicon/react";

import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Define types for sidebar data
type NavItem = {
  title: string;
  url: string;
  icon?: string; // Using string identifiers instead of component references
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};

type SidebarData = {
  teams: {
    name: string;
    logo: string;
  }[];
  navMain: NavGroup[];
};

// Map of icon names to components for rendering
// Using any type to avoid RemixiconComponentType type issues
const ICON_MAP: Record<string, any> = {
  // Default icons
  chat: RiChat1Line,
  bard: RiBardLine,
  mickey: RiMickeyLine,
  mic: RiMicLine,
  checkDouble: RiCheckDoubleLine,
  braces: RiBracesLine,
  planet: RiPlanetLine,
  seedling: RiSeedlingLine,
  settings: RiSettings3Line,
  
  // Additional icons for custom pages
  home: RiHome4Line,
  dashboard: RiDashboardLine,
  computer: RiComputerLine,
  stack: RiStackLine,
};

// This is sample data.
const defaultData: SidebarData = {
  teams: [
    {
      name: "ArkDigital",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Acme Corp.",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Evil Corp.",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      items: [
        {
          title: "Chat",
          url: "#",
          icon: "chat",
          isActive: true,
        },
        {
          title: "Real-time",
          url: "#",
          icon: "bard",
        },
        {
          title: "Assistants",
          url: "#",
          icon: "mickey",
        },
        {
          title: "Audio",
          url: "#",
          icon: "mic",
        },
        {
          title: "Metrics",
          url: "#",
          icon: "checkDouble",
        },
        {
          title: "Documentation",
          url: "#",
          icon: "braces",
        },
      ],
    },
    {
      title: "More",
      url: "#",
      items: [
        {
          title: "Community",
          url: "#",
          icon: "planet",
        },
        {
          title: "Help Centre",
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
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data?: SidebarData;
};

export function AppSidebar({ data = defaultData, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className=" border-none! !dark:bg-secondary-background">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* We only show the first parent group */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-sidebar-foreground/50">
            {data.navMain[0]?.title}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {data.navMain[0]?.items.map((item) => {
                // Get the icon component from the map using the string identifier
                const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button font-medium gap-3 h-9 rounded-md data-[active=true]:hover:bg-transparent data-[active=true]:bg-linear-to-b data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-primary/70 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] [&>svg]:size-auto"
                      isActive={item.isActive}
                    >
                      <a href={item.url}>
                        {IconComponent && (
                          <IconComponent
                            className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-foreground"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Secondary Navigation */}
        {data.navMain[1] && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase text-sidebar-foreground/50">
              {data.navMain[1]?.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {data.navMain[1]?.items.map((item) => {
                  // Get the icon component from the map using the string identifier
                  const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button font-medium gap-3 h-9 rounded-md [&>svg]:size-auto"
                        isActive={item.isActive}
                      >
                        <a href={item.url}>
                          {IconComponent && (
                            <IconComponent
                              className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}