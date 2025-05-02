import type { Metadata } from "next";
import React from "react";
import { RiBarChart2Line, RiBellLine, RiSearchLine } from "@remixicon/react";

export const metadata: Metadata = {
  title: "AppLayout Demo",
  description: "Demonstration of the reusable AppLayout component",
};

import { AppLayout } from "@/components/app-layout";
import ChatInterface from "@/components/chat-interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SliderControl from "@/components/slider-control";

export default function Page() {
  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Demo Team",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
    {
      name: "Example Corp",
      logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png",
    },
  ];

  // Define custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: "computer",
          isActive: true,
        },
        {
          title: "Projects",
          url: "#",
          icon: "braces",
        },
        {
          title: "Explorer",
          url: "#",
          icon: "planet",
        },
      ],
    },
    secondary: {
      title: "Support",
      url: "#",
      items: [
        {
          title: "Documentation",
          url: "#",
          icon: "braces",
        },
        {
          title: "Help",
          url: "#",
          icon: "seedling",
        },
        {
          title: "Settings",
          url: "#",
          icon: "settings",
        },
      ],
    },
  };

  // Example custom main navigation
  const mainNavItems = (
    <nav className="flex items-center text-sm font-medium">
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground first:before:hidden"
        href="/"
        aria-current="page"
      >
        Dashboard
      </a>
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
        href="/custom-example"
      >
        Examples
      </a>
      <a
        className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors aria-[current]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
        href="#"
      >
        Documentation
      </a>
    </nav>
  );

  // Example custom header content
  const headerContent = (
    <div className="flex items-center gap-4 w-full">
      <div className="relative w-full max-w-md">
        <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input 
          className="w-full pl-9 h-9 bg-black/5 border-none" 
          placeholder="Search..." 
        />
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <RiBellLine size={20} />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <RiBarChart2Line size={20} />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );

  // Example settings panel content
  const settingsPanelContent = (
    <>
      {/* Content group */}
      <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
        <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
          Display Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="theme" className="font-normal">
              Theme
            </Label>
            <Select defaultValue="system">
              <SelectTrigger
                id="theme"
                className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
              >
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent
                className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                align="end"
              >
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="fontSize" className="font-normal">
              Font Size
            </Label>
            <Select defaultValue="medium">
              <SelectTrigger
                id="fontSize"
                className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
              >
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent
                className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                align="end"
              >
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content group */}
      <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
        <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
          Interface Controls
        </h3>
        <div className="space-y-3">
          <SliderControl
            minValue={0}
            maxValue={100}
            initialValue={[75]}
            defaultValue={[75]}
            step={1}
            label="Animation Speed"
          />

          <SliderControl
            className="[&_input]:w-14"
            minValue={0}
            maxValue={100}
            initialValue={[80]}
            defaultValue={[80]}
            step={1}
            label="Opacity"
          />
        </div>
      </div>
    </>
  );

  // Example of how to use the AppLayout component with ChatInterface
  return (
    <AppLayout 
      showSettingsPanel={true}
      defaultSettingsPanelOpen={true}
      teams={teams}
      sidebarNavItems={sidebarNavItems}
      mainNavItems={mainNavItems}
      headerContent={headerContent}
      settingsPanelContent={settingsPanelContent}
    >
      <ChatInterface title="AI Assistant" />
    </AppLayout>
  );
}