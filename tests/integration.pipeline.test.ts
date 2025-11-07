import { describe, it, expect } from "vitest";
import { parseExpr } from "../src/parse/parser.js";
import { evaluate } from "../src/core/eval.js";
import { Registry } from "../src/core/registry.js";
import { installArithmetic } from "../src/plugins/arithmetic.js";
import { installScientific } from "../src/plugins/scientific.js";
import { format } from "../src/util/format.js";
import { Lit, Bin, type Expr } from "../src/core/ast.js";
import { F, B } from "../src/core/numeric.js";

function makeRegistry() {
  const reg = new Registry();
  installArithmetic(reg);
  installScientific(reg);
  return reg;
}

describe("tcalc pipeline (integration)", () => {
  it("evaluates expression string with arithmetic and scientific ops", () => {
    const reg = makeRegistry();
    const ast = parseExpr("sqrt(4) + 1 * 3");
    const value = evaluate(ast, reg);

    if (value.kind !== "real") {
      throw new Error(`expected real, got ${value.kind}`);
    }
    expect(value.value).toBe(5);
  });

  it("evaluates complex expression end-to-end", () => {
    const reg = makeRegistry();
    const ast = parseExpr("1+2i + 3+4i");
    const value = evaluate(ast, reg);

    expect(format(value)).toBe("4+6i");
  });

  it("integrates fractions and bigints via arithmetic + eval + format", () => {
    const reg = makeRegistry();

    // (1/2 + 1/2) -> 1/1
    const fracExpr: Expr = Bin("+", Lit(F(1n, 2n)), Lit(F(1n, 2n)));
    const fracVal = evaluate(fracExpr, reg);
    expect(format(fracVal)).toBe("1/1");

    // 2n ^ 3n -> 8n
    const bigExpr: Expr = Bin("^", Lit(B(2n)), Lit(B(3n)));
    const bigVal = evaluate(bigExpr, reg);
    expect(format(bigVal)).toBe("8n");
  });
});
