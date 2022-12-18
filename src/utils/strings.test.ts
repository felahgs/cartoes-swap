import {
  formatCardNumber,
  formatExpirationDate,
  formatToNumberOnly,
  hideCardNumber,
  removeWhiteSpaces,
  toCamelCase,
  toKebabCase,
} from "./strings";

describe("formatCardNumber", () => {
  it("should format a number by adding spaces", () => {
    expect(formatCardNumber("1000200030004000")).toBe("1000 2000 3000 4000");
  });

  it("should remove any letter and add spaces", () => {
    expect(formatCardNumber("a1000n2000c3000d4000")).toBe(
      "1000 2000 3000 4000"
    );
  });
});

describe("formatExpirationDate", () => {
  it("should receive a number on format 121234 and return 12/1234", () => {
    expect(formatExpirationDate("122020")).toBe("12/2020");
  });

  it("should not add the bar when the value is smaller than 3", () => {
    expect(formatExpirationDate("12")).toBe("12");
  });

  it("should return a empty string if no value is passed", () => {
    expect(formatExpirationDate()).toBe("");
  });
});

describe("formatToNumberOnly", () => {
  it("should remove and alpahatic character and return only numbers", () => {
    expect(formatToNumberOnly("abc123d4e5fg/á6")).toBe("123456");
  });
});

describe("hideCardNumber", () => {
  it("should receive a card number and replace every digit but the last 4 for *", () => {
    expect(hideCardNumber("12345678987654")).toBe("**********7654");
  });
});

describe("removeWhiteSpaces", () => {
  it("should remove any removeWhiteSpaces from the sting", () => {
    expect(removeWhiteSpaces("  1 2  3  4")).toBe("1234");
  });
});

describe("toCamelCase", () => {
  it("should convert a string to camelCase", () => {
    expect(toCamelCase("to-camel case")).toBe("toCamelCase");
  });
});

describe("toKebabCase", () => {
  it("should convert a string to toKebabCase", () => {
    expect(toKebabCase("to kebabCase")).toBe("to-kebab-case");
  });
});
