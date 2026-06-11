export const lightTheme = {
  colors: {
    text: '#333333',
    textMuted: '#666666',
    border: '#eeeeee',
    borderStrong: '#dddddd',
    inputBackground: '#eeeeee',
    surface: '#ffffff',
    surfaceMuted: '#f7f7f7',
    overlay: 'rgba(0, 0, 0, 0.45)',
    overlaySoft: 'rgba(0, 0, 0, 0.35)',
    overlayStrong: 'rgba(0, 0, 0, 0.55)',
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
    body: 'Helvetica, Arial, sans-serif',
    heading: "'Spectral', Georgia, serif",
  },
  radii: {
    sm: '0.2rem',
    md: '0.4rem',
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.2rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    pageTop: '4rem',
  },
  shadows: {
    header: '0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1)',
    popover: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2)',
    modal: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
    ringNeutral: '0 0 0 0.1875rem #eeeeee',
    focus: '0 0 0 0.1875rem #ffeeaa',
    focusStrong: '0 0 0 0.1875rem #ffeeaa, 0 0 0 0.25rem #ffbb11',
    borderInset: 'inset 0 0 0 0.0625rem #dddddd',
  },
  zIndices: {
    base: 1,
    below: -1,
    header: 100,
    overlay: 1000,
  },
  breakpoints: {
    sm: '40rem',
    md: '48rem',
  },
  transitions: {
    base: '0.1s',
    fast: '0.2s',
    medium: '0.5s',
    slow: '1s',
  },
} as const;

export const theme = lightTheme;

export type AppTheme = typeof lightTheme;
