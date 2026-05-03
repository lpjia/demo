import * as stringUtils from "../src/string";

describe("string utils", () => {
  it("capitalize: 首字母大写", () => {
    expect(stringUtils.capitalize("hello")).toBe("Hello");
    expect(stringUtils.capitalize("world")).toBe("World");
    expect(stringUtils.capitalize("a")).toBe("A");
    expect(stringUtils.capitalize("")).toBe("");
  });

  it("trim: 去除首尾空格", () => {
    expect(stringUtils.trim("  hello  ")).toBe("hello");
    expect(stringUtils.trim("world")).toBe("world");
    expect(stringUtils.trim("  ")).toBe("");
    expect(stringUtils.trim(" a b ")).toBe("a b");
  });
});
