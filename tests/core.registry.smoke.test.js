import { describe, it, expect } from "vitest";
import { Registry } from "../src/core/registry.js";
describe("registry (smoke)", () => {
    it("registers and retrieves operation", () => {
        const reg = new Registry();
        reg.register({
            name: "+",
            arity: 2,
            handle: (a, b) => a + b,
        });
        const op = reg.get("+", 2);
        expect(op.handle(2, 3)).toBe(5);
    });
    it("throws on duplicate registration", () => {
        const reg = new Registry();
        const op = {
            name: "+",
            arity: 1,
            handle: (x) => x,
        };
        reg.register(op);
        expect(() => reg.register(op)).toThrow(/Operation already registered/);
    });
    it("throws on unknown operation", () => {
        const reg = new Registry();
        expect(() => reg.get("+", 2)).toThrow(/Unknown op/);
    });
});
