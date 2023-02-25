/**
 * test scenarios
 *
 * state function
 * - should return a function
 * - should return the CSS object correctly
 * - should modify the selector according to the argument
 * - should modify the breakpoints according to the argument
 * - should pass through props if the states are functions
 */

import state from '../src/state';

describe('state function', () => {
  it('should return a function', () => {
    const states = {};

    const result = state(states);

    expect(typeof result).toBe('function');
  });

  it('should return the CSS object correctly', () => {
    const states = {
      initial: { '--key': 'initial' },
      readOnly: { '--key': 'readOnly' },
      disabled: { '--key': 'disabled' },
      hover: { '--key': 'hover' },
      active: { '--key': 'active' },
      focus: { '--key': 'focus' },
      focusVisible: { '--key': 'focusVisible' },
      lg: {
        active: { '--key': 'lg:active' },
      },
    };
    const props = {};

    const result = state(states)(props);

    expect(result).toEqual({
      '&': states.initial,
      '&[readonly]': states.readOnly,
      '&[disabled]': states.disabled,
      '&:not([readonly]):not([disabled]):active': states.active,
      '&:not([readonly]):not([disabled]):focus': states.focus,
      '@media screen and (min-width: 1024px)': {
        '&:not([readonly]):not([disabled]):hover': states.hover,
        '&:not([readonly]):not([disabled]):active': states.lg.active,
      },
    });
  });

  it('should modify the selector according to the argument', () => {
    const states = {
      initial: { '--key': 'initial' },
      readOnly: { '--key': 'readOnly' },
      disabled: { '--key': 'disabled' },
      hover: { '--key': 'hover' },
      active: { '--key': 'active' },
      focus: { '--key': 'focus' },
      focusVisible: { '--key': 'focusVisible' },
      lg: {
        active: { '--key': 'lg:active' },
      },
    };
    const selector = '& ~ input';
    const props = {};

    const result = state(states, { selector })(props);

    expect(result).toEqual({
      [`${selector}`]: states.initial,
      [`${selector}[readonly]`]: states.readOnly,
      [`${selector}[disabled]`]: states.disabled,
      [`${selector}:not([readonly]):not([disabled]):active`]: states.active,
      [`${selector}:not([readonly]):not([disabled]):focus`]: states.focus,
      '@media screen and (min-width: 1024px)': {
        [`${selector}:not([readonly]):not([disabled]):hover`]: states.hover,
        [`${selector}:not([readonly]):not([disabled]):active`]: states.lg.active,
      },
    });
  });

  it('should modify the breakpoints according to the argument', () => {
    const states = {
      initial: { '--key': 'initial' },
      readOnly: { '--key': 'readOnly' },
      disabled: { '--key': 'disabled' },
      hover: { '--key': 'hover' },
      active: { '--key': 'active' },
      focus: { '--key': 'focus' },
      focusVisible: { '--key': 'focusVisible' },
      lg: {
        active: { '--key': 'lg:active' },
      },
    };
    const breakpoints = {
      lg: '1366px',
    };
    const props = {};

    const result = state(states, { breakpoints })(props);

    expect(result).toEqual({
      '&': states.initial,
      '&[readonly]': states.readOnly,
      '&[disabled]': states.disabled,
      '&:not([readonly]):not([disabled]):active': states.active,
      '&:not([readonly]):not([disabled]):focus': states.focus,
      [`@media screen and (min-width: ${breakpoints.lg})`]: {
        '&:not([readonly]):not([disabled]):hover': states.hover,
        '&:not([readonly]):not([disabled]):active': states.lg.active,
      },
    });
  });

  it('should pass through props if the states are functions', () => {
    const statesFn = (props: any) => ({
      initial: { '--key': props.theme.red },
      readOnly: { '--key': props.theme.green },
      disabled: { '--key': props.theme.blue },
      hover: { '--key': props.theme.yellow },
      active: { '--key': props.theme.white },
      focus: { '--key': props.theme.black },
      focusVisible: { '--key': props.theme.cyan },
      lg: {
        active: { '--key': props.theme.turquoise },
      },
    });
    const props = {
      theme: {
        colors: {
          white: 'white',
          black: 'black',
          red: 'red',
          green: 'green',
          blue: 'blue',
          yellow: 'yellow',
          cyan: 'cyan',
          turquoise: 'turquoise',
        },
      },
    };

    const states = statesFn(props);
    const result = state(statesFn)(props);

    expect(result).toEqual({
      '&': states.initial,
      '&[readonly]': states.readOnly,
      '&[disabled]': states.disabled,
      '&:not([readonly]):not([disabled]):active': states.active,
      '&:not([readonly]):not([disabled]):focus': states.focus,
      '@media screen and (min-width: 1024px)': {
        '&:not([readonly]):not([disabled]):hover': states.hover,
        '&:not([readonly]):not([disabled]):active': states.lg.active,
      },
    });
  });
});
