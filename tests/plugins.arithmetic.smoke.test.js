import { describe, it, expect } from "vitest";
import { Registry } from "../src/core/registry.js";
import { R, B, F, C } from "../src/core/numeric.js";
import { installArithmetic } from "../src/plugins/arithmetic.js";
import { Bin, Lit } from "../src/core/ast.js";
import { evaluate } from "../src/core/eval.js";
describe("arithmetic plugin (smoke)", () => {
    const makeReg = () => {
        const reg = new Registry();
        installArithmetic(reg);
        return reg;
    };
    it("adds reals", () => {
        const reg = makeReg();
        const expr = Bin("+", Lit(R(1)), Lit(R(2)));
        const v = evaluate(expr, reg);
        expect(v).toMatchObject({ kind: "real", value: 3 });
    });
    it("adds fractions", () => {
        const reg = makeReg();
        const expr = Bin("+", Lit(F(1n, 3n)), Lit(F(1n, 6n)));
        const v = evaluate(expr, reg);
        // 1/3 + 1/6 = 1/2
        expect(v).toMatchObject({ kind: "fraction", num: 1n, den: 2n });
    });
    it("multiplies complex", () => {
        const reg = makeReg();
        const expr = Bin("*", Lit(C(1, 2)), Lit(C(3, -1)));
        const v = evaluate(expr, reg);
        // (1+2i)*(3-i) = 5+5i
        expect(v).toMatchObject({ kind: "complex", re: 5, im: 5 });
    });
    it("powers bigints", () => {
        const reg = makeReg();
        const expr = Bin("^", Lit(B(2n)), Lit(B(3n)));
        const v = evaluate(expr, reg);
        expect(v).toMatchObject({ kind: "big", value: 8n });
    });
});
