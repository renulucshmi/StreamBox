/**
 * Theme Configuration
 * Exports complete theme objects and utility functions
 */

import {
  COMMON_COLORS,
  DARK_COLORS,
  LIGHT_COLORS,
  STATUS_COLORS,
} from "./colors";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  MARGIN,
  PADDING,
  SPACING,
} from "./spacing";
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  TEXT_STYLES,
} from "./typography";

// Light theme object
export const lightTheme = {
  mode: "light",
  colors: LIGHT_COLORS,
  statusColors: STATUS_COLORS,
  commonColors: COMMON_COLORS,
  spacing: SPACING,
  padding: PADDING,
  margin: MARGIN,
  borderRadius: BORDER_RADIUS,
  borderWidth: BORDER_WIDTH,
  fontSize: FONT_SIZES,
  fontWeight: FONT_WEIGHTS,
  lineHeight: LINE_HEIGHTS,
  textStyles: TEXT_STYLES,
};

// Dark theme object
export const darkTheme = {
  mode: "dark",
  colors: DARK_COLORS,
  statusColors: STATUS_COLORS,
  commonColors: COMMON_COLORS,
  spacing: SPACING,
  padding: PADDING,
  margin: MARGIN,
  borderRadius: BORDER_RADIUS,
  borderWidth: BORDER_WIDTH,
  fontSize: FONT_SIZES,
  fontWeight: FONT_WEIGHTS,
  lineHeight: LINE_HEIGHTS,
  textStyles: TEXT_STYLES,
};

/**
 * Get theme by mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {Object} Theme object
 */
export const getTheme = (mode) => {
  return mode === "dark" ? darkTheme : lightTheme;
};

// Export individual constants for direct import
export {
  BORDER_RADIUS,
  BORDER_WIDTH,
  COMMON_COLORS,
  DARK_COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LIGHT_COLORS,
  LINE_HEIGHTS,
  MARGIN,
  PADDING,
  SPACING,
  STATUS_COLORS,
  TEXT_STYLES,
};
