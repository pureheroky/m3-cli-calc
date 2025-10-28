import type { Numeric } from "../core/numeric.js";

export class Matrix<T extends Numeric> {
  readonly rows: number;
  readonly cols: number;
  readonly data: readonly T[];
  constructor(rows: number, cols: number, data: readonly T[]) {
    if (rows * cols !== data.length) throw new Error("size mismatch");
    this.rows = rows;
    this.cols = cols;
    this.data = data;
  }
  get(r: number, c: number): T {
    const val = this.data[r * this.cols + c];
    if (val === undefined) throw new Error("index out of range");
    return val;
  }
  map<U extends Numeric>(f: (x: T, r: number, c: number) => U): Matrix<U> {
    const out: U[] = [];
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++) out.push(f(this.get(r, c), r, c));
    return new Matrix<U>(this.rows, this.cols, out);
  }
}
