This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# AppLayout Component

A reusable layout component for Next.js applications with a modern UI featuring:

- Collapsible sidebar navigation
- Optional settings panel
- Team switcher
- User account dropdown
- Flexible main content area

## Usage

The `AppLayout` component serves as a wrapper for your page content, providing a consistent layout structure while allowing for customization.

### Basic Example

```tsx
import { AppLayout } from "@/components/app-layout";
import YourContent from "@/components/your-content";

export default function Page() {
  return (
    <AppLayout>
      <YourContent />
    </AppLayout>
  );
}
```

### Advanced Example with Customization

```tsx
import { AppLayout } from "@/components/app-layout";
import YourContent from "@/components/your-content";

export default function CustomPage() {
  // Custom teams for the sidebar
  const teams = [
    {
      name: "Your Team",
      logo: "/your-logo.png",
    },
  ];

  // Custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: "home",
          isActive: true,
        },
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "dashboard",
        },
      ],
    },
    secondary: {
      title: "Other",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: "settings",
        },
      ],
    },
  };

  // Custom header navigation
  const mainNavItems = (
    <nav className="flex items-center gap-4">
      <a href="/">Home</a>
      <a href="/dashboard">Dashboard</a>
    </nav>
  );

  return (
    <AppLayout
      showSettingsPanel={true}
      defaultSettingsPanelOpen={false}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
      mainNavItems={mainNavItems}
      backgroundClassName="bg-white dark:bg-gray-900"
    >
      <YourContent />
    </AppLayout>
  );
}
```

## Props

| Prop                     | Type                 | Default                          | Description                                         |
|--------------------------|----------------------|----------------------------------|-----------------------------------------------------|
| `children`               | `React.ReactNode`    | Required                         | Content to render in the main area                  |
| `showSettingsPanel`      | `boolean`            | `true`                           | Whether to show the settings panel                  |
| `defaultSettingsPanelOpen` | `boolean`          | `true`                           | Default state of the settings panel                 |
| `teams`                  | `Team[]`             | Default teams                    | Teams to display in the team switcher               |
| `sidebarNavItems`        | `NavGroup`           | Default navigation               | Navigation items for the sidebar                    |
| `mainNavItems`           | `React.ReactNode`    | Default navigation               | Custom header navigation                            |
| `userDropdown`           | `React.ReactNode`    | `<UserDropdown />`               | Custom user dropdown component                      |
| `headerContent`          | `React.ReactNode`    | Default header                   | Complete custom header content                      |
| `backgroundClassName`    | `string`             | `bg-gray-300 dark:bg-stone-800`  | Custom background class for the main content area   |

## Types

```tsx
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

## Available Icons

The AppSidebar component supports the following icon identifiers:

### Main Icons
- `chat` - Chat icon
- `bard` - Bard icon
- `mickey` - Mickey icon
- `mic` - Microphone icon
- `checkDouble` - Double check icon
- `braces` - Braces icon
- `planet` - Planet icon
- `seedling` - Seedling icon
- `settings` - Settings icon

### Additional Icons
- `home` - Home icon
- `dashboard` - Dashboard icon
- `computer` - Computer icon
- `stack` - Stack icon

To add more icons, modify the `ICON_MAP` object in `src/components/app-sidebar.tsx`.

## Examples

Check out the following example pages:
- `/src/app/page.tsx` - Basic example with a chat component
- `/src/app/custom-example/page.tsx` - Custom example with different navigation and no settings panel
