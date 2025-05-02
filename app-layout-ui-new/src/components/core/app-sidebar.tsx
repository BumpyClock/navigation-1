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
  RiInformationLine,
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

import { SidebarLogo } from "./sidebar-logo";
import { SidebarSection } from "./sidebar-section";
import { Icon } from "./icon";
import { NavGroup, SidebarData, SiteInfo, Team } from "../../types";

// Define a proper type for RemixIcon components
import type { IconNode } from "@remixicon/react";

type IconMapType = Record<string, React.ComponentType<{
  className?: string;
  size?: number | string;
  color?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>>;

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
  siteInfo?: SiteInfo;
  iconMap?: IconMapType;
  onTeamChange?: (team: Team) => void;
  onNavItemClick?: (item: NavGroup) => void;
  onLogoClick?: () => void;
}

export function AppSidebar({ 
  data, 
  siteInfo,
  iconMap = defaultIconMap, 
  children, 
  onTeamChange,
  onNavItemClick,
  onLogoClick,
  ...props 
}: AppSidebarProps) {
  // If no data is provided, render a basic sidebar with empty state UI
  if (!data) {
    return (
      <Sidebar 
        {...props} 
        className="border-none! !dark:bg-secondary-background"
        role="navigation"
        aria-label="Main navigation"
      >
        {siteInfo && (
          <SidebarHeader>
            <SidebarLogo
              logo={siteInfo.logo}
              title={siteInfo.name}
              subtitle={siteInfo.description}
              onClick={onLogoClick}
            />
          </SidebarHeader>
        )}
        
        <SidebarContent className="flex-1 flex flex-col items-center justify-center p-4 text-sidebar-foreground/50">
          {children || (
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <RiInformationLine size={36} className="opacity-50" aria-hidden="true" />
              </div>
              <h3 className="text-base font-medium mb-2">No navigation items</h3>
              <p className="text-sm opacity-80 mb-4">
                Navigation data is missing. Please provide the <code className="text-xs bg-sidebar-foreground/10 px-1.5 py-0.5 rounded-sm">data</code> prop to display navigation items.
              </p>
              <div className="text-xs bg-sidebar-foreground/10 p-3 rounded-md text-left overflow-auto">
                <pre>{`<AppSidebar
  data={{
    teams: [...],
    navMain: [...]
  }}
/>`}</pre>
              </div>
            </div>
          )}
        </SidebarContent>
        
        {children}
      </Sidebar>
    );
  }
  
  // Helper function to render navigation items
  const renderNavItems = (items: NavItem[], isSecondary = false) => {
    return items.map((item) => {
      // Get the icon component from the map using the string identifier
      const IconComponent = item.icon ? iconMap[item.icon] : undefined;
      
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`group/menu-button font-medium gap-3 h-9 rounded-md ${!isSecondary ? 'data-[active=true]:hover:bg-transparent data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)]' : ''} [&>svg]:size-auto`}
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
              role="menuitem"
              aria-current={item.isActive ? "page" : undefined}
            >
              {IconComponent && (
                <IconComponent
                  className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-primary-icon"
                  size={22}
                  aria-hidden="true"
                />
              )}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };
  
  return (
    <Sidebar 
      {...props} 
      className="border-none! !dark:bg-secondary-background flex flex-col"
      role="navigation" 
      aria-label="Main navigation"
    >
      {/* Site Logo & Info */}
      <SidebarHeader>
        {siteInfo && (
          <SidebarLogo
            logo={siteInfo.logo}
            title={siteInfo.name}
            subtitle={siteInfo.description}
            onClick={onLogoClick}
          />
        )}
      </SidebarHeader>
      
      {/* Main Navigation */}
      <SidebarContent className="flex-1 flex flex-col gap-2">
        {/* Team Switcher moved to top of main content */}
        {data.teams && data.teams.length > 0 && (
          <div className="mb-2 px-3">
            <TeamSwitcher 
              teams={data.teams} 
              onTeamChange={onTeamChange}
            />
          </div>
        )}
        
        {/* Main Navigation Section (Collapsible) */}
        {data.navMain && data.navMain.length > 0 ? (
          <SidebarSection 
            title={data.navMain[0]?.title || "Navigation"}
            defaultOpen={true}
          >
            {data.navMain[0]?.items && data.navMain[0]?.items.length > 0 ? (
              <SidebarMenu>
                {renderNavItems(data.navMain[0]?.items)}
              </SidebarMenu>
            ) : (
              <div className="py-3 px-2 text-sidebar-foreground/50 text-sm text-center">
                <div className="flex justify-center mb-2">
                  <RiInformationLine size={18} className="opacity-60" aria-hidden="true" />
                </div>
                <p>No navigation items available</p>
              </div>
            )}
          </SidebarSection>
        ) : null}
        
        {children}
      </SidebarContent>
      
      {/* Footer with Secondary Nav */}
      <SidebarFooter className="flex flex-col gap-2">
        {/* Secondary Navigation (Collapsible) */}
        {data.navMain && data.navMain.length > 1 ? (
          <SidebarSection 
            title={data.navMain[1]?.title || "More"}
            defaultOpen={false}
          >
            {data.navMain[1]?.items && data.navMain[1]?.items.length > 0 ? (
              <SidebarMenu>
                {renderNavItems(data.navMain[1]?.items, true)}
              </SidebarMenu>
            ) : (
              <div className="py-3 px-2 text-sidebar-foreground/50 text-sm text-center">
                <div className="flex justify-center mb-2">
                  <RiInformationLine size={18} className="opacity-60" aria-hidden="true" />
                </div>
                <p>No secondary items available</p>
              </div>
            )}
          </SidebarSection>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}