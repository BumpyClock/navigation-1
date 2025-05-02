# Plan for Creating a Reusable AppLayout Component

After analyzing the codebase, here's a comprehensive plan to transform the app layout into a production-ready, self-contained component:

## 1. Package Structure

```
app-layout-ui/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
├── src/
│   ├── index.ts              # Main export file
│   ├── components/
│   │   ├── core/             # Main layout components 
│   │   │   ├── app-layout.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── settings-panel.tsx
│   │   │   ├── team-switcher.tsx
│   │   │   ├── user-dropdown.tsx
│   │   │   └── index.ts
│   │   ├── ui/               # shadcn UI components
│   │   │   ├── sidebar.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── button.tsx
│   │   │   └── [other UI components]
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── use-slider-with-input.ts
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── index.ts           # Type definitions
├── examples/                  # Example implementations
│   ├── nextjs/
│   ├── vite/
│   └── cra/
```

## 2. Core Components & Dependencies

### Components to Include:
- **Primary Components**:
  - `AppLayout`: Main container component
  - `AppSidebar`: Navigation sidebar
  - `SettingsPanel`: Right-side panel for app settings

- **Supporting Components**:
  - `TeamSwitcher`: Team selection dropdown
  - `UserDropdown`: User account menu

- **UI Component Dependencies** (shadcn):
  - Sidebar components (sidebar.tsx)
  - Sheet & Dialog (for mobile views)
  - Scroll Area
  - Button
  - Avatar
  - Dropdown Menu
  - Separator

- **Hooks**:
  - `useIsMobile`: For responsive layouts
  - `useSettingsPanel`: Panel state management
  - `useSidebar`: Sidebar state management

- **Utils**:
  - `cn`: Utility for merging Tailwind classes

## 3. API & Customization Options

### `AppLayout` Component API:
```typescript
interface AppLayoutProps {
  // Core content
  children: React.ReactNode;
  
  // Sidebar configuration
  teams?: Team[];
  sidebarNavItems?: {
    main?: NavGroup;
    secondary?: NavGroup;
  };
  mainNavItems?: React.ReactNode;
  
  // Settings panel
  showSettingsPanel?: boolean;
  defaultSettingsPanelOpen?: boolean;
  settingsPanelContent?: React.ReactNode;
  
  // Style & customization
  backgroundClassName?: string;
  headerContent?: React.ReactNode;
  userDropdown?: React.ReactNode;
  iconMap?: Record<string, React.ComponentType>;
  
  // Theme configuration
  theme?: {
    sidebar?: {
      background?: string;
      foreground?: string;
      accentBackground?: string;
      accentForeground?: string;
    },
    content?: {
      background?: string;
      foreground?: string;
    }
  }
}
```

### Type Definitions:
```typescript
type Team = {
  name: string;
  logo: string;
};

type NavItem = {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};
```

## 4. Implementation Strategy

1. **Extract & Isolate**:
   - Move all relevant components to the new package structure
   - Create explicit exports in index.ts
   - Define proper type definitions

2. **State Management**:
   - Consolidate sidebar and panel state hooks
   - Implement proper context providers
   - Add storage options (localStorage/cookies)

3. **Styling Enhancement**:
   - Implement CSS variables for theming
   - Create theme provider with defaults
   - Ensure dark/light mode compatibility
   - Clean up Tailwind utility classes

4. **Responsive Design**:
   - Improve mobile behavior
   - Add breakpoint customization
   - Test on various screen sizes

5. **Accessibility Improvements**:
   - Add proper ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers

6. **Documentation**:
   - Comprehensive README
   - API documentation
   - Usage examples
   - Props tables

## 5. Integration Plan

1. **Package Configuration**:
   - Set up package.json with proper dependencies
   - Configure TypeScript for proper exports
   - Set up Tailwind with proper plugins
   - Configure build process for ESM/CJS

2. **Example Implementations**:
   - Create examples for Next.js, Vite, CRA
   - Show various customization options
   - Include theme examples

3. **Testing Strategy**:
   - Unit tests for core components
   - Integration tests for layout behavior
   - Visual regression tests

4. **Documentation & Demo Site**:
   - Create comprehensive documentation
   - Build an interactive demo site
   - Include code samples

## 6. Tailwind Integration

To ensure the component works with users' existing Tailwind setup:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'sidebar': 'var(--sidebar-bg)',
        'sidebar-foreground': 'var(--sidebar-fg)',
        'sidebar-accent': 'var(--sidebar-accent-bg)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-fg)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-fg)',
        'content': 'var(--content-bg)',
        'content-foreground': 'var(--content-fg)',
        'content-dark': 'var(--content-dark-bg)',
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}
```

## 7. Release & Versioning

1. **Initial Release**:
   - v0.1.0: Alpha with basic functionality
   - v0.2.0: Beta with full feature set
   - v1.0.0: Production ready with documentation

2. **Package Publishing**:
   - Publish to npm
   - Set up CI/CD for releases
   - Create release notes

## 8. Use Case Examples

### Basic Usage:
```tsx
// Example basic usage
import { AppLayout } from "app-layout-ui";

export default function MyApp() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1>My Application Content</h1>
        {/* Your app content here */}
      </div>
    </AppLayout>
  );
}
```

### Custom Navigation:
```tsx
// Example with custom navigation
import { AppLayout } from "app-layout-ui";

export default function MyApp() {
  // Navigation setup similar to custom-example/page.tsx
  const sidebarNavItems = {
    main: {
      title: "Application",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "dashboard",
          isActive: true,
        },
        // More items...
      ]
    }
  };

  return (
    <AppLayout
      sidebarNavItems={sidebarNavItems}
      showSettingsPanel={true}
    >
      {/* Your app content here */}
    </AppLayout>
  );
}
```