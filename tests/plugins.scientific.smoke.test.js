import { describe, it, expect } from "vitest";
import { Registry } from "../src/core/registry.js";
import { R } from "../src/core/numeric.js";
import { installScientific } from "../src/plugins/scientific.js";
import { Lit, Un } from "../src/core/ast.js";
import { evaluate } from "../src/core/eval.js";
function makeReg() {
    const reg = new Registry();
    installScientific(reg);
    return reg;
}
describe("scientific plugin (smoke)", () => {
    it("sqrt works", () => {
        const reg = makeReg();
        const v = evaluate(Un("sqrt", Lit(R(9))), reg);
        if (v.kind !== "real") {
            throw new Error(`expected real, got ${v.kind}`);
        }
        expect(v.value).toBe(3);
    });
    it("sin and cos exist", () => {
        const reg = makeReg();
        const sin = evaluate(Un("sin", Lit(R(0))), reg);
        const cos = evaluate(Un("cos", Lit(R(0))), reg);
        if (sin.kind !== "real" || cos.kind !== "real") {
            throw new Error("expected real results for sin/cos(0)");
        }
        expect(sin.value).toBe(0);
        expect(cos.value).toBe(1);
    });
});
