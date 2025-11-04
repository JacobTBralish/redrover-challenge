/**
  Solution to coding challenge
  
  input: "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)"
 
 expected output: 
  - id
  - name
  - email
  - type
    - id
    - name
    - customFields
      - c1
      - c2
      - c3
  - externalId

    and/or:

  - email
  - externalId
  - id
  - name
  - type
    - customFields
      - c1
      - c2
      - c3
    - id
    - name
 */

const INDENT = "  ";
const HYPHEN = "-";
const TEST_CASE =
  "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

const TEST_CASE_2 =
  "(id, (name, email, type(id, name, customFields(c1, c2, c3))), externalId)";

function validateInput(input: string): boolean {
  if (!input) return false;
  if (typeof input !== "string") return false;
  if (input.length === 0) return false;
  if (!input.includes("(") || !input.includes(")")) return false;
  if (input[0] !== "(") return false;
  return true;
}

function validateParenthesis(input: string): boolean {
  let openParenthesis = 0;
  let closeParenthesis = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") openParenthesis++;
    if (input[i] === ")") closeParenthesis++;
  }

  return openParenthesis === closeParenthesis && openParenthesis > 0;
}

function formatSection(string: string, indentLayer: number): string {
  return `${INDENT.repeat(indentLayer)}${HYPHEN} ${string}\n`;
}

function solve(input: string): string {
  if (!validateInput(input))
    throw new Error("Invalid input. Your input is not a valid string.");
  if (!validateParenthesis(input))
    throw new Error("Invalid input. Your input is not balanced.");

  let indentLayer = 0;
  let output = "";
  let inputAsArray = input.split(", ");

  for (let i = 0; i < inputAsArray.length; i++) {
    const currentItem = inputAsArray[i];

    if (currentItem.startsWith("(")) {
      if (i !== 0) {
        indentLayer++;
      }

      output += formatSection(
        currentItem.substring(1, currentItem.length),
        indentLayer
      );
    } else if (currentItem.includes("(")) {
      const [firstPart, secondPart] = currentItem.split("(");

      output += formatSection(firstPart, indentLayer);
      indentLayer++;
      output += formatSection(
        secondPart.substring(0, secondPart.length),
        indentLayer
      );
    } else if (currentItem.endsWith(")")) {
      const closingParenthesis = currentItem.split(")").length - 1;

      output += formatSection(
        currentItem.substring(0, currentItem.length - closingParenthesis),
        indentLayer
      );
      indentLayer -= closingParenthesis;
    } else if (!currentItem.includes("(") || !currentItem.includes(")")) {
      output += formatSection(currentItem, indentLayer);
    }
  }

  return output;
}

if (require.main === module) {
  const result = solve(TEST_CASE_2);
  console.log("Result:", `\n${result}`);
}

export { solve };
