import type { CSSObject, FunctionInterpolation } from '@emotion/styled';
import runIfFn from './run-if-fn';

type SKeys = 'initial' | 'readOnly' | 'disabled' | 'hover' | 'active' | 'focus' | 'focusVisible';
type States = { [key in SKeys]?: CSSObject } & { lg?: { active?: CSSObject } };
type StatesFn<P extends Record<string, any>> = (props: P) => States;

interface Options {
  /**
   * Used to identify elements that have CSS states.
   *
   * Default: `&`
   *
   * Example: `& ~ input` will become `& ~ input[readonly]`
   */
  selector?: string;
  /**
   * Default: `{lg: '1024px'}`
   */
  breakpoints?: {
    lg: string;
  };
}

const defaults: Required<Options> = {
  selector: '&',
  breakpoints: {
    lg: '1024px',
  },
};

/**
 * hover, only available if the screen width is at least `breakpoints.lg`.
 */
export function state<P extends Record<string, any>>(
  arg: States | StatesFn<P>,
  { selector = defaults.selector, breakpoints = defaults.breakpoints }: Options = {},
): FunctionInterpolation<P> {
  return (props) => {
    const states = runIfFn(arg, props) as States;
    return {
      [selector]: states.initial,
      [`${selector}[readonly]`]: states.readOnly,
      [`${selector}[disabled]`]: states.disabled,
      [`${selector}:not([readonly]):not([disabled]):active`]: states.active,
      [`${selector}:not([readonly]):not([disabled]):focus`]: states.focus,
      [`@media screen and (min-width: ${breakpoints.lg})`]: {
        [`${selector}:not([readonly]):not([disabled]):hover`]: states.hover,
        [`${selector}:not([readonly]):not([disabled]):active`]: states.lg?.active,
      },
    };
  };
}

export default state;
