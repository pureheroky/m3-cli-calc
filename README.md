# TypeScript CLI Calculator (tcalc)


## Features

### Basic arithmetic
Supports the main math operators:
**+** (addition), **-** (subtraction), **\*** (multiplication), **/** (division), **^** (exponentiation), **%** (modulo).
**Example**: 
tcalc eval "(1+2)*3"

### Numeric types
The calculator can work with several number formats:
Real numbers (example: 3.14, -5, 10)
BigInt numbers (example: 1000000000000n)
Fractions (example: 3/4)
Complex numbers (example: 2+3i)
**Example**:
tcalc eval "(2+3i)*(1-2i)"

### Scientific functions
The calculator includes a few common functions:
sin(x)
cos(x)
sqrt(x)
**Examples**:
tcalc eval "sin(1)"
tcalc eval "sqrt(9) + cos(0)"

## Commands

tcalc eval "<expression>" - Evaluates a mathematical expression.
**Examples**:
tcalc eval "(1+2)*3 - 4/5 + 2+3i"
tcalc eval "2^10"
tcalc eval "1/2 + 3/4"
tcalc eval "10n + 20n"

tcalc add <values...> - Adds several numbers together.
**Examples**:
tcalc add 1 2 3/4 10n

### How to install and run

1. Clone the repository:
git clone https://github.com/yourusername/m3-advanced-typescript-cli.git
2. Navigate to the project directory:
cd m3-advanced-typescript-cli
3. Install dependencies:
npm i
4. Build the project:
npm build
5. Link the CLI globally:
npm link

**Run examples:**
tcalc eval "(1+2)*3"
tcalc eval "1/2 + 3/4"
tcalc eval "(2+3i)*(1-2i)"


## Structure:
src/
├── cli/         # Command-line interface and command definitions
├── core/        # Main logic: numeric types, evaluator, registry
├── parse/       # Tokenizer and expression parser
├── plugins/     # Arithmetic and scientific operations
└── util/        # Output formatting
