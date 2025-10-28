import { tokenize, type Token } from "./tokenizer.js";
import { Bin, Lit, type Expr, type CallNode } from "../core/ast.js";
import { R, F, C } from "../core/numeric.js";

const precedence: Record<string, number> = {
  "^": 4,
  "*": 3,
  "/": 3,
  "%": 3,
  "+": 2,
  "-": 2,
};
const rightAssoc = new Set(["^"]);

export function parseExpr(input: string): Expr {
  const tks = tokenize(input);
  const out: (Expr | string)[] = [];
  const ops: string[] = [];

  const pushOp = (op: string) => {
    while (ops.length) {
      const top = ops[ops.length - 1];
      if (!top || top === "(") break;
      const pTop = precedence[top] ?? 0;
      const pOp = precedence[op] ?? 0;
      if (pTop > pOp || (pTop === pOp && !rightAssoc.has(op))) {
        out.push(ops.pop()!);
      } else break;
    }
    ops.push(op);
  };

  const readNum = (v: string) => {
    const frac = /^(-?\d+)\/(-?\d+)$/.exec(v);
    if (frac) {
      out.push(Lit(F(BigInt(frac[1]!), BigInt(frac[2]!))));
      return;
    }

    const cx = /^(-?\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)i$/.exec(v);
    if (cx) {
      out.push(Lit(C(Number(cx[1]), Number(cx[2]))));
      return;
    }

    if (v.endsWith("n")) {
      out.push(Lit({ kind: "big", value: BigInt(v.slice(0, -1)) }));
      return;
    }

    out.push(Lit(R(Number(v))));
  };

  let i = 0;

  while (i < tks.length) {
    const tk = tks[i++]!;

    if (tk.t === "num") readNum(tk.v);
    else if (tk.t === "id") {
      const next = tks[i];
      if (next && next.t === "lp") {
        i++;
        const args: Expr[] = [];
        let argTokens: Token[] = [];
        let depth = 1;

        while (i < tks.length && depth > 0) {
          const cur = tks[i++]!;
          if (cur.t === "lp") depth++;
          else if (cur.t === "rp") depth--;
          if (depth > 0) argTokens.push(cur);
          if (depth === 1 && cur.t === "comma") {
            argTokens.pop();
            args.push(parseExpr(tokensToString(argTokens)));
            argTokens = [];
          }
        }

        if (argTokens.length > 0)
          args.push(parseExpr(tokensToString(argTokens)));

        out.push({
          kind: "call",
          name: tk.v,
          args,
        } as CallNode);
      }
    } else if (tk.t === "op") pushOp(tk.v);
    else if (tk.t === "lp") ops.push("(");
    else if (tk.t === "rp") {
      while (ops.length && ops[ops.length - 1] !== "(") out.push(ops.pop()!);
      ops.pop();
    }
  }

  while (ops.length) out.push(ops.pop()!);

  const stack: Expr[] = [];
  for (const item of out) {
    if (typeof item !== "string") {
      stack.push(item);
      continue;
    }
    const op = item;
    const b = stack.pop();
    const a = stack.pop();
    if (!a || !b) throw new Error(`invalid expression near operator '${op}'`);
    stack.push(Bin(op as any, a, b));
  }

  if (stack.length !== 1) throw new Error("parse error: incomplete expression");
  return stack[0]!;
}

function tokensToString(tks: Token[]): string {
  return tks
    .map((t) => ("v" in t ? t.v : t.t === "comma" ? "," : ""))
    .join(" ");
}
