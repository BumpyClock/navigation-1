"use client"

import React from "react";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { UserDropdown } from "./user-dropdown";
import {
  SettingsPanelProvider,
  SettingsPanel,
  useSettingsPanel,
} from "./settings-panel";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { NavGroup, NavItem, SidebarData, Team, ThemeConfig } from "../../types";

export interface MainContentProps {
  children: React.ReactNode;
  showSettingsPanel: boolean;
  backgroundClassName: string;
  settingsPanelContent?: React.ReactNode;
}

// MainContent is an internal component used by AppLayout
function MainContent({
  children,
  showSettingsPanel,
  backgroundClassName,
  settingsPanelContent,
}: MainContentProps) {
  const { state } = useSettingsPanel();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`flex h-[calc(100svh-4rem)] md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-lg transition-all ease-in-out duration-300 overflow-hidden h-full`}>
      <div className={cn(
        `flex-1 w-full h-full md:rounded-s-[inherit] transition-all ease-in-out duration-300 overflow-hidden`,
          showSettingsPanel && isCollapsed ? "min-[1024px]:rounded-e-lg" : "min-[1024px]:rounded-e-3xl",
        backgroundClassName
      )}>
        <ScrollArea 
          id="main-content-area" 
          className="flex-1 h-full"
        >
          <div className="h-full">
            {children}
          </div>
        </ScrollArea>
      </div>
      {showSettingsPanel && <SettingsPanel content={settingsPanelContent} />}
    </div>
  );
}

export interface AppLayoutProps {
  children: React.ReactNode;
  showSettingsPanel?: boolean;
  defaultSettingsPanelOpen?: boolean;
  mainNavItems?: React.ReactNode;
  teams?: Team[];
  sidebarNavItems?: {
    main?: NavGroup;
    secondary?: NavGroup;
  };
  userDropdown?: React.ReactNode;
  headerContent?: React.ReactNode;
  backgroundClassName?: string;
  settingsPanelContent?: React.ReactNode;
  theme?: ThemeConfig;
  mobileBreakpoint?: number;
  onTeamChange?: (team: Team) => void;
  onNavItemClick?: (item: NavGroup | NavItem) => void;
}

export function AppLayout({
  children,
  showSettingsPanel = true,
  defaultSettingsPanelOpen = true,
  mainNavItems,
  teams,
  sidebarNavItems,
  userDropdown,
  headerContent,
  backgroundClassName = "bg-content dark:bg-content-dark",
  settingsPanelContent,
  mobileBreakpoint = 1024,
  onTeamChange,
  onNavItemClick,
}: AppLayoutProps) {
  // Create data object for AppSidebar if custom nav items are provided
  const sidebarData: SidebarData | undefined = sidebarNavItems ? {
    teams: teams || [],
    navMain: [
      sidebarNavItems.main || {
        title: "Navigation",
        url: "#",
        items: [],
      },
      sidebarNavItems.secondary || {
        title: "More",
        url: "#",
        items: [],
      },
    ],
  } : undefined;

  // Create CSS variables for theme if provided
  React.useEffect(() => {
    // Set theme CSS variables
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Apply theme if provided
      // We could enhance this with more detailed themes in the future
      if (backgroundClassName) {
        root.style.setProperty('--content-bg', 'var(--background, #ffffff)');
        root.style.setProperty('--content-dark-bg', 'var(--background-dark, #1e1e1e)');
      }
    }
  }, [backgroundClassName]);

  return (
    <SidebarProvider>
      <AppSidebar 
        data={sidebarData} 
        onTeamChange={onTeamChange}
        onNavItemClick={onNavItemClick}
      />
      <SidebarInset id="sidebar-inset" className="bg-sidebar group/sidebar-inset">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 md:px-6 lg:px-8 bg-sidebar text-sidebar-foreground relative before:absolute before:inset-y-3 before:-left-px before:w-px before:bg-linear-to-b before:from-white/5 before:via-white/15 before:to-white/5 before:z-50">
          <SidebarTrigger className="-ms-2" />
          {headerContent ? (
            headerContent
          ) : (
            <div className="flex items-center gap-8 ml-auto">
              {mainNavItems && mainNavItems}
              {userDropdown || <UserDropdown />}
            </div>
          )}
        </header>
        <SettingsPanelProvider 
          defaultOpen={defaultSettingsPanelOpen} 
          mobileBreaakpoint={mobileBreakpoint}
        >
          <MainContent 
            showSettingsPanel={showSettingsPanel}
            backgroundClassName={backgroundClassName}
            settingsPanelContent={settingsPanelContent}
          >
            {children}
          </MainContent>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}