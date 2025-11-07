import { describe, it, expect } from "vitest";
import { parseComplex } from "../src/plugins/complex.js";
describe("complex parser (smoke)", () => {
    it("parses valid complex", () => {
        const z = parseComplex("1+2i");
        if (!z || z.kind !== "complex") {
            throw new Error("expected complex result");
        }
        expect(z.re).toBe(1);
        expect(z.im).toBe(2);
    });
    it("returns null for invalid complex", () => {
        expect(parseComplex("1+2")).toBeNull();
    });
});
