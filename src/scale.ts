import type { FunctionInterpolation } from '@emotion/styled';

import runIfFn from './run-if-fn';
import { Style } from './types';

export function scale<K extends string, P extends { [key in K]?: string | null }>(
  scales: Record<NonNullable<P[K]>, Style<P>>,
  { property, defaultScale }: { property: K; defaultScale: NonNullable<P[K]> },
): FunctionInterpolation<P> {
  if (!(defaultScale in scales)) {
    throw new Error('Invalid argument: defaultScale');
  }

  return (props) => {
    const scale = props[property] ?? defaultScale;
    if (!(scale in scales)) {
      throw new Error(`Invalid argument: ${property}`);
    }

    return runIfFn(scales[scale], props);
  };
}

export default scale;
