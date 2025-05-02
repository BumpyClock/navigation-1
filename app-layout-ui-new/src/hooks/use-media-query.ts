import * as React from "react";

/**
 * A hook for responsive layouts that leverages matchMedia
 * 
 * @param query The media query to match against
 * @returns Boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  // Start with a reasonable default for SSR
  const [matches, setMatches] = React.useState<boolean>(false);
  
  // Track if component is mounted to handle SSR properly
  const [isMounted, setIsMounted] = React.useState(false);

  // Set mounted state after first render
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    // Only run in browser environment and after component is mounted
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Create the media query
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Function to update state
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Use the right API based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query, isMounted]);
  
  return matches;
}

/**
 * A hook to detect if the viewport is at mid-width (e.g., tablets)
 * with debouncing to prevent rapid state changes during resize
 * 
 * @param min The minimum width in pixels
 * @param max The maximum width in pixels
 * @returns Boolean indicating if the viewport is within the specified range
 */
export function useMidWidth(min: number = 1000, max: number = 1170): boolean {
  const matches = useMediaQuery(`(min-width: ${min}px) and (max-width: ${max}px)`);
  const [debouncedMatches, setDebouncedMatches] = React.useState(matches);
  
  React.useEffect(() => {
    // Use debouncing to make animations smoother during resize
    const timer = setTimeout(() => {
      setDebouncedMatches(matches);
    }, 150); // Small delay to prevent janky animations during resize
    
    return () => clearTimeout(timer);
  }, [matches]);
  
  return debouncedMatches;
}

/**
 * A hook to detect if the viewport is narrower than the specified width
 * with debouncing to prevent rapid state changes during resize
 * 
 * @param width The width threshold in pixels
 * @returns Boolean indicating if the viewport is narrower than the specified width
 */
export function useMaxWidth(width: number): boolean {
  const matches = useMediaQuery(`(max-width: ${width}px)`);
  const [debouncedMatches, setDebouncedMatches] = React.useState(matches);
  
  React.useEffect(() => {
    // Use debouncing to make animations smoother during resize
    const timer = setTimeout(() => {
      setDebouncedMatches(matches);
    }, 150); // Small delay to prevent janky animations during resize
    
    return () => clearTimeout(timer);
  }, [matches]);
  
  return debouncedMatches;
}

/**
 * A hook to detect if the viewport is wider than the specified width
 * 
 * @param width The width threshold in pixels
 * @returns Boolean indicating if the viewport is wider than the specified width
 */
export function useMinWidth(width: number): boolean {
  return useMediaQuery(`(min-width: ${width}px)`);
}