import {
  type Numeric,
  isReal,
  isBig,
  isFrac,
  isCx,
  R,
  B,
  F,
  C,
} from "../core/numeric.js";
import { type NumericBinary, Registry } from "../core/registry.js";

function asReal(x: Numeric): number {
  if (isFrac(x)) return Number(x.num) / Number(x.den);
  if (isBig(x)) return Number(x.value);
  if (isCx(x)) return NaN;
  return x.value;
}

function asComplex(x: Numeric): { re: number; im: number } {
  if (isCx(x)) return x;
  if (isFrac(x)) return { re: Number(x.num) / Number(x.den), im: 0 };
  if (isBig(x)) return { re: Number(x.value), im: 0 };
  return { re: x.value, im: 0 };
}

function liftBinary(op: {
  real?: (a: number, b: number) => number;
  big?: (a: bigint, b: bigint) => bigint;
  frac?: (
    a: { num: bigint; den: bigint },
    b: { num: bigint; den: bigint }
  ) => {
    num: bigint;
    den: bigint;
  };
  cx?: (
    a: { re: number; im: number },
    b: { re: number; im: number }
  ) => {
    re: number;
    im: number;
  };
}): (a: Numeric, b: Numeric) => Numeric {
  return (a, b) => {
    if (isFrac(a) && isFrac(b) && op.frac) {
      const { num, den } = op.frac(a, b);
      return F(num, den);
    }
    if (isCx(a) || isCx(b)) {
      const ca = asComplex(a);
      const cb = asComplex(b);
      if (op.cx) {
        const { re, im } = op.cx(ca, cb);
        return C(re, im);
      }
      if (op.real) return C(op.real(ca.re, cb.re), 0);
    }
    if (isBig(a) && isBig(b) && op.big) return B(op.big(a.value, b.value));
    if (isReal(a) && isReal(b) && op.real) return R(op.real(a.value, b.value));

    if (op.real) return R(op.real(asReal(a), asReal(b)));
    throw new Error("Unsupported operand types");
  };
}

export function installArithmetic(reg: Registry) {
  const add: NumericBinary = {
    name: "+",
    arity: 2,
    handle: liftBinary({
      real: (a, b) => a + b,
      big: (a, b) => a + b,
      frac: (a, b) => ({
        num: a.num * b.den + b.num * a.den,
        den: a.den * b.den,
      }),
      cx: (a, b) => ({ re: a.re + b.re, im: a.im + b.im }),
    }),
  };

  const sub: NumericBinary = {
    name: "-",
    arity: 2,
    handle: liftBinary({
      real: (a, b) => a - b,
      big: (a, b) => a - b,
      frac: (a, b) => ({
        num: a.num * b.den - b.num * a.den,
        den: a.den * b.den,
      }),
      cx: (a, b) => ({ re: a.re - b.re, im: a.im - b.im }),
    }),
  };

  const mul: NumericBinary = {
    name: "*",
    arity: 2,
    handle: liftBinary({
      real: (a, b) => a * b,
      big: (a, b) => a * b,
      frac: (a, b) => ({ num: a.num * b.num, den: a.den * b.den }),
      cx: (a, b) => ({
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im + a.im * b.re,
      }),
    }),
  };

  const div: NumericBinary = {
    name: "/",
    arity: 2,
    handle: liftBinary({
      real: (a, b) => a / b,
      frac: (a, b) => ({ num: a.num * b.den, den: a.den * b.num }),
      cx: (a, b) => {
        const d = b.re * b.re + b.im * b.im;
        return {
          re: (a.re * b.re + a.im * b.im) / d,
          im: (a.im * b.re - a.re * b.im) / d,
        };
      },
    }),
  };

  const pow: NumericBinary = {
    name: "^",
    arity: 2,
    handle: liftBinary({
      real: (a, b) => Math.pow(a, b),
      big: (a, b) => a ** b,
    }),
  };
  const mod: NumericBinary = {
    name: "%",
    arity: 2,
    handle: liftBinary({ real: (a, b) => a % b, big: (a, b) => a % b }),
  };

  reg.register(add);
  reg.register(sub);
  reg.register(mul);
  reg.register(div);
  reg.register(pow);
  reg.register(mod);
}
