import { renderHook } from '@testing-library/react';
import { useIsMobile } from '../../src/hooks/use-mobile';

describe('useIsMobile Hook', () => {
  const originalMatchMedia = window.matchMedia;
  
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });
  
  it('should return true when window width is less than the breakpoint', () => {
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Mock innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    const { result } = renderHook(() => useIsMobile(768));
    
    expect(result.current).toBe(true);
  });
  
  it('should return false when window width is greater than the breakpoint', () => {
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Mock innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    const { result } = renderHook(() => useIsMobile(768));
    
    expect(result.current).toBe(false);
  });
  
  it('should use default breakpoint when not provided', () => {
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Mock innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });
});