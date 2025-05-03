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
  SettingsPanel, SettingsPanelProvider, SettingsPanelTrigger,
} from "./settings-panel";
import { cn } from "../../lib/utils";
import { MainContentProps, NavGroup, NavItem, SidebarData, SiteInfo, Team, ThemeConfig } from "../../types";
import { ErrorBoundary } from "./error-boundary";
import { validateTheme, applyThemeToDocument } from "../../lib/theme-utils";
import { MainContent } from "./main-content";

// Header component extracted to reduce complexity in AppLayout
function Header({ 
  headerContent, 
  mainNavItems, 
  userDropdown 
}: { 
  headerContent?: React.ReactNode;
  mainNavItems?: React.ReactNode;
  userDropdown?: React.ReactNode;
}) {
  return (
    <header 
      // Use theme variables for the pseudo-element background gradient
      className="flex h-16 shrink-0 items-center gap-2 pl-2 pr-4 md:pr-6 md:pl-2 lg:pr-8 lg:pl-2 bg-sidebar text-sidebar-foreground relative before:absolute before:inset-y-3 before:-left-px before:w-px before:bg-gradient-to-b before:from-[var(--sidebar-fg,currentColor)]/5 before:via-[var(--sidebar-fg,currentColor)]/15 before:to-[var(--sidebar-fg,currentColor)]/5 before:z-50" 
      role="banner"
    >
      <div className="group-data-[state=collapsed]/sidebar-inset:pl-4 group-data-[state=collapsed]/sidebar-inset:md:pl-6 group-data-[state=collapsed]/sidebar-inset:lg:pl-8 transition-all duration-300">
        <SidebarTrigger className="-ms-2" aria-label="Toggle sidebar" />
      </div>
      {headerContent ? (
        headerContent
      ) : (
        <div className="flex items-center gap-8">
          {mainNavItems && mainNavItems}
          {userDropdown || <UserDropdown />}
        </div>
      )}
    </header>
  );
}

/**
 * AppLayout component
 * 
 * The main layout component that provides the entire application structure including
 * sidebar, header, main content area, and optional settings panel.
 */
export interface AppLayoutProps {
  /** The main content of the application */
  children: React.ReactNode;
  
  /** Whether to show the settings panel (defaults to true) */
  showSettingsPanel?: boolean;
  
  /** Whether the settings panel should be open by default (defaults to true) */
  defaultSettingsPanelOpen?: boolean;
  
  /** Custom navigation items to display in the main header */
  mainNavItems?: React.ReactNode;
  
  /** Site information (name, logo, description) */
  siteInfo?: SiteInfo;
  
  /** Teams for the team switcher component */
  teams?: Team[];
  
  /** Navigation items for the sidebar */
  sidebarNavItems?: {
    main?: NavGroup;
    secondary?: NavGroup;
  };
  
  /** Custom user dropdown component (defaults to default UserDropdown) */
  userDropdown?: React.ReactNode;
  
  /** Custom header content (replaces default header) */
  headerContent?: React.ReactNode;
  
  /** CSS class name for the main content background (defaults to "bg-content dark:bg-content-dark") */
  backgroundClassName?: string;
  
  /** Content to display in the settings panel */
  settingsPanelContent?: React.ReactNode;
  
  /** Theme configuration for customizing colors */
  theme?: ThemeConfig;
  
  /** Breakpoint for mobile view in pixels (defaults to 1024) */
  mobileBreakpoint?: number;
  
  /** Callback when a team is selected in the team switcher */
  onTeamChange?: (team: Team) => void;
  
  /** Callback when a navigation item is clicked */
  onNavItemClick?: (item: NavGroup | NavItem) => void;
  
  /** Callback when the logo is clicked */
  onLogoClick?: () => void;
  
  /** Optional header title or custom component for the main content area */
  contentHeader?: React.ReactNode;
  
  /** Whether to show the settings panel trigger in the main content header (defaults to true) */
  showSettingsPanelTrigger?: boolean;
  
  /** Optional class name for the main content header */
  contentHeaderClassName?: string;
}

