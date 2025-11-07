import { describe, it, expect } from "vitest";
import { ok, err, map, flatMap } from "../src/core/result.js";

describe("result (smoke)", () => {
  it("creates ok and err", () => {
    const r1 = ok(42);
    const r2 = err("fail");
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(false);
  });

  it("map works only on ok", () => {
    const r1 = map(ok(2), (x) => x * 3);
    const r2 = map(err("fail"), (x: number) => x * 3);

    expect(r1).toMatchObject({ ok: true, value: 6 });
    expect(r2).toMatchObject({ ok: false, error: "fail" });
  });

  it("flatMap chains ok", () => {
    const r = flatMap(ok(2), (x) => ok(x + 5));
    expect(r).toMatchObject({ ok: true, value: 7 });
  });
});
