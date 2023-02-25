/**
 * test scenarios
 *
 * runIfFn function
 * - argument type: besides function, should return the parameter value
 * - argument type: function, should return the function result
 * - argument type: function, should be able to pass arguments
 */

import runIfFn from '../src/run-if-fn';

describe('runIfFn function', () => {
  it('argument type: besides function, should return the parameter value', () => {
    const result = runIfFn(null);

    expect(result).toBe(null);
  });

  it('argument type: function, should return the function result', () => {
    const fn = () => 'hello world';

    const result = runIfFn(fn);

    expect(result).toBe(fn());
  });

  it('argument type: function, should be able to pass arguments', () => {
    const fn = (name: string, age: number) => `hi, i'm ${name}, i'm ${age} years old.`;
    const args = ['andi', 20] as const;

    const result = runIfFn(fn, ...args);

    expect(result).toBe(fn(...args));
  });
});
