import { describe, it, expect } from "vitest";
import { solve } from "./solution";
import {
  TEST_CASE_1,
  TEST_CASE_1_SOLUTION,
  TEST_CASE_1_SOLUTION_SORTED,
  TEST_CASE_2,
  TEST_CASE_2_SOLUTION,
  TEST_CASE_2_SOLUTION_SORTED,
} from "./constants";

describe("solve", () => {
  it("should handle example input 1 successfully", () => {
    expect(solve(TEST_CASE_1)).toBe(TEST_CASE_1_SOLUTION);
  });

  it("should handle example input 2 successfully", () => {
    expect(solve(TEST_CASE_2)).toBe(TEST_CASE_2_SOLUTION);
  });

  it("should handle example input 1 with sort ASC successfully", () => {
    expect(solve(TEST_CASE_1, "ASC")).toBe(TEST_CASE_1_SOLUTION_SORTED);
  });

  it("should handle example input 1 with sort ASC successfully", () => {
    expect(solve(TEST_CASE_2, "ASC")).toBe(TEST_CASE_2_SOLUTION_SORTED);
  });
});
