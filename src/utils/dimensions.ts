/**
 * Defines the specification for a single dimension, including its label,
 * minimum width, and maximum width.
 */
export interface DimensionSpec {
  label: string;
  min: number;
  max: number;
}

/**
 * Defines the structure for a collection of screen dimensions,
 * typically XS, SM, MD, LG, XL.
 */
export interface ScreenDimensions {
  XS: DimensionSpec;
  SM: DimensionSpec;
  MD: DimensionSpec;
  LG: DimensionSpec;
  XL: DimensionSpec;
  // Could potentially include XXL etc. if needed in the future
}

/**
 * Generates an object containing screen dimension specifications (min/max widths)
 * derived from Ant Design's theme tokens.
 *
 * @param token - The Ant Design theme token object. Expected to contain screenNMin/Max properties.
 * @returns An object mapping dimension labels (XS, SM, etc.) to their DimensionSpec.
 */
export const getDynamicDimensions = (token: any): ScreenDimensions => {
  // Standard Ant Design screen tokens (e.g., screenXSMin, screenXSMax)
  // are expected to be present in a well-configured theme.
  // If they are undefined, it usually signifies a deeper theme issue
  // rather than something to be patched with arbitrary hardcoded numbers here.
  // A value of 0 for a min/max might be a valid token value in some edge cases,
  // so `?? undefined` could be used if we need to distinguish between 0 and undefined,
  // but generally, these tokens should resolve to numbers.

  // For XL.max, Ant Design might not have a screenXLMax if XL is the largest defined.
  // token.screenXXLMax can be used if it exists, otherwise Infinity is appropriate.
  // If token.screenXLMax *is* defined, it should be preferred for XL.
  const xlMax = token.screenXLMax ?? token.screenXXLMax ?? Infinity;

  return {
    XS: {
      label: 'XS',
      min: token.screenXSMin, // Rely on theme to provide this
      max: token.screenXSMax, // Rely on theme to provide this
    },
    SM: {
      label: 'SM',
      min: token.screenSMMin,
      max: token.screenSMMax,
    },
    MD: {
      label: 'MD',
      min: token.screenMDMin,
      max: token.screenMDMax,
    },
    LG: {
      label: 'LG',
      min: token.screenLGMin,
      max: token.screenLGMax,
    },
    XL: {
      label: 'XL',
      min: token.screenXLMin,
      max: xlMax,
    },
  };
};

/**
 * For convenience, exporting the type for a single dimension item.
 * This can be used when referring to one specific dimension (e.g., Dimensions.XS).
 */
export type SingleDimension = DimensionSpec;

// Example of how Ant Design tokens are structured (for reference, not part of the code):
// token: {
//   screenXS: number, screenXSMin: number, screenXSMax: number,
//   screenSM: number, screenSMMin: number, screenSMMax: number,
//   screenMD: number, screenMDMin: number, screenMDMax: number,
//   screenLG: number, screenLGMin: number, screenLGMax: number,
//   screenXL: number, screenXLMin: number, screenXLMax: number,
//   screenXXL: number, screenXXLMin: number, screenXXLMax: number,
//   ...other tokens
// }
// Note: Not all Max tokens (e.g. screenXLMax) are always explicitly defined.
// Some tokens like screenMD represent the breakpoint value itself.
// The getDynamicDimensions function prioritizes Min/Max pairs.
