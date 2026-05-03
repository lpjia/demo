import * as math from "../src/math";

describe("math utils", () => {
  it("add: 1 + 2 = 3", () => {
    expect(math.sum(1, 2)).toBe(3);
  });

  it("subtract: 5 - 2 = 3", () => {
    expect(math.subtract(5, 2)).toBe(3);
  });

  it("multiply: 2 * 3 = 6", () => {
    expect(math.multiply(2, 3)).toBe(6);
  });
});
