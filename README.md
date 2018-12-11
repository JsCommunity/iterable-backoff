# iterable-backoff [![Build Status](https://travis-ci.org/JsCommunity/iterable-backoff.png?branch=master)](https://travis-ci.org/JsCommunity/iterable-backoff)

> Backoff generators usable as simple iterables

## Install

Installation of the [npm package](https://npmjs.org/package/iterable-backoff):

```
> yarn add iterable-backoff

# Or

> npm install --save iterable-backoff
```

## Usage

```js
import { fibonacci } from "iterable-backoff";

async function fetch(url) {
  for (const delay of fibonacci()
    .toMs()
    .take(5)) {
    try {
      return await got(url); // or any promise-returning HTTP lib
    } catch (error) {
      console.warn(error);
      await Bluebird.delay(delay); // or any promise-returning timer
    }
  }

  throw new Error("too many tries");
}
```

### Generators

#### `linear(slope = 1, intersect = 1)`

[Linear function](<https://en.wikipedia.org/wiki/Linear_function_(calculus)>)

#### `power(power = 2)`

[Power sequence](https://en.wikipedia.org/wiki/Power_function)

#### `fibonacci()`

[Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number)

#### `exponential(base = 2)`

[Exponential sequence](https://en.wikipedia.org/wiki/Exponential_function)

### Methods

#### `addNoise(factor = 0.1)`

Add a noise to the sequence, proportional to the value (default is
10%).

Particularly useful when the backoff is used to wait access for a
shared resource and you don't want multiple consumer retrying at the
same time.

```js
for (const delay of power().addNoise()) {
  // ...
}
```

#### `clamp(min, max)`

Clamps the value within inclusive `min` and `max` bounds.

```js
for (const delay of exponential().clamp(null, 10)) {
  // ...
}
```

#### `map(fn)`

Applies a custom function to each value of the sequence.

Clamps the value within inclusive `min` and `max` bounds.

```js
for (const delay of fibonacci().map(x => x / 2)) {
  // ...
}
```

#### `take(n)`

Limits the sequence to at most `n` values.

You usually want to use this if you do not want to keep retrying for
ever.

```js
for (const delay of power().take(10)) {
  // ...
}
```

#### `toMs()`

Converts the sequence's values to milliseconds (from seconds).

```js
for (const delay of exponential(3)
  .take(10)
  .toMs()) {
  // ...
}
```

## Development

```
# Install dependencies
> npm ci

# Run the tests
> npm test

# Continuously compile
> npm run dev

# Continuously run the tests
> npm run dev-test

# Build for production (automatically called by npm install)
> npm run build
```

## Contributions

Contributions are _very_ welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/JsCommunity/iterable-backoff/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
