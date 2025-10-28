import { F, type Numeric } from "../core/numeric.js";

export function parseFraction(s: string): Numeric | null {
  const m = /^(-?\d+)\s*\/\s*(-?\d+)$/.exec(s);
  if (!m) return null;
  if (!m[1] || !m[2]) throw new Error("invalid fraction");
  return F(BigInt(m[1]), BigInt(m[2]));
}
