import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        :root {
          --color-text: ${theme.colors.text};
          --color-text-muted: ${theme.colors.textMuted};
          --color-border: ${theme.colors.border};
          --color-border-strong: ${theme.colors.borderStrong};
          --color-input-background: ${theme.colors.inputBackground};
          --color-surface: ${theme.colors.surface};
          --color-surface-muted: ${theme.colors.surfaceMuted};
          --color-overlay: ${theme.colors.overlay};
          --color-overlay-soft: ${theme.colors.overlaySoft};
          --color-overlay-strong: ${theme.colors.overlayStrong};
          --color-primary: ${theme.colors.primary};
          --color-primary-light: ${theme.colors.primaryLight};
          --color-primary-text: ${theme.colors.primaryText};
          --color-danger: ${theme.colors.status.errorBorder};
          --color-success: ${theme.colors.status.successBorder};
          --font-body: ${theme.fonts.body};
          --font-heading: ${theme.fonts.heading};
          --radius-sm: ${theme.radii.sm};
          --radius-md: ${theme.radii.md};
          --space-xs: ${theme.spacing.xs};
          --space-sm: ${theme.spacing.sm};
          --space-md: ${theme.spacing.md};
          --space-lg: ${theme.spacing.lg};
          --space-xl: ${theme.spacing.xl};
          --space-xxl: ${theme.spacing.xxl};
          --space-xxxl: ${theme.spacing.xxxl};
          --space-page-top: ${theme.spacing.pageTop};
          --shadow-header: ${theme.shadows.header};
          --shadow-popover: ${theme.shadows.popover};
          --shadow-modal: ${theme.shadows.modal};
          --shadow-ring-neutral: ${theme.shadows.ringNeutral};
          --shadow-focus: ${theme.shadows.focus};
          --shadow-focus-strong: ${theme.shadows.focusStrong};
          --shadow-border-inset: ${theme.shadows.borderInset};
          --z-base: ${theme.zIndices.base};
          --z-below: ${theme.zIndices.below};
          --z-header: ${theme.zIndices.header};
          --z-overlay: ${theme.zIndices.overlay};
          --transition-base: ${theme.transitions.base};
          --transition-fast: ${theme.transitions.fast};
          --transition-medium: ${theme.transitions.medium};
          --transition-slow: ${theme.transitions.slow};
        }
      `}
    />
  );
};

export default GlobalStyles;
