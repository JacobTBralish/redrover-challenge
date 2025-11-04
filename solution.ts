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

import { pathToFileURL } from "url";
import { HYPHEN, INDENT, TEST_CASE_1 } from "./constants.ts";

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
  console.log(input);

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

  return output.trim();
}

function prepInput(input: string) {
  const inputLines = input
    .split("\n")
    .map((l) => l)
    .filter((l) => l.trim().startsWith("-"));

  return inputLines.map((line) =>
    line.replace(/^([ \t]*)-\s+/gm, "$1").split(INDENT)
  );
}

function countEmpty(stringArray: string[]) {
  let i = 0;
  while (i < stringArray.length && stringArray[i] === "") i++;
  return i;
}

function sort(input: string, sortDirection: "ASC" | "DESC" = "ASC") {
  const direction = sortDirection === "ASC" ? 1 : -1;

  const arrays = prepInput(input);

  arrays.sort((a, b) => {
    const indentCountA = countEmpty(a);
    const indentCountB = countEmpty(b);

    if (indentCountA !== indentCountB)
      return (indentCountA - indentCountB) * direction;

    const aKey = a.slice(indentCountA).join(".");
    const bKey = b.slice(indentCountB).join(".");
    return aKey.localeCompare(bKey) * direction;
  });

  const output = arrays
    .map((array) => {
      const indentDepth = countEmpty(array);
      const name = array[indentDepth] ?? "";
      return `${INDENT.repeat(indentDepth)}${HYPHEN} ${name}`;
    })
    .join("\n");

  console.log(output);
}

const isDirectRun =
  (typeof require !== "undefined" && require.main === module) ||
  (typeof import.meta !== "undefined" &&
    import.meta.url === pathToFileURL(process.argv[1]).href);

if (isDirectRun) {
  const result1 = solve(TEST_CASE_1);
  const result = sort(result1);
  console.log("Result:", `\n${result}`);
  // const result = solve(TEST_CASE_1);
  // console.log("Result:", `\n${result}`);
}

export { solve };