export function AppLayout({
  children,
  showSettingsPanel = true,
  defaultSettingsPanelOpen = true,
  mainNavItems,
  siteInfo,
  teams = [],
  sidebarNavItems,
  userDropdown,
  headerContent,
  backgroundClassName = "bg-content dark:bg-content-dark",
  settingsPanelContent,
  mobileBreakpoint = 1024,
  onTeamChange,
  onNavItemClick,
  onLogoClick,
  theme,
  contentHeader,
  showSettingsPanelTrigger = true,
  contentHeaderClassName,
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

  /**
   * Validate and memoize the theme
   */
  const validatedTheme = React.useMemo(() => {
    // Detect if we should use dark theme as base (can be extended to detect system preference)
    const shouldUseDarkTheme = false; // Could be connected to a theme context or OS preference
    return validateTheme(theme, shouldUseDarkTheme);
  }, [theme]);
  
  /**
   * Function to apply theme CSS variables to the document root
   */
  const applyThemeVariables = React.useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Apply the validated theme
    applyThemeToDocument(validatedTheme);
    
    // Fallback for background class name
    if (backgroundClassName) {
      document.documentElement.style.setProperty('--content-bg', 'var(--background, #ffffff)');
      document.documentElement.style.setProperty('--content-dark-bg', 'var(--background-dark, #1e1e1e)');
    }
  }, [backgroundClassName, validatedTheme]);
  
  // Track if component is mounted to handle SSR properly
  const [isMounted, setIsMounted] = React.useState(false);
  
  // Set mounted state on first render
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Apply theme variables once mounted and whenever theme changes
  React.useEffect(() => {
    if (!isMounted) return;
    applyThemeVariables();
  }, [isMounted, applyThemeVariables]);

  // Helper to properly render content based on type
  const renderContent = () => {
    // If children is already a MainContent component, use it directly
    if (React.isValidElement(children) && children.type === MainContent) {
      return children;
    }
    
    // Otherwise, wrap the children in a MainContent component
    return (
      <MainContent
        header={contentHeader}
        showSettingsPanelTrigger={showSettingsPanelTrigger && showSettingsPanel}
        headerClassName={contentHeaderClassName}
        backgroundClassName={backgroundClassName}
      >
        {children}
      </MainContent>
    );
  };

  return (
    <div className="app-layout-ui">
      <ErrorBoundary>
        <SidebarProvider mobileBreakpoint={mobileBreakpoint} style={{ padding: 0, margin: 0 }}>
          <ErrorBoundary fallback={
            <div className="w-64 bg-sidebar text-sidebar-foreground p-4">
              <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Sidebar Error</h2>
                <p>There was a problem loading the sidebar.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded"
                >
                  Reload
                </button>
              </div>
            </div>
          }>
            <AppSidebar 
              data={sidebarData}
              siteInfo={siteInfo}
              onTeamChange={onTeamChange}
              onNavItemClick={onNavItemClick}
              onLogoClick={onLogoClick}
            />
          </ErrorBoundary>
          <SidebarInset id="sidebar-inset" className="bg-sidebar group/sidebar-inset" role="main" style={{ paddingLeft: 0, margin: 0 }}>
            <ErrorBoundary fallback={
              <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Header Error</h2>
                <p>There was a problem loading the header.</p>
              </div>
            }>
              <Header 
                headerContent={headerContent}
                mainNavItems={mainNavItems}
                userDropdown={userDropdown}
              />
            </ErrorBoundary>
            <SettingsPanelProvider 
              defaultOpen={defaultSettingsPanelOpen} 
              mobileBreakpoint={mobileBreakpoint}
            >
              <ErrorBoundary>
                <div className="flex h-[calc(100vh-4rem)] md:rounded-s-3xl md:rounded-e-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-lg md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-e-lg overflow-hidden w-full flex-1">
                  {/* Content area */}
                  {renderContent()}
                  
                  {/* Settings panel */}
                  {showSettingsPanel && settingsPanelContent && (
                    <SettingsPanel content={settingsPanelContent} />
                  )}
                </div>
              </ErrorBoundary>
            </SettingsPanelProvider>
          </SidebarInset>
        </SidebarProvider>
      </ErrorBoundary>
    </div>
  );
}