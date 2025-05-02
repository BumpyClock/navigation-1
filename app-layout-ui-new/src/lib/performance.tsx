"use client"

import React, { Profiler, ProfilerOnRenderCallback, ReactNode, useEffect } from 'react';

/**
 * Interface for the PerformanceMonitor component props
 */
interface PerformanceMonitorProps {
  /** Unique identifier for this component in performance logs */
  id: string;
  
  /** React components to be monitored */
  children: ReactNode;
  
  /** Optional custom callback for render performance data */
  onRender?: ProfilerOnRenderCallback;
  
  /** Whether to enable monitoring in production (default: false) */
  enableInProduction?: boolean;
  
  /** Whether to log to console (default: true) */
  logToConsole?: boolean;
  
  /** Whether to send metrics to analytics (default: false) */
  sendToAnalytics?: boolean;
}

/**
 * Default callback that logs performance metrics to the console and optionally analytics
 */
const defaultOnRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  // Only log if explicitly enabled in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction || process.env.ENABLE_PERF_LOGGING === 'true') {
    // Format the log data
    console.log(`[Performance] ${id} (${phase}):`);
    console.log(`Actual duration: ${actualDuration.toFixed(2)}ms`);
    console.log(`Base duration: ${baseDuration.toFixed(2)}ms`);
    console.log(`Commit time: ${commitTime.toFixed(2)}ms`);
    console.log(`Start time: ${startTime.toFixed(2)}ms`);
    
    // Show a warning for slow renders (adjust threshold as needed)
    if (actualDuration > 16) { // 16ms = target for 60fps
      console.warn(`⚠️ Slow render detected in ${id}: ${actualDuration.toFixed(2)}ms`);
    }
  }
  
  // Record custom performance metrics in production
  if (isProduction && typeof window !== 'undefined' && window.performance) {
    try {
      // Record a custom performance mark
      const markName = `${id}-${phase}-end`;
      performance.mark(markName);
      
      // Create a performance measure
      performance.measure(
        `${id}-${phase}`,
        undefined,
        markName
      );
      
      // Optional: Send to analytics service
      if (window.gtag || window.ga || window._paq) {
        const metricData = {
          component: id,
          phase,
          actualDuration,
          baseDuration,
          timestamp: new Date().toISOString()
        };
        
        // Google Analytics (if available)
        if (window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'React',
            event_label: id,
            value: Math.round(actualDuration)
          });
        }
        
        // Older Google Analytics (if available)
        if (window.ga) {
          window.ga('send', 'timing', 'React', 'render', Math.round(actualDuration), id);
        }
        
        // Matomo/Piwik (if available)
        if (window._paq) {
          window._paq.push(['trackEvent', 'Performance', 'React Render', id, Math.round(actualDuration)]);
        }
      }
    } catch (error) {
      console.error('Error recording performance metrics:', error);
    }
  }
};

/**
 * Custom hook to track component lifecycle performance
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    // Mark component mount start
    if (typeof performance !== 'undefined') {
      performance.mark(`${componentName}-mount-start`);
      
      // Measure mount time on next frame
      setTimeout(() => {
        try {
          performance.mark(`${componentName}-mount-end`);
          performance.measure(
            `${componentName}-mount-duration`,
            `${componentName}-mount-start`,
            `${componentName}-mount-end`
          );
          
          // Get the measurement
          const mountMeasure = performance.getEntriesByName(`${componentName}-mount-duration`)[0];
          if (mountMeasure && mountMeasure.duration > 50) {
            console.warn(`⚠️ Slow mount detected in ${componentName}: ${mountMeasure.duration.toFixed(2)}ms`);
          }
        } catch (error) {
          // Ignore errors in performance measuring
        }
      }, 0);
    }
    
    return () => {
      // Mark unmount time
      if (typeof performance !== 'undefined') {
        performance.mark(`${componentName}-unmount`);
      }
    };
  }, [componentName]);
}

/**
 * PerformanceMonitor component
 * 
 * Wraps a React component tree with the Profiler API to monitor rendering performance
 * 
 * @component
 * @example
 * ```tsx
 * <PerformanceMonitor id="AppLayout">
 *   <AppLayout>
 *     {children}
 *   </AppLayout>
 * </PerformanceMonitor>
 * ```
 */
export function PerformanceMonitor({
  id,
  children,
  onRender = defaultOnRender,
  enableInProduction = false,
  logToConsole = true,
  sendToAnalytics = false
}: PerformanceMonitorProps) {
  // Check if we should skip monitoring based on environment
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldMonitor = !isProduction || enableInProduction || process.env.ENABLE_PERF_LOGGING === 'true';
  
  // Create custom render callback that respects options
  const handleRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // Skip logging if disabled
    if (!logToConsole && !sendToAnalytics) return;
    
    // Call custom or default handler
    onRender(id, phase, actualDuration, baseDuration, startTime, commitTime);
  };
  
  // Skip monitoring entirely if disabled
  if (!shouldMonitor) {
    return <>{children}</>;
  }
  
  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
}

/**
 * Add a performance monitor to the window for debugging
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  window.__perfMonitor = {
    getLogs: () => {
      if (performance && performance.getEntriesByType) {
        return {
          marks: performance.getEntriesByType('mark'),
          measures: performance.getEntriesByType('measure')
        };
      }
      return null;
    },
    clearLogs: () => {
      if (performance && performance.clearMarks && performance.clearMeasures) {
        performance.clearMarks();
        performance.clearMeasures();
      }
    }
  };
}

// Types for window augmentation
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ga?: (...args: any[]) => void;
    _paq?: any[];
  }
}