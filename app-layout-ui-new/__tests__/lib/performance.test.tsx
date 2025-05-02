import React from 'react';
import { render, screen } from '@testing-library/react';
import { PerformanceMonitor, useComponentPerformance } from '../../src/lib/performance';

// Mock the console methods
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Mock performance methods
const originalMark = performance.mark;
const originalMeasure = performance.measure;
const originalGetEntriesByName = performance.getEntriesByName;

beforeEach(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  
  performance.mark = jest.fn();
  performance.measure = jest.fn();
  performance.getEntriesByName = jest.fn().mockReturnValue([{ duration: 10 }]);
});

afterEach(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
  
  performance.mark = originalMark;
  performance.measure = originalMeasure;
  performance.getEntriesByName = originalGetEntriesByName;
  
  jest.clearAllMocks();
});

// Test component for useComponentPerformance hook
const TestComponent = ({ name }: { name: string }) => {
  useComponentPerformance(name);
  return <div data-testid="test-component">Test Component</div>;
};

describe('Performance Monitoring', () => {
  describe('PerformanceMonitor Component', () => {
    it('renders children correctly', () => {
      render(
        <PerformanceMonitor id="test">
          <div data-testid="test-content">Test Content</div>
        </PerformanceMonitor>
      );
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });
    
    it('captures render performance with default callback', () => {
      // Override NODE_ENV for test
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      // Mock the profiler onRender callback directly
      const TestProfiler = () => {
        return (
          <PerformanceMonitor id="test">
            <div>Test</div>
          </PerformanceMonitor>
        );
      };
      
      render(<TestProfiler />);
      
      // Find the Profiler component instance and simulate an onRender call
      const onRenderMock = require('../../src/lib/performance').defaultOnRender;
      onRenderMock('test', 'update', 10, 15, 100, 110);
      
      // Check if console.log was called with performance data
      expect(console.log).toHaveBeenCalledWith('[Performance] test (update):');
      expect(console.log).toHaveBeenCalledWith('Actual duration: 10.00ms');
      
      // Restore NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;
    });
    
    it('shows warning for slow renders', () => {
      // Override NODE_ENV for test
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const onRenderMock = require('../../src/lib/performance').defaultOnRender;
      onRenderMock('test', 'update', 20, 25, 100, 120);
      
      // Check if console.warn was called for slow render
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Slow render detected')
      );
      
      // Restore NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;
    });
    
    it('skips monitoring in production by default', () => {
      // Override NODE_ENV for test
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const { container } = render(
        <PerformanceMonitor id="test">
          <div>Test</div>
        </PerformanceMonitor>
      );
      
      // The Profiler should not be rendered in production
      // but the children should be
      expect(container.textContent).toBe('Test');
      
      // Restore NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe('useComponentPerformance Hook', () => {
    it('tracks component mount performance', () => {
      render(<TestComponent name="TestComponent" />);
      
      // Check if performance marks were created for component lifecycle
      expect(performance.mark).toHaveBeenCalledWith('TestComponent-mount-start');
      
      // Advance timers to trigger the setTimeout
      jest.runAllTimers();
      
      // Verify the mark and measure calls
      expect(performance.mark).toHaveBeenCalledWith('TestComponent-mount-end');
      expect(performance.measure).toHaveBeenCalledWith(
        'TestComponent-mount-duration',
        'TestComponent-mount-start',
        'TestComponent-mount-end'
      );
    });
    
    it('handles component unmount tracking', () => {
      const { unmount } = render(<TestComponent name="TestComponent" />);
      
      // Unmount the component
      unmount();
      
      // Check if unmount mark was created
      expect(performance.mark).toHaveBeenCalledWith('TestComponent-unmount');
    });
    
    it('warns about slow mount times', () => {
      // Mock a slow mount time measurement
      performance.getEntriesByName = jest.fn().mockReturnValue([{ duration: 60 }]);
      
      render(<TestComponent name="TestComponent" />);
      
      // Advance timers to trigger the setTimeout
      jest.runAllTimers();
      
      // Check for warning about slow mount
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Slow mount detected')
      );
    });
  });
});