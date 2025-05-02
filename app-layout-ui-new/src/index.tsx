// Import styles
import './styles.css';

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

// UI components
export {
  // Sidebar components
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
  
  // Other UI components that might be needed directly
  Button,
  ScrollArea,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './components/ui';