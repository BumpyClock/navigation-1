import * as React from "react";

const DEFAULT_MOBILE_BREAKPOINT = 768;

/**
 * A hook to detect if the current viewport is mobile size
 * 
 * Improved with better SSR support to prevent hydration mismatches
 * 
 * @param breakpoint The width threshold in pixels to consider as mobile (default: 768)
 * @returns Boolean indicating if the viewport is mobile size
 */
export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT): boolean {
  // Start with a reasonable default for SSR (assume not mobile)
  // This prevents hydration mismatch warnings
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  // Track if component is mounted to handle SSR properly
  const [isMounted, setIsMounted] = React.useState(false);

  // Set mounted state after first render
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    // Only run in browser environment and after component is mounted
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Function to check viewport width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Set initial value
    checkIsMobile();
    
    // Add event listener
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Use the right event based on browser support
    // Safari < 14 doesn't support addEventListener on matchMedia
    const handleChange = () => checkIsMobile();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [breakpoint, isMounted]);
  
  return isMobile;
}