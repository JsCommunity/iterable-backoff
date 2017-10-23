/* eslint-env jest */

import {
  exponential,
  fibonacci,
  power,
  symbolIterator
} from './'

// ===================================================================

const testIterable = (iterable, values) => {
  let iterator
  if (
    iterable == null ||
    typeof iterable[symbolIterator] !== 'function' ||
    typeof (iterator = iterable[symbolIterator]()).next !== 'function'
  ) {
    throw new TypeError('is not iterable')
  }

  for (const value of values) {
    const cursor = iterator.next()
    if (cursor.done) {
      throw new Error('unexpected end of iterable')
    }
    expect(cursor.value).toBe(value)
  }
}

// ===================================================================

describe('exponential()', () => {
  it('returns an iterable', () => {
    testIterable(
      exponential(),
      [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ]
    )
  })
})

describe('fibonacci()', () => {
  it('returns an iterable', () => {
    testIterable(
      fibonacci(),
      [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
    )
  })
})

describe('power()', () => {
  it('returns an iterable', () => {
    testIterable(
      power(),
      [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
    )
  })
})
