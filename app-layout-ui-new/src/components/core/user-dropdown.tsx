"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  RiLogoutCircleLine,
  RiTimer2Line,
  RiUserLine,
  RiFindReplaceLine,
  RiPulseLine,
} from "@remixicon/react";

export interface UserMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface UserDropdownProps {
  username?: string;
  email?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  menuItems?: UserMenuItem[];
  onSignOut?: () => void;
}

export function UserDropdown({
  username = "User",
  email = "user@example.com",
  avatarUrl = "",
  avatarFallback = "",
  menuItems = [],
  onSignOut,
}: UserDropdownProps) {
  // Default menu items if none provided
  const defaultMenuItems: UserMenuItem[] = menuItems.length > 0 ? menuItems : [
    {
      label: "Dashboard",
      icon: <RiTimer2Line size={20} className="text-muted-foreground/70" aria-hidden="true" />,
    },
    {
      label: "Profile",
      icon: <RiUserLine size={20} className="text-muted-foreground/70" aria-hidden="true" />,
    },
    {
      label: "Changelog",
      icon: <RiPulseLine size={20} className="text-muted-foreground/70" aria-hidden="true" />,
    },
    {
      label: "History",
      icon: <RiFindReplaceLine size={20} className="text-muted-foreground/70" aria-hidden="true" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-8">
            <AvatarImage
              src={avatarUrl}
              width={32}
              height={32}
              alt="Profile image"
            />
            <AvatarFallback>{avatarFallback || username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 p-2" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col py-0 px-1 mb-2">
          <span className="truncate text-sm font-medium text-foreground mb-0.5">
            {username}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        
        {defaultMenuItems.map((item, index) => (
          <DropdownMenuItem 
            key={index}
            className="gap-3 px-1"
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuItem 
          className="gap-3 px-1"
          onClick={onSignOut}
        >
          <RiLogoutCircleLine
            size={20}
            className="text-muted-foreground/70"
            aria-hidden="true"
          />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}