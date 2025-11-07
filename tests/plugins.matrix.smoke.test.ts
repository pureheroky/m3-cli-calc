import { describe, it, expect } from "vitest";
import { Matrix } from "../src/plugins/matrix/matrix.js";
import { R } from "../src/core/numeric.js";

describe("matrix (smoke)", () => {
  it("stores and maps values", () => {
    const m = new Matrix(2, 2, [R(1), R(2), R(3), R(4)]);

    const v = m.get(1, 1);
    if (v.kind !== "real") {
      throw new Error("expected real at (1,1)");
    }
    expect(v.value).toBe(4);

    const doubled = m.map((x) => {
      if (x.kind !== "real") throw new Error("expected real in map");
      return R(x.value * 2);
    });

    const dv = doubled.get(0, 1);
    if (dv.kind !== "real") {
      throw new Error("expected real in doubled matrix");
    }
    expect(dv.value).toBe(4);
  });

  it("throws on size mismatch", () => {
    expect(() => new Matrix(2, 2, [R(1)])).toThrow(/size mismatch/);
  });

  it("throws on out-of-range", () => {
    const m = new Matrix(1, 1, [R(1)]);
    expect(() => m.get(1, 0)).toThrow(/index out of range/);
  });
});
