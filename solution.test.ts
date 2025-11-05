import { describe, it, expect } from "vitest";
import { solve } from "./solution";
import {
  ASC,
  DESC,
  TEST_CASE_1,
  TEST_CASE_1_SOLUTION,
  TEST_CASE_1_SOLUTION_SORTED_ASC,
  TEST_CASE_1_SOLUTION_SORTED_DESC,
  TEST_CASE_2,
  TEST_CASE_2_SOLUTION,
  TEST_CASE_2_SOLUTION_SORTED_ASC,
  TEST_CASE_2_SOLUTION_SORTED_DESC,
  TEST_CASE_3,
  TEST_CASE_3_NESTED_PARENTHESIS,
  TEST_CASE_3_SOLUTION,
  TEST_CASE_3_SOLUTION_SORTED_ASC,
  TEST_CASE_3_SOLUTION_SORTED_DESC,
} from "./constants";

describe("solve", () => {
  it("should handle example input 1 successfully", () => {
    expect(solve(TEST_CASE_1)).toBe(TEST_CASE_1_SOLUTION);
  });

  it("should handle example input 2 successfully", () => {
    expect(solve(TEST_CASE_2)).toBe(TEST_CASE_2_SOLUTION);
  });

  it("should handle example input 3 successfully", () => {
    expect(solve(TEST_CASE_3)).toBe(TEST_CASE_3_SOLUTION);
  });

  it("should handle example input 3 with nested parenthesis successfully", () => {
    expect(solve(TEST_CASE_3_NESTED_PARENTHESIS)).toBe(TEST_CASE_3_SOLUTION);
  });

  it("should handle example input 1 with sort ASC successfully", () => {
    expect(solve(TEST_CASE_1, ASC)).toBe(TEST_CASE_1_SOLUTION_SORTED_ASC);
  });

  it("should handle example input 1 with sort DESC successfully", () => {
    expect(solve(TEST_CASE_1, DESC)).toBe(TEST_CASE_1_SOLUTION_SORTED_DESC);
  });

  it("should handle example input 2 with sort ASC successfully", () => {
    expect(solve(TEST_CASE_2, ASC)).toBe(TEST_CASE_2_SOLUTION_SORTED_ASC);
  });

  it("should handle example input 2 with sort DESC successfully", () => {
    expect(solve(TEST_CASE_2, DESC)).toBe(TEST_CASE_2_SOLUTION_SORTED_DESC);
  });

  it("should handle example input 3 with sort ASC successfully", () => {
    expect(solve(TEST_CASE_3, ASC)).toBe(TEST_CASE_3_SOLUTION_SORTED_ASC);
  });

  it("should handle example input 3 with sort DESC successfully", () => {
    expect(solve(TEST_CASE_3, DESC)).toBe(TEST_CASE_3_SOLUTION_SORTED_DESC);
  });
});
