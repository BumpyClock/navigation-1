import { ThemeConfig } from "../types";

/**
 * Default light theme
 */
export const defaultLightTheme: ThemeConfig = {
  sidebar: {
    background: '#f9fafb',
    foreground: '#111827',
    accentBackground: '#f3f4f6',
    accentForeground: '#111827',
    border: '#e5e7eb',
    primary: '#3b82f6',
    primaryForeground: '#ffffff'
  },
  content: {
    background: '#ffffff',
    foreground: '#111827',
    darkBackground: '#111827'
  }
};

/**
 * Default dark theme
 */
export const defaultDarkTheme: ThemeConfig = {
  sidebar: {
    background: '#111827',
    foreground: '#f9fafb',
    accentBackground: '#1f2937',
    accentForeground: '#f9fafb',
    border: '#374151',
    primary: '#3b82f6',
    primaryForeground: '#ffffff'
  },
  content: {
    background: '#1f2937',
    foreground: '#f9fafb',
    darkBackground: '#111827'
  }
};

/**
 * Regular expressions for validating color formats
 */
const colorRegex = {
  hex: /^#([A-Fa-f0-9]{3}){1,2}$/,
  rgb: /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
  rgba: /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,
  hsl: /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,
  hsla: /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/,
  oklch: /^oklch\(.*\)$/,
};

/**
 * Validates a color value against common color formats
 */
export function validateColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  
  // Check against all valid color formats
  const isValid = Object.values(colorRegex).some(regex => regex.test(color));
  
  // Also allow CSS variables
  const isCssVariable = color.startsWith('var(--');
  
  return (isValid || isCssVariable) ? color : undefined;
}

/**
 * Deep merges a theme with the default theme to ensure all properties exist
 * and validates all color values
 * 
 * @param theme The theme to validate
 * @param isDark Whether to use the dark theme as the base
 * @returns A validated and completed theme config
 */
export function validateTheme(theme?: ThemeConfig, isDark = false): ThemeConfig {
  // If no theme provided, return the default
  if (!theme) return isDark ? defaultDarkTheme : defaultLightTheme;
  
  // Choose the base theme
  const baseTheme = isDark ? defaultDarkTheme : defaultLightTheme;
  
  // Deep merge with default theme to ensure all properties exist
  const mergedTheme: ThemeConfig = {
    sidebar: {
      ...baseTheme.sidebar,
      ...theme.sidebar
    },
    content: {
      ...baseTheme.content,
      ...theme.content
    }
  };
  
  // Validate sidebar colors
  if (mergedTheme.sidebar) {
    Object.keys(mergedTheme.sidebar).forEach(key => {
      const colorKey = key as keyof typeof mergedTheme.sidebar;
      const color = mergedTheme.sidebar![colorKey] as string;
      mergedTheme.sidebar![colorKey] = validateColor(color) as any;
    });
  }
  
  // Validate content colors
  if (mergedTheme.content) {
    Object.keys(mergedTheme.content).forEach(key => {
      const colorKey = key as keyof typeof mergedTheme.content;
      const color = mergedTheme.content![colorKey] as string;
      mergedTheme.content![colorKey] = validateColor(color) as any;
    });
  }
  
  return mergedTheme;
}

/**
 * Computes a theme with increased contrast for better accessibility
 * 
 * @param theme The base theme
 * @returns A theme with increased contrast
 */
export function createHighContrastTheme(theme: ThemeConfig): ThemeConfig {
  const highContrastTheme: ThemeConfig = JSON.parse(JSON.stringify(theme));
  
  // Increase contrast for sidebar
  if (highContrastTheme.sidebar) {
    if (theme.sidebar?.foreground) {
      highContrastTheme.sidebar.foreground = '#ffffff';
    }
    if (theme.sidebar?.background) {
      highContrastTheme.sidebar.background = '#000000';
    }
    if (theme.sidebar?.primary) {
      highContrastTheme.sidebar.primary = '#ffffff';
    }
    if (theme.sidebar?.primaryForeground) {
      highContrastTheme.sidebar.primaryForeground = '#000000';
    }
  }
  
  // Increase contrast for content
  if (highContrastTheme.content) {
    if (theme.content?.foreground) {
      highContrastTheme.content.foreground = '#ffffff';
    }
    if (theme.content?.background) {
      highContrastTheme.content.background = '#000000';
    }
  }
  
  return highContrastTheme;
}

/**
 * Returns a CSS color string based on a theme property, with fallback
 * 
 * @param theme The theme object
 * @param category The theme category (sidebar or content)
 * @param property The color property to retrieve
 * @param fallback Fallback color to use if property is not found
 * @returns A CSS color string
 */
export function getThemeColor(
  theme: ThemeConfig,
  category: 'sidebar' | 'content',
  property: string,
  fallback = '#000000'
): string {
  const categoryObj = theme[category];
  if (!categoryObj) return fallback;
  
  return (categoryObj as any)[property] || fallback;
}

/**
 * Applies a theme to the document's root element as CSS variables
 * 
 * @param theme The theme to apply
 */
export function applyThemeToDocument(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply sidebar theme
  if (theme.sidebar) {
    theme.sidebar.background && root.style.setProperty('--sidebar-bg', theme.sidebar.background);
    theme.sidebar.foreground && root.style.setProperty('--sidebar-fg', theme.sidebar.foreground);
    theme.sidebar.accentBackground && root.style.setProperty('--sidebar-hover-bg', theme.sidebar.accentBackground);
    theme.sidebar.accentForeground && root.style.setProperty('--sidebar-hover-fg', theme.sidebar.accentForeground);
    theme.sidebar.primary && root.style.setProperty('--sidebar-primary', theme.sidebar.primary);
    theme.sidebar.primaryForeground && root.style.setProperty('--sidebar-primary-fg', theme.sidebar.primaryForeground);
    theme.sidebar.primaryForeground && root.style.setProperty('--sidebar-primary-icon', theme.sidebar.primaryForeground);
  }
  
  // Apply content theme
  if (theme.content) {
    theme.content.background && root.style.setProperty('--content-bg', theme.content.background);
    theme.content.foreground && root.style.setProperty('--content-fg', theme.content.foreground);
    theme.content.darkBackground && root.style.setProperty('--content-dark-bg', theme.content.darkBackground);
  }
}