import { type Numeric, isReal, isCx, R, C } from "../core/numeric.js";
import { type NumericUnary, Registry } from "../core/registry.js";

const liftUnary =
  (
    f: (x: number) => number,
    fCx?: (re: number, im: number) => { re: number; im: number }
  ) =>
  (x: Numeric) => {
    if (isReal(x)) return R(f(x.value));
    if (isCx(x) && fCx) {
      const { re, im } = fCx(x.re, x.im);
      return C(re, im);
    }
    return R(f(Number(isCx(x) ? x.re : (x as any).value)));
  };

export function installScientific(reg: Registry) {
  const sqrt: NumericUnary = {
    name: "sqrt",
    arity: 1,
    handle: liftUnary(Math.sqrt),
  };
  const sin: NumericUnary = {
    name: "sin",
    arity: 1,
    handle: liftUnary(Math.sin),
  };
  const cos: NumericUnary = {
    name: "cos",
    arity: 1,
    handle: liftUnary(Math.cos),
  };
  reg.register(sqrt);
  reg.register(sin);
  reg.register(cos);
}
