import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { ErrorBoundary } from '../../../src/components/core/error-boundary';

// Component that throws an error
const ProblemComponent = () => {
  throw new Error('Test error');
  return <div>This will never render</div>;
};

// Mock console.error to avoid test output pollution
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders fallback UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );
    
    // Default fallback UI should be shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('There was an error rendering this component.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom Error UI</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ProblemComponent />
      </ErrorBoundary>
    );
    
    // Custom fallback UI should be shown
    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
    
    // Default fallback UI should not be shown
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError when there is an error', () => {
    const handleError = jest.fn();
    
    render(
      <ErrorBoundary onError={handleError}>
        <ProblemComponent />
      </ErrorBoundary>
    );
    
    // The error handler should have been called
    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(handleError.mock.calls[0][0].message).toBe('Test error');
  });

  it('resets error state when "Try again" is clicked', () => {
    // This test is complex because we need to control component rendering
    let shouldThrow = true;
    
    const ToggleErrorComponent = () => {
      if (shouldThrow) {
        throw new Error('Controlled error');
      }
      return <div>Rendering normally now</div>;
    };
    
    const { rerender } = render(
      <ErrorBoundary>
        <ToggleErrorComponent />
      </ErrorBoundary>
    );
    
    // Initially shows error UI
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    // Change component behavior to not throw
    shouldThrow = false;
    
    // Click try again button
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    
    // Force rerender
    rerender(
      <ErrorBoundary>
        <ToggleErrorComponent />
      </ErrorBoundary>
    );
    
    // Should now show the normal component
    expect(screen.getByText('Rendering normally now')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});