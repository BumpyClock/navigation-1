"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { RiQuillPenAiLine, RiSettingsLine, RiArrowLeftSLine } from "@remixicon/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SliderControl from "@/components/slider-control";
import { Sheet, SheetTitle, SheetContent } from "@/components/ui/sheet";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SETTINGS_PANEL_COOKIE_NAME = "settings_panel_state";
const SETTINGS_PANEL_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SETTINGS_PANEL_KEYBOARD_SHORTCUT = "s";
const SETTINGS_PANEL_WIDTH = "300px";
const SETTINGS_PANEL_WIDTH_COLLAPSED = "0px";

type SettingsPanelContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  togglePanel: () => void;
};

const SettingsPanelContext = React.createContext<SettingsPanelContext | null>(
  null,
);

function useSettingsPanel() {
  const context = React.useContext(SettingsPanelContext);
  if (!context) {
    throw new Error(
      "useSettingsPanel must be used within a SettingsPanelProvider.",
    );
  }
  return context;
}

const SettingsPanelProvider = ({ 
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children 
}: { 
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile(1024);
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
      document.cookie = `${SETTINGS_PANEL_COOKIE_NAME}=${openState}; path=/; max-age=${SETTINGS_PANEL_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Helper to toggle the panel
  const togglePanel = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the panel
  React.useEffect(() => {
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
};
SettingsPanelProvider.displayName = "SettingsPanelProvider";

const SettingsPanelContent = () => {
  const id = React.useId();

  return (
    <>
      {/* Panel header */}
      <div className="py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <RiQuillPenAiLine
            className="text-muted-foreground/70"
            size={20}
            aria-hidden="true"
          />
          <h2 className="text-sm font-medium">My preferences</h2>
        </div>
        <SettingsPanelCollapseButton />
      </div>

      {/* Panel content */}
      <div className="-mt-px">
        {/* Content group */}
        <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
            Chat presets
          </h3>
          <div className="space-y-3">
            {/* Model */}
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={`${id}-model`} className="font-normal">
                Model
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id={`${id}-model`}
                  className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
                >
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent
                  className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                  align="end"
                >
                  <SelectItem value="1">Chat 4.0</SelectItem>
                  <SelectItem value="2">Chat 3.5</SelectItem>
                  <SelectItem value="3">Chat 3.0</SelectItem>
                  <SelectItem value="4">Chat 2.5</SelectItem>
                  <SelectItem value="5">Chat 2.0</SelectItem>
                  <SelectItem value="6">Chat 1.5</SelectItem>
                  <SelectItem value="7">Chat 1.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Response format */}
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={`${id}-response-format`} className="font-normal">
                Response format
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id={`${id}-response-format`}
                  className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
                >
                  <SelectValue placeholder="Select response format" />
                </SelectTrigger>
                <SelectContent
                  className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                  align="end"
                >
                  <SelectItem value="1">text</SelectItem>
                  <SelectItem value="2">json_object</SelectItem>
                  <SelectItem value="3">json_schema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Writing style */}
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={`${id}-writing-style`} className="font-normal">
                Writing style
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id={`${id}-writing-style`}
                  className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
                >
                  <SelectValue placeholder="Select writing style" />
                </SelectTrigger>
                <SelectContent
                  className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                  align="end"
                >
                  <SelectItem value="1">Concise</SelectItem>
                  <SelectItem value="2">Formal</SelectItem>
                  <SelectItem value="3">Technical</SelectItem>
                  <SelectItem value="4">Creative</SelectItem>
                  <SelectItem value="5">Scientific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mode */}
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={`${id}-mode`} className="font-normal">
                Mode
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id={`${id}-mode`}
                  className="bg-background w-auto max-w-full h-7 py-1 px-2 gap-1 [&_svg]:-me-1 border-none"
                >
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent
                  className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                  align="end"
                >
                  <SelectItem value="1">Chatbot</SelectItem>
                  <SelectItem value="2">Code</SelectItem>
                  <SelectItem value="3">Translate</SelectItem>
                  <SelectItem value="4">Summarize</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content group */}
        <div className="py-5 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <h3 className="text-xs font-medium uppercase text-muted-foreground/80 mb-4">
            Configurations
          </h3>
          <div className="space-y-3">
            {/* Temperature */}
            <SliderControl
              minValue={0}
              maxValue={2}
              initialValue={[1.25]}
              defaultValue={[1]}
              step={0.01}
              label="Temperature"
            />

            {/* Maximum length */}
            <SliderControl
              className="[&_input]:w-14"
              minValue={1}
              maxValue={16383}
              initialValue={[2048]}
              defaultValue={[2048]}
              step={1}
              label="Maximum length"
            />

            {/* Top P */}
            <SliderControl
              minValue={0}
              maxValue={1}
              initialValue={[0.5]}
              defaultValue={[0]}
              step={0.01}
              label="Top P"
            />
          </div>
        </div>
      </div>
    </>
  );
};
SettingsPanelContent.displayName = "SettingsPanelContent";

const SettingsPanelCollapseButton = () => {
  const { togglePanel } = useSettingsPanel();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-7 w-7 rounded-full hover:bg-black/10" 
      onClick={togglePanel}
    >
      <RiArrowLeftSLine size={18} />
      <span className="sr-only">Collapse panel</span>
    </Button>
  );
};

const SettingsPanel = () => {
  const { isMobile, openMobile, setOpenMobile, open } = useSettingsPanel();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent className="w-72 px-4 md:px-6 py-0 bg-[hsl(240_5%_92.16%)] [&>button]:hidden">
          <SheetTitle className="hidden">Settings</SheetTitle>
          <div className="flex h-full w-full flex-col">
            <SettingsPanelContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div 
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        open ? "w-[300px]" : "w-0"
      )}
    >
      {open && (
        <ScrollArea>
          <div className="w-[300px] px-4 md:px-6">
            <SettingsPanelContent />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
SettingsPanel.displayName = "SettingsPanel";

const SettingsPanelRail = ({ className, ...props }: React.ComponentProps<"button">) => {
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
};

const SettingsPanelTrigger = ({
  onClick,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { isMobile, state, togglePanel } = useSettingsPanel();

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
};
SettingsPanelTrigger.displayName = "SettingsPanelTrigger";

export {
  SettingsPanel,
  SettingsPanelProvider,
  SettingsPanelTrigger,
  SettingsPanelRail,
  useSettingsPanel,
};