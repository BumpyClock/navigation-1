// Core components
export * from './components/core/app-layout';
export * from './components/core/app-sidebar';
export * from './components/core/settings-panel';
export * from './components/core/team-switcher';
export * from './components/core/user-dropdown';

// Types
export * from './types';

// Hooks
export * from './hooks';

// Only export necessary UI components that might be needed directly
export { 
  Sidebar, 
  SidebarProvider, 
  SidebarTrigger, 
  SidebarContent 
} from './components/ui/sidebar';

export {
  SettingsPanelProvider,
  SettingsPanelTrigger,
  useSettingsPanel
} from './components/core/settings-panel';