"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiExpandUpDownLine, RiAddLine } from "@remixicon/react";

import { Team } from "../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export interface TeamSwitcherProps {
  teams: Team[];
  onTeamChange?: (team: Team) => void;
}

export function TeamSwitcher({
  teams,
  onTeamChange,
}: TeamSwitcherProps) {
  const [activeTeam, setActiveTeam] = React.useState<Team | null>(teams[0] ?? null);

  if (!teams.length) return null;

  const handleTeamChange = (team: Team) => {
    setActiveTeam(team);
    onTeamChange?.(team);
  };

  const { open: sidebarOpen } = useSidebar();

  // Animation variants for TeamSwitcher button
  const buttonVariants = {
    open: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 }
    },
    closed: { 
      scale: 0.95, 
      opacity: 0.8,
      y: -10,
      transition: { duration: 0.3 }
    },
  };

  // Animation variants for team logo
  const logoVariants = {
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2, type: "spring", stiffness: 300 }
    },
    tap: { 
      scale: 0.9,
      rotate: 0,
      transition: { duration: 0.1 }
    },
    initial: { 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3 [&>svg]:size-auto team-switcher-button"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded="false"
                tabIndex={0}
                style={{
                  isolation: "isolate",
                  position: "relative"
                }}
              >
                <motion.div 
                  className="flex aspect-square size-9 items-center justify-center rounded-md overflow-hidden bg-sidebar-primary text-sidebar-primary-foreground relative after:rounded-[inherit] after:absolute after:inset-0 after:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] after:pointer-events-none"
                  whileHover={logoVariants.hover}
                  whileTap={logoVariants.tap}
                  initial={logoVariants.initial}
                >
                  {activeTeam && (
                    <img
                      src={activeTeam.logo}
                      width={36}
                      height={36}
                      alt={activeTeam.name}
                    />
                  )}
                </motion.div>
                <motion.div 
                  className="grid flex-1 text-left text-base leading-tight"
                  animate={{ opacity: sidebarOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="truncate font-medium">
                    {activeTeam?.name ?? "Select a Team"}
                  </span>
                </motion.div>
                <motion.div
                  animate={sidebarOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 0 },
                    closed: { rotate: 180 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <RiExpandUpDownLine
                    className="ms-auto text-sidebar-foreground/50"
                    size={20}
                    aria-hidden="true"
                  />
                </motion.div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="dark min-w-56 rounded-md"
              style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="uppercase text-muted-foreground/70 text-xs">
                Teams
              </DropdownMenuLabel>
              <AnimatePresence>
                {teams.map((team, index) => (
                  <motion.div
                    key={team.name}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      onClick={() => handleTeamChange(team)}
                      className="gap-2 p-2"
                      tabIndex={0}
                      role="option"
                      aria-selected={team.name === activeTeam?.name}
                    >
                      <motion.div 
                        className="flex size-6 items-center justify-center rounded-md overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img
                          src={team.logo}
                          width={36}
                          height={36}
                          alt={team.name}
                        />
                      </motion.div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
              <DropdownMenuSeparator />
              <motion.div
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <DropdownMenuItem className="gap-2 p-2" tabIndex={0}>
                  <RiAddLine className="opacity-60" size={16} aria-hidden="true" />
                  <div className="font-medium">Add team</div>
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </motion.div>
  );
}