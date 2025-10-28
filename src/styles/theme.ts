export const colors = {
  background: {
    primary: '#1a0b2e',      // Deep dark purple background
    secondary: '#2d1b4e',    // Slightly lighter purple for cards/sections
    overlay: 'rgba(26, 11, 46, 0.9)',  // Semi-transparent overlay
  },
  
  purple: {
    vibrant: '#7c3aed',      // Vibrant purple for borders and accents
    light: '#a78bfa',        // Lighter purple for hover states
    dark: '#5b21b6',         // Darker purple for pressed states
  },
  
  text: {
    primary: '#ffffff',      // White text
    secondary: '#cbd5e1',    // Light gray for secondary text
    muted: '#94a3b8',        // Muted gray for less important text
  },
  
  border: {
    primary: '#7c3aed',      // Vibrant purple border
    secondary: '#a78bfa',    // Lighter purple border
  },
  
  // Progress and interactive elements
  accent: '#7c3aed',         // Main accent color
  progress: '#7c3aed',       // Progress bar color
  
  // States
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  fontFamily: {
    primary: 'System',
    mono: 'Courier',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
};

export type Theme = typeof theme;
