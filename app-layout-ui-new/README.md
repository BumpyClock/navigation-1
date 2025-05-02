# App Layout UI

A production-ready, customizable application layout component for React applications.

## Features

- Responsive sidebar navigation with site branding
- Modular sidebar layout with collapsible sections
- Team switcher in the main navigation area
- Settings panel with customizable content
- User dropdown menu
- Dark/light mode support with theme validation
- State management with persistence
- Performance monitoring and optimization
- Error boundaries for graceful error handling
- Enhanced keyboard navigation and accessibility
- Server-side rendering support
- Comprehensive documentation
- Fully customizable via props
- Built with Tailwind CSS and Radix UI

## Installation

```bash
npm install app-layout-ui
# or
yarn add app-layout-ui
# or
pnpm add app-layout-ui
```

## CSS Integration

This package includes its own styles for the layout components. You need to import the CSS file in your main entry file:

```jsx
// Import in your main app file (e.g., _app.js, main.tsx, etc.)
import 'app-layout-ui/dist/styles.css';
```

## Customizing Colors & Theming

The package uses CSS variables for theming. You can override the default theme by setting these variables in your own CSS:

```css
:root {
  /* Override sidebar colors */
  --sidebar: #1e1e1e;
  --sidebar-foreground: #ffffff;
  --sidebar-accent: #2d2d2d;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #333333;
  --sidebar-primary: #3b82f6;
  --sidebar-primary-foreground: #ffffff;
  
  /* Override content area colors */
  --content: #ffffff;
  --content-foreground: #000000;
  --content-dark: #1e1e1e;
}

/* Dark mode overrides */
.dark {
  /* Dark mode overrides here */
}
```

## Usage

The component can be used in two ways: the simple way (passing all props to AppLayout) and the advanced way (using MainContent directly for more control).

### Basic Usage

```jsx
import { AppLayout } from 'app-layout-ui';

function MyApp() {
  // Define site information
  const siteInfo = {
    name: "My Application",
    logo: "/logo.png",
    description: "Dashboard"
  };

  // Define custom teams
  const teams = [
    {
      name: "Engineering",
      logo: "/team-logo.png"
    }
  ];

  // Define custom navigation items
  const sidebarNavItems = {
    main: {
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "dashboard",
          isActive: true,
        },
        {
          title: "Projects",
          url: "/projects",
          icon: "computer",
        },
      ]
    },
    secondary: {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Account",
          url: "/account",
          icon: "settings"
        }
      ]
    }
  };

  return (
    <AppLayout
      siteInfo={siteInfo}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
      contentHeader="Dashboard"
      onLogoClick={() => console.log("Logo clicked")}
    >
      <div className="p-6">
        <h1>My Application Content</h1>
        {/* Your app content here */}
      </div>
    </AppLayout>
  );
}
```

### Advanced Usage with MainContent

For more control over the content area, you can use the MainContent component directly:

```jsx
import { AppLayout, MainContent } from 'app-layout-ui';

function AdvancedApp() {
  // Config as above...

  // Custom header with advanced layout
  const customHeader = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          A
        </span>
        <h1 className="text-xl font-semibold">Custom Header</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">Share</button>
        <button className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">Save</button>
      </div>
    </div>
  );

  return (
    <AppLayout
      siteInfo={siteInfo}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
    >
      <MainContent
        header={customHeader}
        showSettingsPanelTrigger={true}
        settingsPanelContent={settingsPanelContent}
        backgroundClassName="bg-gray-50 dark:bg-gray-900"
      >
        <div className="p-6">
          <h1>Advanced Layout Example</h1>
          {/* Your app content here */}
        </div>
      </MainContent>
    </AppLayout>
  );
}
```

## API Reference

### AppLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The main content to display in the layout |
| `showSettingsPanel` | `boolean` | `true` | Whether to show the settings panel |
| `defaultSettingsPanelOpen` | `boolean` | `true` | Default state of the settings panel (open/closed) |
| `mainNavItems` | `React.ReactNode` | `undefined` | Custom navigation items to display in the header |
| `teams` | `Team[]` | `[]` | Array of teams for the team switcher |
| `sidebarNavItems` | `{ main?: NavGroup; secondary?: NavGroup }` | `undefined` | Configuration for sidebar navigation |
| `userDropdown` | `React.ReactNode` | `undefined` | Custom user dropdown component |
| `headerContent` | `React.ReactNode` | `undefined` | Custom header content |
| `backgroundClassName` | `string` | `"bg-content dark:bg-content-dark"` | Custom background class for the content area |
| `settingsPanelContent` | `React.ReactNode` | `undefined` | Custom content for the settings panel |
| `mobileBreakpoint` | `number` | `1024` | Breakpoint for mobile view |
| `onTeamChange` | `(team: Team) => void` | `undefined` | Callback when team is changed |
| `onNavItemClick` | `(item: NavGroup \| NavItem) => void` | `undefined` | Callback when navigation item is clicked |
| `onLogoClick` | `() => void` | `undefined` | Callback when the logo is clicked |
| `theme` | `ThemeConfig` | `undefined` | Theme configuration object for custom styling |

### Component API

#### MainContent

A component for customizing the main content area with advanced options:

