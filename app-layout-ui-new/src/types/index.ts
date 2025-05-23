import React from 'react';

// Site information type definition
export type SiteInfo = {
  name: string;
  logo: string;
  description?: string;
  url?: string;
};

// Team type definition
export type Team = {
  name: string;
  logo: string;
};

// Navigation item type definition
export type NavItem = {
  title: string;
  url: string;
  icon?: string | React.ComponentType<any> | React.ReactNode; // Updated to accept component or node
  isActive?: boolean;
};

// Navigation group type definition
export type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};

// Sidebar data type definition
export type SidebarData = {
  teams: Team[];
  navMain: NavGroup[];
};

// Theme configuration
export type ThemeConfig = {
  sidebar?: {
    background?: string;
    foreground?: string;
    accentBackground?: string;
    accentForeground?: string;
    border?: string;
    primary?: string;
    primaryForeground?: string;
  };
  content?: {
    background?: string;
    foreground?: string;
    darkBackground?: string;
  };
};

// MainContent component props
export interface MainContentProps {
  /** Main content to be displayed */
  children: React.ReactNode;
  
  /** CSS class for the content background */
  backgroundClassName?: string;
  
  /** Optional header title (string) or custom component */
  header?: React.ReactNode;
  
  /** Whether to show the settings panel trigger in the header */
  showSettingsPanelTrigger?: boolean;
  
  /** Optional class name for the header */
  headerClassName?: string;
};