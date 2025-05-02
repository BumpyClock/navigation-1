"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ThemeConfig, Team } from '../types';

/**
 * App layout state definition
 */
export type AppLayoutState = {
  sidebarOpen: boolean;
  settingsPanelOpen: boolean;
  activeSection: string | null;
  theme: 'light' | 'dark' | 'system';
  highContrast: boolean;
  activeTeam: Team | null;
  notifications: {
    count: number;
    hasUnread: boolean;
  };
};

/**
 * Types of actions that can be performed on the state
 */
export type AppLayoutAction = 
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'SET_SETTINGS'; payload: boolean }
  | { type: 'SET_ACTIVE_SECTION'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'SET_HIGH_CONTRAST'; payload: boolean }
  | { type: 'SET_ACTIVE_TEAM'; payload: Team | null }
  | { type: 'SET_NOTIFICATION_COUNT'; payload: number }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'RESET_STATE' };

/**
 * Initial state for the app layout
 */
const initialState: AppLayoutState = {
  sidebarOpen: true,
  settingsPanelOpen: false,
  activeSection: null,
  theme: 'system',
  highContrast: false,
  activeTeam: null,
  notifications: {
    count: 0,
    hasUnread: false,
  },
};

/**
 * State storage key for localStorage persistence
 */
const STORAGE_KEY = 'app-layout-state';

/**
 * Reducer function to handle state updates
 */
function reducer(state: AppLayoutState, action: AppLayoutAction): AppLayoutState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { 
        ...state, 
        sidebarOpen: !state.sidebarOpen 
      };
      
    case 'SET_SIDEBAR':
      return { 
        ...state, 
        sidebarOpen: action.payload 
      };
      
    case 'TOGGLE_SETTINGS':
      return { 
        ...state, 
        settingsPanelOpen: !state.settingsPanelOpen 
      };
      
    case 'SET_SETTINGS':
      return { 
        ...state, 
        settingsPanelOpen: action.payload 
      };
      
    case 'SET_ACTIVE_SECTION':
      return { 
        ...state, 
        activeSection: action.payload 
      };
      
    case 'SET_THEME':
      return { 
        ...state, 
        theme: action.payload 
      };
      
    case 'TOGGLE_HIGH_CONTRAST':
      return { 
        ...state, 
        highContrast: !state.highContrast 
      };
      
    case 'SET_HIGH_CONTRAST':
      return { 
        ...state, 
        highContrast: action.payload 
      };
      
    case 'SET_ACTIVE_TEAM':
      return { 
        ...state, 
        activeTeam: action.payload 
      };
      
    case 'SET_NOTIFICATION_COUNT':
      return { 
        ...state, 
        notifications: {
          ...state.notifications,
          count: action.payload,
          hasUnread: action.payload > 0
        }
      };
      
    case 'MARK_NOTIFICATIONS_READ':
      return { 
        ...state, 
        notifications: {
          ...state.notifications,
          hasUnread: false
        }
      };
      
    case 'RESET_STATE':
      return initialState;
      
    default:
      return state;
  }
}

/**
 * Context type definition
 */
interface AppLayoutStateContextType {
  state: AppLayoutState;
  dispatch: React.Dispatch<AppLayoutAction>;
}

/**
 * Create context with no default value
 */
const AppLayoutStateContext = createContext<AppLayoutStateContextType | undefined>(undefined);

/**
 * Props for the state provider component
 */
interface AppLayoutStateProviderProps {
  children: React.ReactNode;
  initialState?: Partial<AppLayoutState>;
  disablePersistence?: boolean;
}

/**
 * Provider component for app layout state
 */
export function AppLayoutStateProvider({ 
  children,
  initialState: initialStateOverride,
  disablePersistence = false,
}: AppLayoutStateProviderProps) {
  // Merge default state with any overrides
  const mergedInitialState = {
    ...initialState,
    ...initialStateOverride,
  };
  
  // Create reducer with the merged initial state
  // If persistence is enabled, try to restore state from localStorage
  const [state, dispatch] = useReducer(reducer, mergedInitialState, (initial) => {
    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          // Merge saved state with initial state to handle new fields
          return { ...initial, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Failed to parse saved app layout state', e);
      }
    }
    return initial;
  });
  
  // Persist state to localStorage when it changes
  useEffect(() => {
    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save app layout state', e);
      }
    }
  }, [state, disablePersistence]);
  
  return (
    <AppLayoutStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppLayoutStateContext.Provider>
  );
}

/**
 * Custom hook to use the app layout state
 * @throws Error if used outside of AppLayoutStateProvider
 */
export function useAppLayoutState(): AppLayoutStateContextType {
  const context = useContext(AppLayoutStateContext);
  if (!context) {
    throw new Error('useAppLayoutState must be used within AppLayoutStateProvider');
  }
  return context;
}

/**
 * Hook that provides access to just the sidebar state
 */
export function useSidebarState() {
  const { state, dispatch } = useAppLayoutState();
  
  return {
    isOpen: state.sidebarOpen,
    toggle: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    open: () => dispatch({ type: 'SET_SIDEBAR', payload: true }),
    close: () => dispatch({ type: 'SET_SIDEBAR', payload: false }),
    set: (isOpen: boolean) => dispatch({ type: 'SET_SIDEBAR', payload: isOpen }),
  };
}

/**
 * Hook that provides access to just the settings panel state
 */
export function useSettingsPanelState() {
  const { state, dispatch } = useAppLayoutState();
  
  return {
    isOpen: state.settingsPanelOpen,
    toggle: () => dispatch({ type: 'TOGGLE_SETTINGS' }),
    open: () => dispatch({ type: 'SET_SETTINGS', payload: true }),
    close: () => dispatch({ type: 'SET_SETTINGS', payload: false }),
    set: (isOpen: boolean) => dispatch({ type: 'SET_SETTINGS', payload: isOpen }),
  };
}

/**
 * Hook that provides access to just the theme state
 */
export function useThemeState() {
  const { state, dispatch } = useAppLayoutState();
  
  return {
    theme: state.theme,
    highContrast: state.highContrast,
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleHighContrast: () => dispatch({ type: 'TOGGLE_HIGH_CONTRAST' }),
    setHighContrast: (enabled: boolean) => dispatch({ type: 'SET_HIGH_CONTRAST', payload: enabled }),
  };
}

/**
 * Hook that provides access to just the active team state
 */
export function useActiveTeam() {
  const { state, dispatch } = useAppLayoutState();
  
  return {
    activeTeam: state.activeTeam,
    setActiveTeam: (team: Team | null) => dispatch({ type: 'SET_ACTIVE_TEAM', payload: team }),
  };
}

/**
 * Hook that provides access to just the notification state
 */
export function useNotifications() {
  const { state, dispatch } = useAppLayoutState();
  
  return {
    count: state.notifications.count,
    hasUnread: state.notifications.hasUnread,
    setCount: (count: number) => dispatch({ type: 'SET_NOTIFICATION_COUNT', payload: count }),
    markRead: () => dispatch({ type: 'MARK_NOTIFICATIONS_READ' }),
  };
}