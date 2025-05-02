# App Layout UI

A production-ready, customizable application layout component for React applications.

## Features

- Responsive sidebar navigation
- Settings panel with customizable content
- Team switcher component
- User dropdown menu
- Dark/light mode support
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

```jsx
import { AppLayout } from 'app-layout-ui';

function MyApp() {
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
    }
  };

  return (
    <AppLayout
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
    >
      <div className="p-6">
        <h1>My Application Content</h1>
        {/* Your app content here */}
      </div>
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
| `theme` | `ThemeConfig` | `undefined` | Theme configuration object for custom styling |

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

## Documentation

For detailed documentation, customization options, and examples, see the examples directory.

## License

MIT