```jsx
import { AppLayout, MainContent } from 'app-layout-ui';

function MyApp() {
  return (
    <AppLayout siteInfo={siteInfo} teams={teams} sidebarNavItems={sidebarNavItems}>
      <MainContent
        header="Custom Dashboard"
        showSettingsPanelTrigger={true}
        settingsPanelContent={<MySettingsPanel />}
        backgroundClassName="bg-gray-50 dark:bg-gray-900"
        headerClassName="border-b pb-2"
      >
        {/* Your content */}
      </MainContent>
    </AppLayout>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The content to display in the main area |
| `showSettingsPanel` | `boolean` | `true` | Whether to show the settings panel |
| `backgroundClassName` | `string` | `"bg-content dark:bg-content-dark"` | Custom background class for the content area |
| `settingsPanelContent` | `React.ReactNode` | `undefined` | Custom content for the settings panel |
| `header` | `React.ReactNode \| string` | `undefined` | Header content or title string |
| `showSettingsPanelTrigger` | `boolean` | `true` | Whether to show the settings panel trigger in header |
| `headerClassName` | `string` | `undefined` | Custom class name for the header |

#### AppLayoutWithState

A higher-order component that includes state management and performance monitoring:

```jsx
import { AppLayoutWithState } from 'app-layout-ui';

function MyApp() {
  return (
    <AppLayoutWithState
      siteInfo={siteInfo}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
    >
      {/* Your content */}
    </AppLayoutWithState>
  );
}
```

#### PerformanceComponent

A utility component for monitoring performance of specific sections:

```jsx
import { PerformanceComponent } from 'app-layout-ui';

function MyComponent() {
  return (
    <PerformanceComponent id="MyCustomComponent">
      {/* Component content */}
    </PerformanceComponent>
  );
}
```

#### ErrorBoundary

A component for handling errors gracefully:

```jsx
import { ErrorBoundary } from 'app-layout-ui';

function MyComponent() {
  return (
    <ErrorBoundary 
      fallback={<div>Something went wrong</div>}
      onError={(error) => console.error(error)}
    >
      {/* Component content */}
    </ErrorBoundary>
  );
}
```

### Hook API

The library provides several custom hooks for accessing the shared state:

| Hook | Description |
|------|-------------|
| `useAppLayoutState()` | Access the complete layout state |
| `useSidebarState()` | Control sidebar visibility |
| `useSettingsPanelState()` | Control settings panel visibility |
| `useThemeState()` | Access and modify theme settings |
| `useActiveTeam()` | Get and set the active team |
| `useComponentPerformance(id)` | Track component performance |

Example usage:

```jsx
import { useSidebarState, useThemeState } from 'app-layout-ui';

function MyComponent() {
  const { isOpen, toggle } = useSidebarState();
  const { theme, setTheme } = useThemeState();
  
  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
```

### Theme Configuration

The `theme` prop allows for detailed customization of the component appearance:

```typescript
interface ThemeConfig {
  sidebar?: {
    background?: string;
    foreground?: string;
    accentBackground?: string;
    accentForeground?: string;
    primary?: string;
    primaryForeground?: string;
    border?: string;
  };
  content?: {
    background?: string;
    foreground?: string;
    darkBackground?: string;
  };
}
```

Example theme customization:

```jsx
<AppLayout
  theme={{
    sidebar: {
      background: '#1a1a1a',
      foreground: '#ffffff',
      primary: '#3b82f6',
      primaryForeground: '#ffffff'
    },
    content: {
      background: '#f9fafb',
      darkBackground: '#111827'
    }
  }}
>
  {/* Your content */}
</AppLayout>
```

## Keyboard Shortcuts

The component includes built-in keyboard shortcuts for improved accessibility and user experience:

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` / `Cmd+B` | Toggle sidebar visibility |
| `Ctrl+S` / `Cmd+S` | Toggle settings panel visibility |

## Accessibility

This component is built with accessibility in mind:

- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader friendly structure
- Focus management for interactive elements

## Browser Compatibility

Tested and supported in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Advanced Features

### Error Handling

The component includes built-in error boundaries that provide graceful error handling:

- Isolates errors to specific sections of the UI
- Prevents entire app crashes
- Custom fallback UI for error states
- Detailed error reporting

### State Management

The AppLayout includes a comprehensive state management system:

- Persistent state across page refreshes
- Global layout state accessible via hooks
- Context-based state for sidebar, settings panel, and theme
- Type-safe state with TypeScript

```jsx
// Using the state hooks
import { 
  useAppLayoutState, 
  useSidebarState, 
  useSettingsPanelState, 
  useThemeState 
} from 'app-layout-ui';

function MyComponent() {
  const { isOpen, toggle } = useSidebarState();
  
  return (
    <button onClick={toggle}>
      {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
    </button>
  );
}
```

### Performance Monitoring

Built-in performance monitoring helps identify and fix performance issues:

- Component render time tracking
- Mount/update performance metrics
- Integration with analytics platforms
- Development tools for performance debugging

### Server-Side Rendering

Full support for server-side rendering (SSR) environments:

- Next.js compatibility
- Proper hydration handling
- Safe browser detection
- Lazy-loaded components where appropriate

## Documentation

For detailed API documentation, see [API.md](./API.md). 

For examples and customization options, see the [examples directory](./examples).

## License

MIT