const DONE = { done: true };

const toMsMapper = x => Math.floor(x * 1e3);

class Iterator {
  constructor(next) {
    this.next = next;
  }

  [Symbol.iterator]() {
    return this;
  }

  // add a percentage of noise
  addNoise(factor = 0.1) {
    return this.map(value => value * (1 + (Math.random() - 0.5) * factor));
  }

  clamp(min, max) {
    return this.map(value => (value < min ? min : value > max ? max : value));
  }

  map(fn) {
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

  take(n) {
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

exports.exponential = (base = 2) => {
  let value = 1;

  return new Iterator(() => {
    value *= base;
    return {
      done: false,
      value,
    };
  });
};

exports.fibonacci = () => {
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

exports.linear = (slope = 1, intercept = 1) => {
  let i = intercept - slope;
  return new Iterator(() => ({
    done: false,
    value: (i += slope),
  }));
};

exports.power = (power = 2) => {
  let i = 1;

  return new Iterator(() => {
    return {
      done: false,
      value: Math.pow(i++, power),
    };
  });
};
