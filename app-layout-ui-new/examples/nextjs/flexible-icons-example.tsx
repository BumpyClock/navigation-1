// filepath: c:\Users\adityasharma\Projects\navigation-1\app-layout-ui-new\examples\nextjs\flexible-icons-example.tsx
import React from 'react';
import { AppSidebar } from '../../src/components/core/app-sidebar';
import {
  RiStarLine, 
  RiHeartLine,
  RiNotification3Line,
  RiCodeSSlashLine
} from "@remixicon/react";
import Image from 'next/image';

// Custom Icon component
function CustomIcon({ className, size = 22 }: { className?: string, size?: number }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.2A6.8 6.8 0 1 0 14.8 8 6.808 6.808 0 0 0 8 1.2zm0 12.267A5.467 5.467 0 1 1 13.467 8 5.473 5.473 0 0 1 8 13.467z"
          fill="currentColor"
        />
        <path d="M10.733 8H8V4.667h1.333V6.667h1.4v1.333z" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function FlexibleIconsExample() {
  const sidebarData = {
    teams: [
      {
        name: "Acme Corp",
        logo: "/public/file.svg",
      },
      {
        name: "Personal",
        logo: "/public/globe.svg",
      }
    ],
    navMain: [
      {
        title: "Main Navigation",
        url: "#",
        items: [
          // 1. Using string-based icon reference (backward compatible)
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: "dashboard",
            isActive: true,
          },
          {
            title: "Home",
            url: "/home",
            icon: "home",
          },
          // 2. Using direct component reference (new approach)
          {
            title: "Favorites",
            url: "/favorites",
            icon: RiStarLine,
          },
          // 3. Using pre-instantiated component
          {
            title: "Notifications",
            url: "/notifications",
            icon: <RiNotification3Line className="text-amber-500" />,
          },
          // 4. Using custom component
          {
            title: "Custom",
            url: "/custom",
            icon: CustomIcon,
          },
          // 5. Using an image component (if supported by your framework)
          {
            title: "Projects",
            url: "/projects",
            icon: <Image src="/public/window.svg" width={22} height={22} alt="" />,
          },
        ],
      },
      {
        title: "Additional Links",
        url: "#",
        items: [
          {
            title: "Settings",
            url: "/settings",
            icon: "settings",
          },
          {
            title: "Favorites",
            url: "/likes",
            icon: <RiHeartLine />,
          },
          {
            title: "Code",
            url: "/code",
            icon: RiCodeSSlashLine,
          },
        ],
      },
    ],
  };

  const siteInfo = {
    name: "Flexible Icons Demo",
    logo: "/public/vercel.svg",
    description: "Testing icon approaches",
  };

  return (
    <div className="min-h-screen flex">
      <AppSidebar
        data={sidebarData}
        siteInfo={siteInfo}
      />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Flexible Icons Example</h1>
        <p className="mt-4">
          This example demonstrates different ways to use icons in the sidebar navigation:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>String-based icon references (backward compatible)</li>
          <li>Direct component references</li>
          <li>Pre-instantiated components with custom props</li>
          <li>Custom icon components</li>
          <li>Image components</li>
        </ul>
      </div>
    </div>
  );
}