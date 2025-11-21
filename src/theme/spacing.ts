/**
 * Spacing Constants (TypeScript)
 * Centralized spacing values for consistent layout
 */

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
} as const;

// Common padding values
export const PADDING = {
  screen: SPACING.base,
  card: SPACING.md,
  section: SPACING.lg,
} as const;

// Common margin values
export const MARGIN = {
  small: SPACING.sm,
  medium: SPACING.md,
  large: SPACING.lg,
} as const;

// Border radius values
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

// Border width values
export const BORDER_WIDTH = {
  thin: 1,
  medium: 2,
  thick: 3,
} as const;
