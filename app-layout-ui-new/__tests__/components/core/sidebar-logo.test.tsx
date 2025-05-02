import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { SidebarLogo } from '../../../src/components/core/sidebar-logo';

describe('SidebarLogo Component', () => {
  const mockProps = {
    logo: 'https://example.com/logo.png',
    title: 'Company Name',
    subtitle: 'Workspace'
  };

  it('renders logo and text correctly', () => {
    render(<SidebarLogo {...mockProps} />);
    
    // Check logo is rendered
    const logoImg = screen.getByAltText('Company Name');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'https://example.com/logo.png');
    
    // Check title and subtitle are rendered
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
  });

  it('handles missing props gracefully', () => {
    // Only title, no logo or subtitle
    render(<SidebarLogo title="Company Name" />);
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    
    // Only logo, no text
    render(<SidebarLogo logo="https://example.com/logo.png" />);
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    
    // Completely empty props
    const { container } = render(<SidebarLogo />);
    // Should render an empty div with the default classes
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div?.childElementCount).toBe(0);
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<SidebarLogo {...mockProps} onClick={handleClick} />);
    
    const logoContainer = screen.getByText('Company Name').closest('div');
    expect(logoContainer).toBeInTheDocument();
    
    if (logoContainer) {
      fireEvent.click(logoContainer);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-logo-class';
    render(<SidebarLogo {...mockProps} className={customClass} />);
    
    const rootElement = screen.getByText('Company Name').closest('.flex');
    expect(rootElement).toHaveClass(customClass);
  });

  it('uses title as alt text for logo if provided', () => {
    render(<SidebarLogo logo="https://example.com/logo.png" title="My Company" />);
    
    const logoImg = screen.getByAltText('My Company');
    expect(logoImg).toBeInTheDocument();
  });

  it('uses default alt text for logo if title not provided', () => {
    render(<SidebarLogo logo="https://example.com/logo.png" />);
    
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
  });

  it('has button role and accessibility attributes when onClick is provided', () => {
    const handleClick = jest.fn();
    render(<SidebarLogo {...mockProps} onClick={handleClick} />);
    
    const logo = screen.getByText('Company Name').closest('div');
    expect(logo).toHaveAttribute('role', 'button');
    expect(logo).toHaveAttribute('tabIndex', '0');
    expect(logo).toHaveAttribute('aria-label', 'Go to Company Name');
  });

  it('does not have button role when onClick is not provided', () => {
    render(<SidebarLogo {...mockProps} />);
    
    const logo = screen.getByText('Company Name').closest('div');
    expect(logo).not.toHaveAttribute('role');
    expect(logo).not.toHaveAttribute('tabIndex');
  });

  it('calls onClick handler when Enter key is pressed', () => {
    const handleClick = jest.fn();
    render(<SidebarLogo {...mockProps} onClick={handleClick} />);
    
    const logo = screen.getByText('Company Name').closest('div');
    expect(logo).toBeInTheDocument();
    
    if (logo) {
      fireEvent.keyDown(logo, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClick handler when Space key is pressed', () => {
    const handleClick = jest.fn();
    render(<SidebarLogo {...mockProps} onClick={handleClick} />);
    
    const logo = screen.getByText('Company Name').closest('div');
    expect(logo).toBeInTheDocument();
    
    if (logo) {
      fireEvent.keyDown(logo, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('shows focus styles when focused', () => {
    const handleClick = jest.fn();
    render(<SidebarLogo {...mockProps} onClick={handleClick} />);
    
    const logo = screen.getByText('Company Name').closest('div');
    expect(logo).toBeInTheDocument();
    
    if (logo) {
      // Initially no focus styles
      expect(logo).not.toHaveClass('ring-2');
      
      // Focus the header
      fireEvent.focus(logo);
      expect(logo).toHaveClass('ring-2');
      
      // Blur the header
      fireEvent.blur(logo);
      expect(logo).not.toHaveClass('ring-2');
    }
  });
});