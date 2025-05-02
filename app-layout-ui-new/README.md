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

## Documentation

For detailed documentation, customization options, and examples, see the [documentation site](https://example.com) or check out the examples directory.

## License

MIT