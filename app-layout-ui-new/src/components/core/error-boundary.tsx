"use client"

import React from 'react';

/**
 * ErrorBoundary component
 * 
 * A React error boundary that catches errors in its child component tree and displays
 * a fallback UI instead of crashing the entire application.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary 
 *   fallback={<div>Something went wrong. Please try again.</div>}
 *   onError={(error) => console.error('Captured error:', error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @example
 * // With default fallback UI
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 */
interface ErrorBoundaryProps {
  /** The components that this error boundary should wrap */
  children: React.ReactNode;
  
  /** 
   * Custom UI to display when an error occurs.
   * If not provided, a default error message is shown.
   */
  fallback?: React.ReactNode;
  
  /**
   * Optional callback function that runs when an error is caught.
   * Useful for error logging or analytics.
   */
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

/**
 * Internal state for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has occurred in the children */
  hasError: boolean;
  
  /** The error that was caught, if any */
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, info);
    
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="mb-4">There was an error rendering this component.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}