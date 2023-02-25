/**
 * test scenarios
 *
 * scale function
 * - should throw an error if the value of defaultScale is not present in the scales
 * - should return a function
 * - should throw an error if the value of the property is not present in the scales
 * - should return the scale based on the value of the property
 * - should reference the default if the property is null
 * - should reference the default if the property is undefined
 * - should pass through props if the scale is a function
 */

import scale from '../src/scale';

describe('scale function', () => {
  it('should throw an error if the value of defaultScale is not present in the scales', () => {
    const scales = { xs: {} };
    const property = 'spacing';
    const defaultScale = 'sm';

    expect(() => scale(scales, { property, defaultScale })).toThrowError(
      'Invalid argument: defaultScale',
    );
  });

  it('should return a function', () => {
    const scales = { xs: {}, sm: {} };
    const property = 'spacing';
    const defaultScale = 'sm';

    const result = scale(scales, { property, defaultScale });

    expect(typeof result).toBe('function');
  });

  it('should throw an error if the value of the property is not present in the scales', () => {
    const scales = { xs: {}, sm: {} };
    const property = 'spacing';
    const defaultScale = 'sm';

    expect(() => scale(scales, { property, defaultScale })({ spacing: 'md' })).toThrowError(
      'Invalid argument: spacing',
    );
  });

  it('should return the scale based on the value of the property', () => {
    const scales = { xs: { margin: 4 }, sm: { margin: 6 } };
    const property = 'spacing';
    const defaultScale = 'sm';

    const result = scale(scales, { property, defaultScale })({ spacing: 'xs' });

    expect(result).toEqual(scales.xs);
  });

  it('should reference the default if the property is null', () => {
    const scales = { xs: { margin: 4 }, sm: { margin: 6 } };
    const property = 'spacing';
    const defaultScale = 'sm';

    const result = scale(scales, { property, defaultScale })({ spacing: null });

    expect(result).toEqual(scales[defaultScale]);
  });

  it('should reference the default if the property is undefined', () => {
    const scales = { xs: { margin: 4 }, sm: { margin: 6 } };
    const property = 'spacing';
    const defaultScale = 'sm';

    const result = scale(scales, { property, defaultScale })({ spacing: undefined });

    expect(result).toEqual(scales[defaultScale]);
  });

  it('should pass through props if the scale is a function', () => {
    const theme = {
      spacing: { xs: 4 },
    };
    const scales = {
      xs: (props: any) => ({
        '--spacing': props.spacing,
        '--space': (props.theme as typeof theme).spacing.xs,
      }),
      sm: { margin: 6 },
    };
    const property = 'spacing';
    const defaultScale = 'sm';
    const props = { theme, spacing: 'xs' };

    const result = scale(scales, { property, defaultScale })(props);

    expect(result).toEqual(scales.xs(props));
  });
});
