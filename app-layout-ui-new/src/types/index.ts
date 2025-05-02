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
  icon?: string;
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