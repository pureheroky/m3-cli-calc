import { describe, it, expect } from "vitest";
import { Lit, Un, Bin } from "../src/core/ast.js";
import { R } from "../src/core/numeric.js";
import { Registry } from "../src/core/registry.js";
import { evaluate } from "../src/core/eval.js";
describe("evaluate (smoke)", () => {
    it("evaluates literal, unary, binary and call expressions", () => {
        const reg = new Registry();
        reg.register({
            name: "neg",
            arity: 1,
            handle: (x) => R(-x.value),
        });
        reg.register({
            name: "+",
            arity: 2,
            handle: (a, b) => R(a.value + b.value),
        });
        reg.register({
            name: "sum",
            arity: 2,
            handle: (a, b) => R(a.value + b.value),
        });
        const expr = {
            kind: "call",
            name: "sum",
            args: [Un("neg", Lit(R(1))), Bin("+", Lit(R(2)), Lit(R(3)))],
        };
        const res = evaluate(expr, reg);
        expect(res).toMatchObject({ kind: "real", value: 4 });
    });
});
