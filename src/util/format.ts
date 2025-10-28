import { isCx, isFrac, isBig, isReal, type Numeric } from "../core/numeric.js";

export function format(x: Numeric): string {
  if (isFrac(x)) return `${x.num}/${x.den}`;
  if (isCx(x)) return `${x.re}${x.im >= 0 ? "+" : ""}${x.im}i`;
  if (isBig(x)) return `${x.value}n`;
  if (isReal(x)) return `${x.value}`;
  return `${x as any}`;
}
