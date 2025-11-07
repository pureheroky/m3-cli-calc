#!/usr/bin/env node
import { Command } from "commander";
import { parseExpr } from "../parse/index.js";
import { evaluate, Registry, R, B } from "../core/index.js";
import {
  installArithmetic,
  installScientific,
  parseFraction,
  parseComplex,
} from "../plugins/index.js";
import { format } from "../util/format.js";

const program = new Command();
program
  .name("tcalc")
  .description("TypeScript-powered CLI calculator")
  .version("1.0.0");

const reg = new Registry();
installArithmetic(reg);
installScientific(reg);

function coerceLiteral(s: string) {
  return (
    parseFraction(s) ??
    parseComplex(s) ??
    (s.endsWith("n") ? B(BigInt(s.slice(0, -1))) : R(Number(s)))
  );
}

program
  .command("eval")
  .description('Evaluate expression: tcalc eval "(1+2)*3 - 4/5 + 2+3i"')
  .argument("<expr...>", "expression to evaluate")
  .action((exprParts: string[]) => {
    const exprStr = exprParts.join(" ");

    try {
      const ast = parseExpr(exprStr);
      const value = evaluate(ast, reg);
      console.log(format(value));
    } catch (e) {
      console.error("❌ error:", (e as Error).message);
      process.exit(1);
    }
  });

program
  .command("add")
  .description("Add numbers: tcalc add 1 2 3/4 10n")
  .argument("<values...>")
  .action((vals: string[]) => {
    const nums = vals.map(coerceLiteral);
    const toNumber = (x: any) => {
      if (x.kind === "fraction") return Number(x.num) / Number(x.den);
      if (x.kind === "big") return Number(x.value);
      if (x.kind === "complex") return x.re;
      if (x.kind === "real") return x.value;
      return 0;
    };

    const sum = nums.reduce((acc, n) => acc + toNumber(n), 0);
    console.log(sum);
  });

program.parse();
