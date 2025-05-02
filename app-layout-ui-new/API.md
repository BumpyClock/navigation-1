# App Layout UI API Documentation

This document provides detailed API documentation for all components in the `app-layout-ui` package.

## Table of Contents

- [AppLayout Component](#applayout-component)
- [AppSidebar Component](#appsidebar-component)
- [SidebarLogo Component](#sidebarlogo-component)
- [SettingsPanel Components](#settingspanel-components)
- [TeamSwitcher Component](#teamswitcher-component)
- [UserDropdown Component](#userdropdown-component)
- [Hooks](#hooks)
- [Type Definitions](#type-definitions)
- [Theme Customization](#theme-customization)

## AppLayout Component

The main container component that sets up the application layout.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | React.ReactNode | Required | The main content of your application. |
| `showSettingsPanel` | boolean | `true` | Whether to show the settings panel on the right side. |
| `defaultSettingsPanelOpen` | boolean | `true` | Whether the settings panel should be open by default. |
| `mainNavItems` | React.ReactNode | `undefined` | Custom navigation items to display in the header. |
| `siteInfo` | SiteInfo | `undefined` | Site logo and name to display at the top of sidebar. |
| `teams` | Team[] | `[]` | Array of teams for the team switcher. |
| `sidebarNavItems` | { main?: NavGroup; secondary?: NavGroup; } | `undefined` | Navigation items for the sidebar. |
| `userDropdown` | React.ReactNode | `undefined` | Custom user dropdown component. |
| `headerContent` | React.ReactNode | `undefined` | Custom header content. |
| `backgroundClassName` | string | `"bg-content dark:bg-content-dark"` | Tailwind class for the main content background. |
| `settingsPanelContent` | React.ReactNode | `undefined` | Content for the settings panel. |
| `mobileBreakpoint` | number | `1024` | The breakpoint (in pixels) for mobile layouts. |
| `onTeamChange` | (team: Team) => void | `undefined` | Callback when a team is selected. |
| `onNavItemClick` | (item: NavGroup \| NavItem) => void | `undefined` | Callback when a navigation item is clicked. |
| `onLogoClick` | () => void | `undefined` | Callback when the site logo is clicked. |
| `theme` | ThemeConfig | `undefined` | Custom theme configuration. |

### Usage Example

```tsx
import { AppLayout } from 'app-layout-ui';

function MyApp() {
  return (
    <AppLayout
      showSettingsPanel={true}
      teams={[
        { name: 'Team 1', logo: '/team1-logo.png' }
      ]}
      sidebarNavItems={{
        main: {
          title: 'Navigation',
          url: '#',
          items: [
            { title: 'Dashboard', url: '/dashboard', icon: 'dashboard', isActive: true },
            { title: 'Projects', url: '/projects', icon: 'computer' }
          ]
        }
      }}
    >
      <div className="p-6">
        <h1>My Application</h1>
        <p>Content here...</p>
      </div>
    </AppLayout>
  );
}
```

## AppSidebar Component

The sidebar component that displays navigation items and the team switcher.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | SidebarData | `undefined` | Navigation data for the sidebar. |
| `siteInfo` | SiteInfo | `undefined` | Site information to display in the sidebar header. |
| `iconMap` | IconMapType | `defaultIconMap` | Map of icon identifiers to icon components. |
| `onTeamChange` | (team: Team) => void | `undefined` | Callback when a team is selected. |
| `onNavItemClick` | (item: NavGroup) => void | `undefined` | Callback when a navigation item is clicked. |
| `onLogoClick` | () => void | `undefined` | Callback when the site logo is clicked. |
| `children` | React.ReactNode | `undefined` | Custom content to render within the sidebar. |

### Usage Example

```tsx
import { AppSidebar } from 'app-layout-ui';

function MySidebar() {
  const siteInfo = {
    name: 'My Application',
    logo: '/app-logo.png',
    description: 'Admin Dashboard'
  };

  const sidebarData = {
    teams: [
      { name: 'Team 1', logo: '/team1-logo.png' }
    ],
    navMain: [
      {
        title: 'Navigation',
        url: '#',
        items: [
          { title: 'Dashboard', url: '/dashboard', icon: 'dashboard', isActive: true },
          { title: 'Projects', url: '/projects', icon: 'computer' }
        ]
      }
    ]
  };

  return (
    <AppSidebar 
      data={sidebarData}
      siteInfo={siteInfo}
      onTeamChange={(team) => console.log('Team changed:', team)}
      onLogoClick={() => console.log('Logo clicked')}
    />
  );
}
```

## SidebarLogo Component

A component for displaying the site logo and name in the sidebar.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | string | `undefined` | URL to the site logo. |
| `title` | string | `undefined` | Site or application name. |
| `subtitle` | string | `undefined` | Optional subtitle or description. |
| `className` | string | `undefined` | Additional CSS class for the logo container. |
| `onClick` | () => void | `undefined` | Callback when the logo is clicked. |

### Usage Example

```tsx
import { SidebarLogo } from 'app-layout-ui';

function MyLogo() {
  return (
    <SidebarLogo
      logo="/app-logo.png"
      title="My Application"
      subtitle="Admin Dashboard"
      onClick={() => console.log('Logo clicked')}
    />
  );
}
```

## SettingsPanel Components

A set of components to create and manage a settings panel.

### SettingsPanelProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | boolean | `true` | Whether the panel should be open by default. |
| `open` | boolean | `undefined` | Controlled open state. |
| `onOpenChange` | (open: boolean) => void | `undefined` | Callback when the panel open state changes. |
| `children` | React.ReactNode | Required | Components that need access to the settings panel context. |
| `mobileBreakpoint` | number | `1024` | The breakpoint for mobile layouts. |

### SettingsPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | React.ReactNode | `undefined` | The content to display in the panel. |
| `className` | string | `undefined` | Additional CSS class for the panel. |

### SettingsPanelContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `""` | Title for the settings panel. |
| `icon` | React.ReactNode | `undefined` | Custom icon for the panel header. |
| `content` | React.ReactNode | `undefined` | The content to display in the panel. |

### Usage Example

```tsx
import { 
  SettingsPanelProvider, 
  SettingsPanel, 
  SettingsPanelContent 
} from 'app-layout-ui';

function MyApp() {
  return (
    <SettingsPanelProvider defaultOpen={true}>
      <div className="app-container">
        <main>Main content here...</main>
        <SettingsPanel
          content={
            <SettingsPanelContent
              title="Application Settings"
              content={
                <div>
                  <h3>Theme</h3>
                  <select>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
              }
            />
          }
        />
      </div>
    </SettingsPanelProvider>
  );
}
```

## TeamSwitcher Component

A dropdown component for switching between teams.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `teams` | Team[] | Required | Array of teams to display in the dropdown. |
| `onTeamChange` | (team: Team) => void | `undefined` | Callback when a team is selected. |

### Usage Example

```tsx
import { TeamSwitcher } from 'app-layout-ui';

function MyTeamSwitcher() {
  const teams = [
    { name: 'Team 1', logo: '/team1-logo.png' },
    { name: 'Team 2', logo: '/team2-logo.png' }
  ];

  return (
    <TeamSwitcher 
      teams={teams} 
      onTeamChange={(team) => console.log('Team selected:', team)}
    />
  );
}
```

## UserDropdown Component

A dropdown component for user account options.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | { name: string; email: string; avatar?: string; } | Default mock user | User information to display. |
| `onSignOut` | () => void | `undefined` | Callback when the sign out option is clicked. |

### Usage Example

```tsx
import { UserDropdown } from 'app-layout-ui';

function MyUserMenu() {
  return (
    <UserDropdown 
      user={{ 
        name: 'Jane Doe', 
        email: 'jane@example.com', 
        avatar: '/avatar.png' 
      }}
      onSignOut={() => console.log('User signed out')}
    />
  );
}
```

## Hooks

### useIsMobile

A hook to determine if the viewport is at mobile width.

```tsx
import { useIsMobile } from 'app-layout-ui';

function MyComponent() {
  // Default breakpoint is 768px
  const isMobile = useIsMobile();
  // Custom breakpoint
  const isTablet = useIsMobile(1024);

  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
    </div>
  );
}
```

### useSettingsPanel

A hook to access the settings panel state and controls.

```tsx
import { useSettingsPanel } from 'app-layout-ui';

function MyComponent() {
  const { 
    state, // 'expanded' or 'collapsed'
    open, // boolean
    setOpen, // function to set open state
    togglePanel, // function to toggle the panel
    isMobile // boolean
  } = useSettingsPanel();

  return (
    <button onClick={togglePanel}>
      {open ? 'Close Settings' : 'Open Settings'}
    </button>
  );
}
```

## Type Definitions

### SiteInfo Type

```typescript
type SiteInfo = {
  name: string;     // Site or application name
  logo: string;     // URL to the site logo
  description?: string;  // Optional site description/tagline
  url?: string;     // Optional site URL
};
```

## Theme Customization

The AppLayout component accepts a `theme` prop for customizing colors.

### ThemeConfig Type

```typescript
type ThemeConfig = {
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
```

### Usage Example

```tsx
import { AppLayout } from 'app-layout-ui';

function MyApp() {
  const customTheme = {
    sidebar: {
      background: '#1a1a1a',
      foreground: '#ffffff',
      primary: '#3b82f6',
      primaryForeground: '#ffffff'
    },
    content: {
      background: '#f9fafb',
      foreground: '#111827',
      darkBackground: '#111827'
    }
  };

  return (
    <AppLayout theme={customTheme}>
      <div>Content here...</div>
    </AppLayout>
  );
}
```

### CSS Variables

All theme values are set as CSS variables that can be overridden in your CSS:

```css
:root {
  --sidebar-bg: #f9fafb;
  --sidebar-fg: #111827;
  --sidebar-primary: #3b82f6;
  --sidebar-primary-fg: #ffffff;
  --sidebar-primary-icon: #ffffff;
  --sidebar-hover-bg: #f3f4f64e;
  --sidebar-hover-fg: #111827;
  --content-bg: #ffffff;
  --content-fg: #111827;
  --content-dark-bg: #111827;
}

/* Dark theme overrides */
.dark {
  --sidebar-bg: #111827;
  --sidebar-fg: #f9fafb;
  /* other dark theme variables */
}
```