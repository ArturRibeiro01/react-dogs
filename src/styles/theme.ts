export const theme = {
  colors: {
    text: '#333333',
    textMuted: '#666666',
    border: '#eeeeee',
    inputBackground: '#eeeeee',
    surface: '#ffffff',
    primary: '#ffbb11',
    primaryLight: '#ffeeaa',
    primaryText: '#764701',
    status: {
      errorBorder: '#ee5544',
      errorBackground: '#fff1f0',
      errorText: '#8f1f12',
      successBorder: '#2e7d32',
      successBackground: '#effaf0',
      successText: '#1b5e20',
      infoBackground: '#fff8e5',
      infoText: '#5c3b00',
    },
  },
  fonts: {
    body: 'var(--type-first)',
    heading: 'var(--type-second)',
  },
  radii: {
    sm: '0.2rem',
    md: '0.4rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.2rem',
  },
  shadows: {
    focus: '0 0 0 3px #ffeeaa',
    focusStrong: '0 0 0 3px #ffeeaa, 0 0 0 4px #ffbb11',
  },
  transitions: {
    fast: '0.2s',
    slow: '1s',
  },
} as const;
