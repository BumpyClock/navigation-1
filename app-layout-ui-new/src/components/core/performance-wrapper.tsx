"use client"

import React from 'react';
import { PerformanceMonitor, useComponentPerformance } from '../../lib/performance';

export interface PerformanceComponentProps {
  /** Component ID for performance tracking */
  id: string;
  
  /** Child components to render */
  children: React.ReactNode;
  
  /** Whether to enable in production */
  enableInProduction?: boolean;
}

/**
 * A utility component that wraps any component with performance monitoring
 * 
 * This component tracks component rendering performance and reports metrics.
 * 
 * @component
 */
export function PerformanceComponent({
  id,
  children,
  enableInProduction = false
}: PerformanceComponentProps) {
  // Track component mount performance
  useComponentPerformance(`${id}Mount`);
  
  return (
    <PerformanceMonitor
      id={id}
      enableInProduction={enableInProduction || (process.env.NODE_ENV === 'production' && process.env.ENABLE_PERF_LOGGING === 'true')}
      logToConsole={process.env.NODE_ENV !== 'production'}
    >
      {children}
    </PerformanceMonitor>
  );
}