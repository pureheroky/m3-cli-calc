import type { Token } from "./token.js";
export type { Token };

const re =
  /\s*([0-9]+(?:\.[0-9]+)?(?:[+-][0-9]+(?:\.[0-9]+)?i)?|[A-Za-z_][A-Za-z_0-9]*|[-+*/^%]|[(),]|\d+\/\d+)\s*/y;

export function tokenize(input: string): Token[] {
  const out: Token[] = [];
  let i = 0;

  while (i < input.length) {
    re.lastIndex = i;
    const m = re.exec(input);
    const s = m?.[1];
    if (!s) throw new Error(`Unexpected token at ${i}`);
    i = re.lastIndex;

    if (s === "(") out.push({ t: "lp" });
    else if (s === ")") out.push({ t: "rp" });
    else if (s === ",") out.push({ t: "comma" });
    else if (/^[-+*/^%]$/.test(s)) out.push({ t: "op", v: s });
    else if (/^[0-9]/.test(s)) out.push({ t: "num", v: s });
    else out.push({ t: "id", v: s });
  }

  return out;
}
