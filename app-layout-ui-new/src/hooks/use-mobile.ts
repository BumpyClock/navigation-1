import * as React from "react";
import { useMediaQuery } from './use-media-query';

const DEFAULT_MOBILE_BREAKPOINT = 768;

/**
 * A hook to detect if the current viewport is mobile size
 * 
 * Uses useMediaQuery for the core logic.
 * 
 * @param breakpoint The width threshold in pixels to consider as mobile (default: 768)
 * @returns Boolean indicating if the viewport is mobile size
 */
export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT): boolean {
  // Use useMediaQuery to check if the viewport width is less than the breakpoint
  // Note: We use breakpoint - 1 because max-width is inclusive.
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}