import { describe, it, expect } from "vitest";
import { solve } from "./solution";
import { TEST_CASE_1, TEST_CASE_1_SOLUTION } from "./constants";

describe("solve", () => {
  it("should handle example input 1 successfully", () => {
    expect(solve(TEST_CASE_1)).toBe(TEST_CASE_1_SOLUTION);
  });
});
