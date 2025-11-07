import { describe, it, expect } from "vitest";
import { parseFraction } from "../src/plugins/fraction.js";

describe("fraction parser (smoke)", () => {
  it("parses valid fraction", () => {
    const f = parseFraction("3 / 4");

    if (!f || f.kind !== "fraction") {
      throw new Error("expected fraction result");
    }

    expect(f.num).toBe(3n);
    expect(f.den).toBe(4n);
  });

  it("returns null for non-fraction", () => {
    expect(parseFraction("abc")).toBeNull();
  });
});
