import { C, type Numeric } from "../core/numeric.js";
export function parseComplex(s: string): Numeric | null {
  const m = /^(-?\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)i$/.exec(s);
  if (!m) return null;
  return C(Number(m[1]), Number(m[2]));
}
