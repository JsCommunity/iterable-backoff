/* eslint-env jest */

const { exponential, fibonacci, linear, power } = require("./");

// ===================================================================

const testIterable = (iterable, values) => {
  let iterator;
  if (
    iterable == null ||
    typeof iterable[Symbol.iterator] !== "function" ||
    typeof (iterator = iterable[Symbol.iterator]()).next !== "function"
  ) {
    throw new TypeError("is not iterable");
  }

  for (const value of values) {
    const cursor = iterator.next();
    if (cursor.done) {
      throw new Error("unexpected end of iterable");
    }
    expect(cursor.value).toBe(value);
  }
};

// ===================================================================

describe("exponential()", () => {
  it("returns an iterable", () => {
    testIterable(exponential(), [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);
  });
});

describe("fibonacci()", () => {
  it("returns an iterable", () => {
    testIterable(fibonacci(), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe("linear()", () => {
  it("returns an iterable", () => {
    testIterable(linear(0.5, 2), [2, 2.5, 3, 3.5, 4, 4.5]);
  });
});

describe("power()", () => {
  it("returns an iterable", () => {
    testIterable(power(), [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });
});
