export type Real = { kind: "real"; value: number };
export type Big = { kind: "big"; value: bigint };
export type Fraction = { kind: "fraction"; num: bigint; den: bigint };
export type Complex = { kind: "complex"; re: number; im: number };

export type Numeric = Real | Big | Fraction | Complex;

export const R = (value: number): Real => ({ kind: "real", value });
export const B = (value: bigint): Big => ({ kind: "big", value });
export const F = (num: bigint, den: bigint = 1n): Fraction => {
  if (den === 0n) throw new Error("denominator=0");
  const g = gcd(abs(num), abs(den));
  const n = den < 0n ? -num : num;
  const d = den < 0n ? -den : den;
  return { kind: "fraction", num: n / g, den: d / g };
};
export const C = (re: number, im: number): Complex => ({
  kind: "complex",
  re,
  im,
});

const abs = (x: bigint) => (x < 0n ? -x : x);
const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));

export const isReal = (x: Numeric): x is Real => x.kind === "real";
export const isBig = (x: Numeric): x is Big => x.kind === "big";
export const isFrac = (x: Numeric): x is Fraction => x.kind === "fraction";
export const isCx = (x: Numeric): x is Complex => x.kind === "complex";
