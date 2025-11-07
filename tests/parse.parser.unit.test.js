import { describe, it, expect } from "vitest";
import { parseExpr } from "../src/parse/parser.js";
import { Bin, Lit } from "../src/core/ast.js";
import { R } from "../src/core/numeric.js";
describe("parseExpr (unit, comprehensive)", () => {
    it("respects operator precedence", () => {
        const ast = parseExpr("1 + 2 * 3");
        expect(ast).toEqual(Bin("+", Lit(R(1)), Bin("*", Lit(R(2)), Lit(R(3)))));
    });
    it("handles parentheses overriding precedence", () => {
        const ast = parseExpr("(1 + 2) * 3");
        expect(ast).toEqual(Bin("*", Bin("+", Lit(R(1)), Lit(R(2))), Lit(R(3))));
    });
    it("treats ^ as right-associative", () => {
        const ast = parseExpr("2 ^ 3 ^ 2");
        expect(ast).toEqual(Bin("^", Lit(R(2)), Bin("^", Lit(R(3)), Lit(R(2)))));
    });
    it("parses function calls with single arg", () => {
        const ast = parseExpr("sqrt(4)");
        if (ast.kind !== "call")
            throw new Error("expected call");
        expect(ast.name).toBe("sqrt");
        expect(ast.args).toHaveLength(1);
    });
    it("parses function calls with multiple args", () => {
        const ast = parseExpr("foo(1, 2 + 3)");
        if (ast.kind !== "call")
            throw new Error("expected call");
        expect(ast.name).toBe("foo");
        expect(ast.args).toHaveLength(2);
        expect(ast.args[1]).toEqual(Bin("+", Lit(R(2)), Lit(R(3))));
    });
    it("parses complex literal like 1+2i as single literal", () => {
        const ast = parseExpr("1+2i");
        if (ast.kind !== "literal")
            throw new Error("expected literal");
        const v = ast.value;
        expect(v).toMatchObject({ kind: "complex", re: 1, im: 2 });
    });
    it("errors on incomplete expression", () => {
        expect(() => parseExpr("1 +")).toThrow(/invalid expression/i);
    });
    it("parses '+ 1 2' as '1 + 2'", () => {
        const ast = parseExpr("+ 1 2");
        expect(ast).toEqual(Bin("+", Lit(R(1)), Lit(R(2))));
    });
});
