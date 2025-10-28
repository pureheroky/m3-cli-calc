import type { OpName } from "./registry.js";
import type { Numeric } from "./numeric.js";

export type LiteralNode = { kind: "literal"; value: Numeric };
export type UnaryNode = { kind: "unary"; op: OpName; node: Expr };
export type BinaryNode = {
  kind: "binary";
  op: OpName;
  left: Expr;
  right: Expr;
};
export type CallNode = { kind: "call"; name: string; args: Expr[] };

export type Expr = LiteralNode | UnaryNode | BinaryNode | CallNode;

export const Lit = (value: Numeric): LiteralNode => ({
  kind: "literal",
  value,
});
export const Un = (op: OpName, node: Expr): UnaryNode => ({
  kind: "unary",
  op,
  node,
});
export const Bin = (op: OpName, left: Expr, right: Expr): BinaryNode => ({
  kind: "binary",
  op,
  left,
  right,
});
