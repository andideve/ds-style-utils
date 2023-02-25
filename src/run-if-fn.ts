export function runIfFn(valOrFn: any, ...args: any[]) {
  if (typeof valOrFn === 'function') return valOrFn(...args);
  return valOrFn;
}

export default runIfFn;
