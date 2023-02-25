import type { CSSObject, FunctionInterpolation } from '@emotion/styled';

export type Style<P extends Record<string, any>> = CSSObject | FunctionInterpolation<P>;
