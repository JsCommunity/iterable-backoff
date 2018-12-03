// @flow

export const symbolIterator =
  (typeof Symbol !== "undefined" && Symbol.iterator) || "@@iterator";

type Result = {| done: false, value: number |} | {| done: true |};
type Next = () => Result;

const DONE: Result = { done: true };

const toMsMapper = x => Math.floor(x * 1e3);

class Iterator {
  next: Next;

  constructor(next: Next) {
    this.next = next;
  }

  // $FlowFixMe https://github.com/facebook/flow/issues/2286
  [symbolIterator]() {
    return this;
  }

  // add a percentage of noise
  addNoise(factor: number = 0.1) {
    return this.map(value => value * (1 + (Math.random() - 0.5) * factor));
  }

  clamp(min: number, max: number) {
    return this.map(value => (value < min ? min : value > max ? max : value));
  }

  map(fn: number => number) {
    return new Iterator(() => {
      const cursor = this.next();
      if (cursor.done) {
        return cursor;
      }
      return {
        done: false,
        value: fn(cursor.value),
      };
    });
  }

  take(n: number) {
    let i = 0;
    return new Iterator(() => {
      if (i < n) {
        ++i;
        return this.next();
      }
      return DONE;
    });
  }

  // converts to milliseconds (ie * 1e3)
  toMs() {
    return this.map(toMsMapper);
  }
}

export const exponential = (base: number = 2) => {
  let value = 1;

  return new Iterator(() => {
    value *= base;
    return {
      done: false,
      value,
    };
  });
};

export const fibonacci = () => {
  let curr = 1;
  let next = 1;

  return new Iterator(() => {
    const value = curr;
    curr = next;
    next += value;

    return {
      done: false,
      value,
    };
  });
};

export const power = (power: number = 2) => {
  let i = 1;

  return new Iterator(() => {
    return {
      done: false,
      value: (i++) ** power,
    };
  });
};
