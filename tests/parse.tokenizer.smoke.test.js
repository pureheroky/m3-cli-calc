import { describe, it, expect } from "vitest";
import { tokenize } from "../src/parse/tokenizer.js";
describe("tokenizer (smoke)", () => {
    it("tokenizes basic expression", () => {
        const tokens = tokenize("1 + 2 * foo(3,4)");
        expect(tokens).toEqual([
            { t: "num", v: "1" },
            { t: "op", v: "+" },
            { t: "num", v: "2" },
            { t: "op", v: "*" },
            { t: "id", v: "foo" },
            { t: "lp" },
            { t: "num", v: "3" },
            { t: "comma" },
            { t: "num", v: "4" },
            { t: "rp" },
        ]);
    });
});
