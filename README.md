TypeScript CLI Calculator (tcalc)


Features

Basic arithmetic
Supports the main math operators:
+  -  *  /  ^  %
Example: 
tcalc eval "(1+2)*3"

Numeric types
The calculator can work with several number formats:
Real numbers (example: 3.14, -5, 10)
BigInt numbers (example: 1000000000000n)
Fractions (example: 3/4)
Complex numbers (example: 2+3i)
Example:
tcalc eval "(2+3i)*(1-2i)"

Scientific functions
The calculator includes a few common functions:
sin(x)
cos(x)
sqrt(x)
Examples:
tcalc eval "sin(1)"
tcalc eval "sqrt(9) + cos(0)"

Commands

tcalc eval "<expression>" - Evaluates a mathematical expression.
Examples:
tcalc eval "(1+2)*3 - 4/5 + 2+3i"
tcalc eval "2^10"
tcalc eval "1/2 + 3/4"
tcalc eval "10n + 20n"

tcalc add <values...> - Adds several numbers together.
Examples:
tcalc add 1 2 3/4 10n

How to install and run

git clone https://github.com/yourusername/m3-advanced-typescript-cli.git
cd m3-advanced-typescript-cli
npm i
npm build
npm link

Run examples:
tcalc eval "(1+2)*3"
tcalc eval "1/2 + 3/4"
tcalc eval "(2+3i)*(1-2i)"


Structure:
src/
  cli/         - command-line interface and command definitions
  core/        - main logic: numeric types, evaluator, registry
  parse/       - tokenizer and expression parser
  plugins/     - arithmetic and scientific operations
  util/        - output formtting

