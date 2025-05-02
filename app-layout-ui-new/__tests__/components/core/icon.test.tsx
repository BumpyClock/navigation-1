import React from 'react';
import { render, screen } from '../../test-utils';
import { Icon } from '../../../src/components/core/icon';

// Mock the dynamic import
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ className, size }: { className?: string; size?: number | string }) => (
    <svg data-testid="mock-icon" className={className} width={size} height={size} />
  );
  return DynamicComponent;
});

describe('Icon Component', () => {
  it('renders with default props', () => {
    render(<Icon name="home" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  it('renders with custom size', () => {
    render(<Icon name="settings" size={32} />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });

  it('applies custom className', () => {
    const customClass = 'text-red-500';
    render(<Icon name="menu" className={customClass} />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveClass(customClass);
  });

  it('passes additional props to the icon component', () => {
    render(<Icon name="bell" data-custom="test-value" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveAttribute('data-custom', 'test-value');
  });
});