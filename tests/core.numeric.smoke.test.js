import { describe, it, expect } from "vitest";
import { R, B, F, C, isReal, isBig, isFrac, isCx, } from "../src/core/numeric.js";
describe("numeric (smoke)", () => {
    it("creates real", () => {
        const x = R(1.5);
        expect(isReal(x)).toBe(true);
        expect(x.value).toBe(1.5);
    });
    it("creates big", () => {
        const x = B(10n);
        expect(isBig(x)).toBe(true);
        expect(x.value).toBe(10n);
    });
    it("creates and normalizes fraction", () => {
        const f = F(2n, 4n);
        expect(isFrac(f)).toBe(true);
        expect(f.num).toBe(1n);
        expect(f.den).toBe(2n);
    });
    it("creates complex", () => {
        const z = C(3, -2);
        expect(isCx(z)).toBe(true);
        expect(z.re).toBe(3);
        expect(z.im).toBe(-2);
    });
    it("throws on zero denominator", () => {
        expect(() => F(1n, 0n)).toThrow();
    });
});
