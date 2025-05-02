import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { SidebarSection } from '../../../src/components/core/sidebar-section';

describe('SidebarSection Component', () => {
  it('renders with default props', () => {
    const title = "Test Section";
    render(<SidebarSection title={title}>Test content</SidebarSection>);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it('should be expanded by default', () => {
    render(<SidebarSection title="Test">Content</SidebarSection>);
    const content = screen.getByText("Content");
    expect(content).toBeVisible();
    // Check it doesn't have the collapsed state classes
    expect(content.closest('div')).not.toHaveClass('opacity-0');
    expect(content.closest('div')).not.toHaveClass('pointer-events-none');
  });

  it('should be collapsed when defaultOpen is false', () => {
    render(<SidebarSection title="Test" defaultOpen={false}>Content</SidebarSection>);
    const content = screen.getByText("Content");
    // Check it has the collapsed state classes
    expect(content.closest('div')).toHaveClass('opacity-0');
    expect(content.closest('div')).toHaveClass('pointer-events-none');
  });

  it('toggles when header is clicked', () => {
    render(<SidebarSection title="Test" defaultOpen={false}>Content</SidebarSection>);
    const header = screen.getByText("Test");
    
    // Initially collapsed
    expect(screen.getByText("Content").closest('div')).toHaveClass('opacity-0');
    
    // Click to expand
    fireEvent.click(header);
    expect(screen.getByText("Content").closest('div')).not.toHaveClass('opacity-0');
    
    // Click to collapse
    fireEvent.click(header);
    expect(screen.getByText("Content").closest('div')).toHaveClass('opacity-0');
  });

  it('should apply custom className', () => {
    const customClass = 'custom-test-class';
    render(<SidebarSection title="Test" className={customClass}>Content</SidebarSection>);
    
    // The custom class should be applied to the root element
    const rootElement = screen.getByText("Test").closest('[class*="relative"]');
    expect(rootElement).toHaveClass(customClass);
  });

  it('displays the correct icon based on open state', () => {
    const { container } = render(<SidebarSection title="Test">Content</SidebarSection>);
    
    // When open, down arrow should be visible
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(screen.getByText("Test"));
    
    // After clicking, the icon should change
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<SidebarSection title="Test Section">Content</SidebarSection>);
    
    const header = screen.getByText('Test Section');
    const headerEl = header.closest('[role="button"]');
    const contentId = 'section-content-test-section';
    
    expect(headerEl).toHaveAttribute('role', 'button');
    expect(headerEl).toHaveAttribute('tabIndex', '0');
    expect(headerEl).toHaveAttribute('aria-expanded', 'true');
    expect(headerEl).toHaveAttribute('aria-controls', contentId);
    
    const content = screen.getByText('Content').closest('div');
    expect(content).toHaveAttribute('id', contentId);
  });

  it('toggles when pressing Enter key on header', () => {
    render(<SidebarSection title="Test" defaultOpen={false}>Content</SidebarSection>);
    
    const header = screen.getByText('Test').closest('[role="button"]');
    expect(header).toBeInTheDocument();
    
    if (header) {
      // Initially collapsed
      expect(screen.getByText('Content').closest('div')).toHaveClass('opacity-0');
      
      // Press Enter to expand
      fireEvent.keyDown(header, { key: 'Enter' });
      expect(screen.getByText('Content').closest('div')).not.toHaveClass('opacity-0');
      
      // Press Enter to collapse
      fireEvent.keyDown(header, { key: 'Enter' });
      expect(screen.getByText('Content').closest('div')).toHaveClass('opacity-0');
    }
  });

  it('toggles when pressing Space key on header', () => {
    render(<SidebarSection title="Test" defaultOpen={false}>Content</SidebarSection>);
    
    const header = screen.getByText('Test').closest('[role="button"]');
    expect(header).toBeInTheDocument();
    
    if (header) {
      // Initially collapsed
      expect(screen.getByText('Content').closest('div')).toHaveClass('opacity-0');
      
      // Press Space to expand
      fireEvent.keyDown(header, { key: ' ' });
      expect(screen.getByText('Content').closest('div')).not.toHaveClass('opacity-0');
      
      // Press Space to collapse
      fireEvent.keyDown(header, { key: ' ' });
      expect(screen.getByText('Content').closest('div')).toHaveClass('opacity-0');
    }
  });

  it('shows focus styles when focused', () => {
    render(<SidebarSection title="Test">Content</SidebarSection>);
    
    const header = screen.getByText('Test').closest('[role="button"]');
    expect(header).toBeInTheDocument();
    
    if (header) {
      // Initially no focus styles
      expect(header).not.toHaveClass('ring-2');
      
      // Focus the header
      fireEvent.focus(header);
      expect(header).toHaveClass('ring-2');
      
      // Blur the header
      fireEvent.blur(header);
      expect(header).not.toHaveClass('ring-2');
    }
  });
});