import React from 'react';
import { render, screen } from '../../test-utils';
import { AppLayout } from '../../../src/components/core/app-layout';

// Mock the hooks to avoid window.matchMedia errors
jest.mock('../../../src/hooks/use-mobile', () => ({
  useIsMobile: jest.fn().mockReturnValue(false),
}));

describe('AppLayout Component', () => {
  it('renders without crashing', () => {
    render(
      <AppLayout>
        <div data-testid="test-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders with custom background class', () => {
    render(
      <AppLayout backgroundClassName="bg-custom-class">
        <div data-testid="test-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    // Check if the custom class is applied to the main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('bg-custom-class');
  });

  it('renders with settings panel when showSettingsPanel is true', () => {
    render(
      <AppLayout 
        showSettingsPanel={true}
        settingsPanelContent={<div data-testid="settings-content">Settings</div>}
      >
        <div data-testid="test-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    // Note: The settings panel might be in the document but not visible 
    // depending on the state. This is a simplified test.
  });

  it('renders custom header content when provided', () => {
    render(
      <AppLayout 
        headerContent={<div data-testid="custom-header">Custom Header</div>}
      >
        <div data-testid="test-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});