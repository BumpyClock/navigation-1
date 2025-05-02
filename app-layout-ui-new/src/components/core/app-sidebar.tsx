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

import { TeamSwitcher } from "./team-switcher";
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
} from "../ui/sidebar";

import { NavGroup, SidebarData, Team } from "../../types";

// Using any type to avoid RemixiconComponentType type issues
type IconMapType = Record<string, any>;

// Default icon map
const defaultIconMap: IconMapType = {
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

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: SidebarData;
  iconMap?: IconMapType;
  onTeamChange?: (team: Team) => void;
  onNavItemClick?: (item: NavGroup) => void;
}

export function AppSidebar({ 
  data, 
  iconMap = defaultIconMap, 
  children, 
  onTeamChange,
  onNavItemClick,
  ...props 
}: AppSidebarProps) {
  // If no data is provided, render a basic sidebar with only children
  if (!data) {
    return (
      <Sidebar {...props} className="border-none! !dark:bg-secondary-background">
        {children}
      </Sidebar>
    );
  }
  
  return (
    <Sidebar {...props} className="border-none! !dark:bg-secondary-background">
      <SidebarHeader>
        {data.teams && data.teams.length > 0 && (
          <TeamSwitcher 
            teams={data.teams} 
            onTeamChange={onTeamChange}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        {data.navMain && data.navMain.length > 0 && data.navMain[0]?.items.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase text-sidebar-foreground/50">
              {data.navMain[0]?.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {data.navMain[0]?.items.map((item) => {
                  // Get the icon component from the map using the string identifier
                  const IconComponent = item.icon ? iconMap[item.icon] : undefined;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button font-medium gap-3 h-9 rounded-md data-[active=true]:hover:bg-transparent data-[active=true]:bg-linear-to-b data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-primary/70 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] [&>svg]:size-auto"
                        isActive={item.isActive}
                      >
                        <a 
                          href={item.url}
                          onClick={(e) => {
                            if (onNavItemClick) {
                              e.preventDefault();
                              onNavItemClick(item as NavGroup);
                            }
                          }}
                        >
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
        )}
        {children}
      </SidebarContent>
      <SidebarFooter>
        {data.navMain && data.navMain.length > 1 && data.navMain[1]?.items.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase text-sidebar-foreground/50">
              {data.navMain[1]?.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {data.navMain[1]?.items.map((item) => {
                  // Get the icon component from the map using the string identifier
                  const IconComponent = item.icon ? iconMap[item.icon] : undefined;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button font-medium gap-3 h-9 rounded-md [&>svg]:size-auto"
                        isActive={item.isActive}
                      >
                        <a 
                          href={item.url}
                          onClick={(e) => {
                            if (onNavItemClick) {
                              e.preventDefault();
                              onNavItemClick(item as NavGroup);
                            }
                          }}
                        >
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