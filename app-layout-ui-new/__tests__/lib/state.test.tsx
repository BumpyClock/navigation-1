import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { 
  AppLayoutStateProvider, 
  useAppLayoutState,
  useSidebarState,
  useSettingsPanelState,
  useThemeState,
  useActiveTeam,
  useNotifications
} from '../../src/lib/state';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Test component that uses the state
const TestComponent = () => {
  const { state, dispatch } = useAppLayoutState();
  
  return (
    <div>
      <div data-testid="sidebar-status">
        {state.sidebarOpen ? 'open' : 'closed'}
      </div>
      <div data-testid="settings-status">
        {state.settingsPanelOpen ? 'open' : 'closed'}
      </div>
      <div data-testid="theme-status">{state.theme}</div>
      <button 
        data-testid="toggle-sidebar" 
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      >
        Toggle Sidebar
      </button>
      <button 
        data-testid="toggle-settings" 
        onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
      >
        Toggle Settings
      </button>
      <button 
        data-testid="change-theme" 
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
      >
        Set Dark Theme
      </button>
    </div>
  );
};

// Test components for individual hook tests
const SidebarStateComponent = () => {
  const { isOpen, toggle, open, close } = useSidebarState();
  
  return (
    <div>
      <div data-testid="sidebar-status">{isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle-sidebar" onClick={toggle}>Toggle</button>
      <button data-testid="open-sidebar" onClick={open}>Open</button>
      <button data-testid="close-sidebar" onClick={close}>Close</button>
    </div>
  );
};

const SettingsPanelStateComponent = () => {
  const { isOpen, toggle, open, close } = useSettingsPanelState();
  
  return (
    <div>
      <div data-testid="settings-status">{isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle-settings" onClick={toggle}>Toggle</button>
      <button data-testid="open-settings" onClick={open}>Open</button>
      <button data-testid="close-settings" onClick={close}>Close</button>
    </div>
  );
};

const ThemeStateComponent = () => {
  const { theme, highContrast, setTheme, toggleHighContrast } = useThemeState();
  
  return (
    <div>
      <div data-testid="theme-status">{theme}</div>
      <div data-testid="high-contrast-status">
        {highContrast ? 'enabled' : 'disabled'}
      </div>
      <button 
        data-testid="set-light-theme" 
        onClick={() => setTheme('light')}
      >
        Light Theme
      </button>
      <button 
        data-testid="set-dark-theme" 
        onClick={() => setTheme('dark')}
      >
        Dark Theme
      </button>
      <button 
        data-testid="toggle-high-contrast" 
        onClick={toggleHighContrast}
      >
        Toggle High Contrast
      </button>
    </div>
  );
};

describe('AppLayoutState', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  it('should provide the initial state', () => {
    render(
      <AppLayoutStateProvider disablePersistence>
        <TestComponent />
      </AppLayoutStateProvider>
    );
    
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open');
    expect(screen.getByTestId('settings-status')).toHaveTextContent('closed');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('system');
  });
  
  it('should allow overriding initial state', () => {
    render(
      <AppLayoutStateProvider 
        initialState={{ 
          sidebarOpen: false, 
          settingsPanelOpen: true,
          theme: 'dark' 
        }} 
        disablePersistence
      >
        <TestComponent />
      </AppLayoutStateProvider>
    );
    
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('closed');
    expect(screen.getByTestId('settings-status')).toHaveTextContent('open');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });
  
  it('should handle state updates', () => {
    render(
      <AppLayoutStateProvider disablePersistence>
        <TestComponent />
      </AppLayoutStateProvider>
    );
    
    // Initially sidebar is open
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open');
    
    // Toggle sidebar
    fireEvent.click(screen.getByTestId('toggle-sidebar'));
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('closed');
    
    // Toggle settings panel
    fireEvent.click(screen.getByTestId('toggle-settings'));
    expect(screen.getByTestId('settings-status')).toHaveTextContent('open');
    
    // Change theme
    fireEvent.click(screen.getByTestId('change-theme'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });
  
  it('should persist state to localStorage if enabled', () => {
    render(
      <AppLayoutStateProvider>
        <TestComponent />
      </AppLayoutStateProvider>
    );
    
    // Change state
    fireEvent.click(screen.getByTestId('toggle-sidebar'));
    fireEvent.click(screen.getByTestId('change-theme'));
    
    // Check if localStorage was called
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
    
    // Parse the saved state
    const lastCall = mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1];
    const savedState = JSON.parse(lastCall[1]);
    
    expect(savedState.sidebarOpen).toBe(false);
    expect(savedState.theme).toBe('dark');
  });
  
  it('should restore state from localStorage if available', () => {
    // Set up localStorage with saved state
    const savedState = {
      sidebarOpen: false,
      settingsPanelOpen: true,
      theme: 'dark',
      highContrast: true,
    };
    
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(savedState));
    
    render(
      <AppLayoutStateProvider>
        <TestComponent />
      </AppLayoutStateProvider>
    );
    
    // State should be restored from localStorage
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('closed');
    expect(screen.getByTestId('settings-status')).toHaveTextContent('open');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });
});

describe('Individual State Hooks', () => {
  it('should handle sidebar state correctly', () => {
    render(
      <AppLayoutStateProvider disablePersistence>
        <SidebarStateComponent />
      </AppLayoutStateProvider>
    );
    
    // Initially open
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open');
    
    // Close
    fireEvent.click(screen.getByTestId('close-sidebar'));
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('closed');
    
    // Open
    fireEvent.click(screen.getByTestId('open-sidebar'));
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('open');
    
    // Toggle
    fireEvent.click(screen.getByTestId('toggle-sidebar'));
    expect(screen.getByTestId('sidebar-status')).toHaveTextContent('closed');
  });
  
  it('should handle settings panel state correctly', () => {
    render(
      <AppLayoutStateProvider disablePersistence>
        <SettingsPanelStateComponent />
      </AppLayoutStateProvider>
    );
    
    // Initially closed
    expect(screen.getByTestId('settings-status')).toHaveTextContent('closed');
    
    // Open
    fireEvent.click(screen.getByTestId('open-settings'));
    expect(screen.getByTestId('settings-status')).toHaveTextContent('open');
    
    // Close
    fireEvent.click(screen.getByTestId('close-settings'));
    expect(screen.getByTestId('settings-status')).toHaveTextContent('closed');
    
    // Toggle
    fireEvent.click(screen.getByTestId('toggle-settings'));
    expect(screen.getByTestId('settings-status')).toHaveTextContent('open');
  });
  
  it('should handle theme state correctly', () => {
    render(
      <AppLayoutStateProvider disablePersistence>
        <ThemeStateComponent />
      </AppLayoutStateProvider>
    );
    
    // Initially system
    expect(screen.getByTestId('theme-status')).toHaveTextContent('system');
    expect(screen.getByTestId('high-contrast-status')).toHaveTextContent('disabled');
    
    // Set light theme
    fireEvent.click(screen.getByTestId('set-light-theme'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    // Set dark theme
    fireEvent.click(screen.getByTestId('set-dark-theme'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    
    // Toggle high contrast
    fireEvent.click(screen.getByTestId('toggle-high-contrast'));
    expect(screen.getByTestId('high-contrast-status')).toHaveTextContent('enabled');
  });
});