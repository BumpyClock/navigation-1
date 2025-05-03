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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

import { Button } from "../ui/button";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarSection } from "./sidebar-section";
import { NavGroup, NavItem, SidebarData, SiteInfo, Team } from "../../types";

// Default icon map - moved outside component to avoid recreation on each render
const defaultIconMap = {
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

// Type for the icon map
type IconMapType = typeof defaultIconMap;

// Empty state component - extracted for cleaner code
function EmptyStateContent() {
  return (
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
  );
}

// NavItem component - extracted for reuse and cleaner rendering
function NavItemComponent({
  item,
  iconMap,
  isSecondary,
  onNavItemClick,
}: {
  item: NavItem;
  iconMap: IconMapType;
  isSecondary?: boolean;
  // Ensure NavGroup is also accepted here if needed, or adjust type in AppSidebarProps
  onNavItemClick?: (item: NavItem) => void;
}) {
  // Determine how to render the icon based on its type
  const renderIcon = () => {
    if (!item.icon) {
      return null;
    }

    // If icon is a string, use the iconMap (for backward compatibility)
    if (typeof item.icon === 'string') {
      const IconComponent = iconMap[item.icon as keyof IconMapType];
      if (IconComponent) {
        return (
          <IconComponent
            className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-primary-icon"
            size={22}
            aria-hidden="true"
          />
        );
      }
      return null;
    }
    
    // If icon is a React component
    if (React.isValidElement(item.icon)) {
      // Define a type for the icon elements props to avoid TypeScript errors
      type IconElementProps = {
        className?: string;
        size?: number;
        'aria-hidden'?: boolean;
      };
      
      // Cast the element to have the props we expect
      const iconElement = item.icon as React.ReactElement<IconElementProps>;
      
      // If it's already a React element, just clone it with our classes
      return React.cloneElement(
        iconElement,
        {
          className: `text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-primary-icon ${iconElement.props.className || ''}`,
          size: iconElement.props.size || 22,
          'aria-hidden': true,
        } as IconElementProps
      );
    }
    
    // If it's a component type (not yet instantiated)
    if (typeof item.icon === 'function') {
      const IconComponent = item.icon as React.ComponentType<any>;
      return (
        <IconComponent
          className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-primary-icon"
          size={22}
          aria-hidden="true"
        />
      );
    }
    
    // Fallback for other React nodes
    return item.icon;
  };
  
  // Handler for item clicks
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavItemClick) {
      // Pass the original item (NavItem) to the callback
      onNavItemClick(item);
    } else if (item.url) {
      // WARNING: Using window.location.href causes a full page reload.
      // For SPAs (like Next.js), prefer using the onNavItemClick prop
      // and handle navigation with the framework's router (e.g., next/link or useRouter).
      window.location.href = item.url;
    }
  };
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={`group/menu-button font-medium gap-3 h-9 rounded-md ${!isSecondary ? 'data-[active=true]:hover:bg-transparent data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)]' : ''} [&>svg]:size-auto`}
        isActive={item.isActive}
      >
        <Button 
          type="button"
          onClick={handleClick}
          role="menuitem"
          className="flex w-full items-center gap-2 text-left focus:outline-none sidebar-nav-link focus-link"
          aria-current={item.isActive ? "page" : undefined}
          tabIndex={0}
        >
          {item.icon && (
            <div>
              {renderIcon()}
            </div>
          )}
          <span>{item.title}</span>
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: SidebarData;
  siteInfo?: SiteInfo;
  iconMap?: IconMapType;
  onTeamChange?: (team: Team) => void;
  /** Callback when a navigation item is clicked */
  // Updated type to specifically expect NavItem based on NavItemComponent usage
  onNavItemClick?: (item: NavItem) => void;
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
  // If no data is provided, render sidebar with empty state
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
          {children || <EmptyStateContent />}
        </SidebarContent>
        
        {children}
      </Sidebar>
    );
  }
  
  // Helper function to render navigation items
  const renderNavItems = (items: NavItem[], isSecondary = false) => {
    return items.map((item) => (
      <NavItemComponent 
        key={item.title}
        item={item} 
        iconMap={iconMap} 
        isSecondary={isSecondary}
        onNavItemClick={onNavItemClick}
      />
    ));
  };
  
  // Helper function to render navigation section with proper empty state
  const renderNavSection = (navGroup: NavGroup | undefined, isSecondary = false) => {
    if (!navGroup) return null;
    
    return (
      <SidebarSection 
        title={navGroup.title || (isSecondary ? "More" : "Navigation")}
        defaultOpen={!isSecondary}
      >
        {navGroup.items && navGroup.items.length > 0 ? (
          <SidebarMenu>
            {renderNavItems(navGroup.items, isSecondary)}
          </SidebarMenu>
        ) : (
          <div className="py-3 px-2 text-sidebar-foreground/50 text-sm text-center">
            <div className="flex justify-center mb-2">
              <RiInformationLine size={18} className="opacity-60" aria-hidden="true" />
            </div>
            <p>No {isSecondary ? "secondary" : ""} navigation items available</p>
          </div>
        )}
      </SidebarSection>
    );
  };
  
  return (
    <Sidebar 
      {...props} 
      className="border-none! !dark:bg-secondary-background flex flex-col app-sidebar"
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
        {/* Team Switcher */}
        {data.teams && data.teams.length > 0 && (
          <div className="mb-2 px-3">
            <TeamSwitcher 
              teams={data.teams} 
              onTeamChange={onTeamChange}
            />
          </div>
        )}
        
        {/* Main Navigation Section */}
        {data.navMain && data.navMain.length > 0 && 
          renderNavSection(data.navMain[0])}
        
        {children}
      </SidebarContent>
      
      {/* Footer with Secondary Nav */}
      <SidebarFooter className="flex flex-col gap-2">
        {/* Secondary Navigation */}
        {data.navMain && data.navMain.length > 1 && 
          renderNavSection(data.navMain[1], true)}
      </SidebarFooter>
    </Sidebar>
  );
}