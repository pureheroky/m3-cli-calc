import { describe, it, expect } from "vitest";
import { format } from "../src/util/format.js";
import { R, B, F, C } from "../src/core/numeric.js";

describe("format (smoke)", () => {
  it("formats all numeric kinds", () => {
    expect(format(R(1.5))).toBe("1.5");
    expect(format(B(10n))).toBe("10n");
    expect(format(F(1n, 2n))).toBe("1/2");
    expect(format(C(3, -2))).toBe("3-2i");
  });
});
