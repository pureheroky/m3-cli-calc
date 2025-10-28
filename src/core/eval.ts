import type { Expr } from "./ast.js";
import type { Numeric } from "./numeric.js";
import { Registry } from "./registry.js";

export function evaluate(expr: Expr, reg: Registry): Numeric {
  switch (expr.kind) {
    case "literal":
      return expr.value;

    case "unary": {
      const v = evaluate(expr.node, reg);
      const op = reg.get<[Numeric], Numeric>(expr.op, 1);
      return op.handle(v);
    }

    case "binary": {
      const a = evaluate(expr.left, reg);
      const b = evaluate(expr.right, reg);
      const op = reg.get<[Numeric, Numeric], Numeric>(expr.op, 2);
      return op.handle(a, b);
    }

    case "call": {
      const args = expr.args.map((a) => evaluate(a, reg));
      const op = reg.get<any, any>(expr.name as any, args.length);
      return op.handle(...args);
    }

    default:
      throw new Error(`Unknown expression kind ${(expr as any).kind}`);
  }
}
