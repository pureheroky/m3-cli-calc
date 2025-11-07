import { describe, it, expect } from "vitest";
import { Lit, Un, Bin } from "../src/core/ast.js";
import { R } from "../src/core/numeric.js";
describe("ast (smoke)", () => {
    it("constructs literal, unary and binary nodes", () => {
        const lit = Lit(R(1));
        const un = Un("neg", lit);
        const bin = Bin("+", lit, lit);
        expect(lit).toMatchObject({ kind: "literal" });
        expect(un).toMatchObject({ kind: "unary", node: lit });
        expect(bin).toMatchObject({ kind: "binary", left: lit, right: lit });
    });
});
