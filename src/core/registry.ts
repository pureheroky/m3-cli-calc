import type { Numeric } from "./numeric.js";

export type OpName =
  | "+"
  | "-"
  | "*"
  | "/"
  | "^"
  | "%"
  | "neg"
  | "abs"
  | "sin"
  | "cos"
  | "tan"
  | "sqrt";

export type OpHandler<TIn extends readonly unknown[], TOut> = (
  ...args: TIn
) => TOut;

export type Operation<TIn extends readonly unknown[], TOut> = {
  name: OpName;
  arity: TIn["length"];
  handle: OpHandler<TIn, TOut>;
};

export class Registry {
  private ops = new Map<string, Operation<any, any>>();

  register<TIn extends readonly unknown[], TOut>(op: Operation<TIn, TOut>) {
    const key = this.key(op.name, op.arity);
    if (this.ops.has(key))
      throw new Error(`Operation already registered: ${key}`);
    this.ops.set(key, op);
  }

  get<TIn extends readonly unknown[], TOut>(
    name: OpName,
    arity: number
  ): Operation<TIn, TOut> {
    const op = this.ops.get(this.key(name, arity));
    if (!op) throw new Error(`Unknown op ${name}/${arity}`);
    return op as Operation<TIn, TOut>;
  }

  private key(name: string, arity: number) {
    return `${name}/${arity}`;
  }
}

export type NumericBinary = Operation<readonly [Numeric, Numeric], Numeric>;
export type NumericUnary = Operation<readonly [Numeric], Numeric>;
