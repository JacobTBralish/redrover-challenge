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
import { HYPHEN, INDENT, TEST_CASE_1, ASC, DESC } from "./constants.ts";

type sortDirection = typeof ASC | typeof DESC;

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

function solve(input: string, sortDirection?: sortDirection | null): string {
  if (!validateInput(input))
    throw new Error("Invalid input. Your input is not a valid string.");
  if (!validateParenthesis(input))
    throw new Error("Invalid input. Your input is not balanced.");

  if (input.includes("()")) {
    // remnove empty parenthesis and left over commas
    input = input
      .replace(/\(\s*\)/g, "")
      .replace(/,\s*,/g, ",")
      .replace(/,\s*\)/g, ")")
      .replace(/\(\s*,/g, "(");
  }

  if (sortDirection) {
    input = sort(input, sortDirection);
  }

  let indentLayer: number = 0;
  let output: string = "";
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

  return output.trim();
}

function recursiveSort(
  arrays: string[],
  direction: sortDirection = ASC
): any[] {
  const sorted = arrays.map((array) => {
    return Array.isArray(array) ? recursiveSort(array, direction) : array;
  });

  const grouped = [];

  for (let i = 0; i < sorted.length; i++) {
    const value = sorted[i];
    if (Array.isArray(value)) continue;

    if (i + 1 < sorted.length && Array.isArray(sorted[i + 1])) {
      grouped.push([value, sorted[i + 1]]);
      i++;
    } else {
      grouped.push([value]);
    }
  }

  grouped.sort((a, b) => {
    const sortStringA = String(a[0]);
    const sortStringB = String(b[0]);
    const comparison = sortStringA.localeCompare(sortStringB);
    return direction === ASC ? comparison : -comparison;
  });

  const output: any[] = [];

  grouped.forEach((group) => {
    output.push(group[0]);
    if (group.length > 1) {
      output.push(group[1]);
    }
  });

  return output;
}

function arrayToString(array: string[]): string {
  const arrayParts = array.map((element) => {
    return Array.isArray(element) ? arrayToString(element) : element;
  });

  return `(${arrayParts.join(", ")})`;
}

function sort(input: string, direction: sortDirection) {
  const jsonString = input
    .replace(/\(/g, "[")
    .replace(/\)/g, "]")
    .replace(/([a-zA-Z0-9_]+)/g, '"$1"')
    .replace(/"\[/g, '",[');

  const jsonParsed = JSON.parse(jsonString);

  const sorted = recursiveSort(jsonParsed, direction);

  return arrayToString(sorted);
}

const isDirectRun =
  (typeof require !== "undefined" && require.main === module) ||
  (typeof import.meta !== "undefined" &&
    import.meta.url === pathToFileURL(process.argv[1]).href);

if (isDirectRun) {
  const result = solve(TEST_CASE_1, "DESC");
  console.log("Result:", `\n${result}`);
}

export { solve };
