"use client";

import { useIsMobile } from "../../hooks/use-mobile";
import { RiQuillPenAiLine, RiSettingsLine, RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "../ui/button";

import { Sheet, SheetTitle, SheetContent } from "../ui/sheet";
import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";

const SETTINGS_PANEL_COOKIE_NAME = "settings_panel_state";
const SETTINGS_PANEL_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SETTINGS_PANEL_KEYBOARD_SHORTCUT = "s";
const SETTINGS_PANEL_WIDTH = "300px";
const SETTINGS_PANEL_WIDTH_COLLAPSED = "0px";

export type SettingsPanelState = "expanded" | "collapsed";

export interface SettingsPanelContext {
  state: SettingsPanelState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  togglePanel: () => void;
}

const SettingsPanelContext = React.createContext<SettingsPanelContext | null>(
  null,
);

export function useSettingsPanel() {
  const context = React.useContext(SettingsPanelContext);
  if (!context) {
    throw new Error(
      "useSettingsPanel must be used within a SettingsPanelProvider.",
    );
  }
  return context;
}

export interface SettingsPanelProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  mobileBreakpoint?: number;
}

export function SettingsPanelProvider({ 
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  mobileBreakpoint = 1024
}: SettingsPanelProviderProps) {
  const isMobile = useIsMobile(mobileBreakpoint);
  const [openMobile, setOpenMobile] = React.useState(false);
  
  // This is the internal state of the panel
  // We use openProp and setOpenProp for control from outside the component
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the panel state
      if (typeof document !== 'undefined') {
        document.cookie = `${SETTINGS_PANEL_COOKIE_NAME}=${openState}; path=/; max-age=${SETTINGS_PANEL_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open]
  );

  // Helper to toggle the panel
  const togglePanel = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the panel
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SETTINGS_PANEL_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        togglePanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePanel]);

  // We add a state so that we can do data-state="expanded" or "collapsed"
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SettingsPanelContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      togglePanel,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, togglePanel],
  );

  return (
    <SettingsPanelContext.Provider value={contextValue}>
      {children}
    </SettingsPanelContext.Provider>
  );
}

export interface SettingsPanelContentProps {
  title?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export function SettingsPanelContent({
  title = "",
  icon,
  content
}: SettingsPanelContentProps) {
  return (
    <>
      {/* Panel header */}
      <div className="py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon || (
            <RiQuillPenAiLine
              className="text-muted-foreground/70"
              size={20}
              aria-hidden="true"
            />
          )}
          <h2 className="text-sm font-medium">{title || "My preferences"}</h2>
        </div>
        <SettingsPanelCollapseButton />
      </div>

      {/* Panel content */}
      {content && (
        <div className="-mt-px">
          {content}
        </div>
      )}
    </>
  );
}

export interface SettingsPanelCollapseButtonProps extends React.ComponentProps<typeof Button> {}

// Memoize button component for performance
export const SettingsPanelCollapseButton = React.memo(function SettingsPanelCollapseButton({ className, ...props }: SettingsPanelCollapseButtonProps) {
  const { togglePanel } = useSettingsPanel();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("h-7 w-7 rounded-full hover:bg-black/10", className)}
      onClick={togglePanel}
      aria-label="Collapse panel"
      {...props}
    >
      <RiArrowLeftSLine size={18} />
      <span className="sr-only">Collapse panel</span>
    </Button>
  );
});

export interface SettingsPanelExpandButtonProps extends React.ComponentProps<typeof Button> {}

export const SettingsPanelExpandButton = React.memo(function SettingsPanelExpandButton({ className, ...props }: SettingsPanelExpandButtonProps) {
  const { togglePanel } = useSettingsPanel();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("h-7 w-7 rounded-full hover:bg-black/10 absolute right-2 top-5 z-20 bg-gray-200/70 dark:bg-gray-700/70", className)}
      onClick={togglePanel}
      aria-label="Expand panel"
      {...props}
    >
      <RiArrowRightSLine size={18} />
      <span className="sr-only">Expand panel</span>
    </Button>
  );
});

export interface SettingsPanelProps {
  content?: React.ReactNode;
  className?: string;
}

export function SettingsPanel({ content, className }: SettingsPanelProps) {
  const { isMobile, openMobile, setOpenMobile, open } = useSettingsPanel();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent className={cn("w-72 px-4 md:px-6 py-0 bg-sidebar [&>button]:hidden", className)}>
          <SheetTitle className="hidden">Settings</SheetTitle>
          <div className="flex h-full w-full flex-col">
            <SettingsPanelContent content={content} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="relative flex h-full">
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden bg-sidebar h-full rounded-tr-3xl rounded-br-3xl",
          open ? "w-[300px]" : "w-0",
          className
        )}
      >
        {open && (
          <ScrollArea className="h-full">
            <div className="w-[300px] px-4 md:px-6">
              <SettingsPanelContent content={content} />
            </div>
          </ScrollArea>
        )}
      </div>
      {!open && <SettingsPanelExpandButton />}
    </div>
  );
}

export interface SettingsPanelRailProps extends React.ComponentProps<"button"> {}

export function SettingsPanelRail({ className, ...props }: SettingsPanelRailProps) {
  const { togglePanel } = useSettingsPanel();

  return (
    <button
      data-slot="settings-panel-rail"
      aria-label="Toggle Settings Panel"
      tabIndex={-1}
      onClick={togglePanel}
      title="Toggle Settings Panel"
      className={cn(
        "relative inset-y-0 z-20 w-4 transition-all ease-linear",
        "hover:after:bg-border after:absolute after:inset-y-0 after:w-[2px] after:bg-transparent",
        "cursor-w-resize",
        className
      )}
      {...props}
    />
  );
}

export interface SettingsPanelTriggerProps extends React.ComponentProps<typeof Button> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SettingsPanelTrigger({
  onClick,
  className,
  ...props
}: SettingsPanelTriggerProps) {
  const { togglePanel } = useSettingsPanel();

  return (
    <Button
      variant="ghost"
      className={cn("px-2", className)}
      onClick={(event) => {
        onClick?.(event);
        togglePanel();
      }}
      {...props}
    >
      <RiSettingsLine
        className="text-muted-foreground sm:text-muted-foreground/70 size-5"
        size={20}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Settings</span>
    </Button>
  );
}