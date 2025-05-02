import { validateTheme, validateColor, createHighContrastTheme, getThemeColor } from '../../src/lib/theme-utils';
import { ThemeConfig } from '../../src/types';

describe('Theme Utilities', () => {
  describe('validateColor', () => {
    it('should return valid hex colors', () => {
      expect(validateColor('#000')).toBe('#000');
      expect(validateColor('#000000')).toBe('#000000');
      expect(validateColor('#FFFFFF')).toBe('#FFFFFF');
    });

    it('should return valid rgb colors', () => {
      expect(validateColor('rgb(0, 0, 0)')).toBe('rgb(0, 0, 0)');
      expect(validateColor('rgb(255, 255, 255)')).toBe('rgb(255, 255, 255)');
    });

    it('should return valid rgba colors', () => {
      expect(validateColor('rgba(0, 0, 0, 1)')).toBe('rgba(0, 0, 0, 1)');
      expect(validateColor('rgba(255, 255, 255, 0.5)')).toBe('rgba(255, 255, 255, 0.5)');
    });

    it('should return valid CSS variables', () => {
      expect(validateColor('var(--test-color)')).toBe('var(--test-color)');
    });

    it('should return undefined for invalid colors', () => {
      expect(validateColor('not-a-color')).toBeUndefined();
      expect(validateColor('123456')).toBeUndefined();
    });

    it('should handle undefined input', () => {
      expect(validateColor(undefined)).toBeUndefined();
    });
  });

  describe('validateTheme', () => {
    it('should return default theme when no theme is provided', () => {
      const result = validateTheme();
      expect(result).toBeDefined();
      expect(result.sidebar).toBeDefined();
      expect(result.content).toBeDefined();
    });

    it('should merge provided theme with defaults', () => {
      const customTheme: ThemeConfig = {
        sidebar: {
          background: '#333',
        },
      };
      
      const result = validateTheme(customTheme);
      
      expect(result.sidebar?.background).toBe('#333');
      expect(result.sidebar?.foreground).toBeDefined(); // Should have default value
      expect(result.content).toBeDefined(); // Should have default content
    });

    it('should validate colors in the theme', () => {
      const customTheme: ThemeConfig = {
        sidebar: {
          background: 'invalid-color',
          foreground: '#fff',
        },
      };
      
      const result = validateTheme(customTheme);
      
      expect(result.sidebar?.background).toBeUndefined(); // Invalid color should be undefined
      expect(result.sidebar?.foreground).toBe('#fff'); // Valid color should remain
    });
  });

  describe('createHighContrastTheme', () => {
    it('should create a high contrast version of a theme', () => {
      const theme: ThemeConfig = {
        sidebar: {
          background: '#f0f0f0',
          foreground: '#333333',
        },
        content: {
          background: '#ffffff',
          foreground: '#222222',
        },
      };
      
      const highContrastTheme = createHighContrastTheme(theme);
      
      expect(highContrastTheme.sidebar?.background).toBe('#000000');
      expect(highContrastTheme.sidebar?.foreground).toBe('#ffffff');
      expect(highContrastTheme.content?.background).toBe('#000000');
      expect(highContrastTheme.content?.foreground).toBe('#ffffff');
    });
  });

  describe('getThemeColor', () => {
    it('should get color from theme with correct path', () => {
      const theme: ThemeConfig = {
        sidebar: {
          background: '#f0f0f0',
        },
      };
      
      expect(getThemeColor(theme, 'sidebar', 'background', '#default')).toBe('#f0f0f0');
    });

    it('should return fallback when color not found', () => {
      const theme: ThemeConfig = {
        sidebar: {},
      };
      
      expect(getThemeColor(theme, 'sidebar', 'nonexistent', '#default')).toBe('#default');
    });

    it('should return fallback when category not found', () => {
      const theme: ThemeConfig = {};
      
      expect(getThemeColor(theme, 'sidebar', 'background', '#default')).toBe('#default');
    });
  });
});