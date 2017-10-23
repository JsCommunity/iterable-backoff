// @flow

export const symbolIterator = (typeof Symbol !== 'undefined' && Symbol.iterator) || '@@iterator'

type Result =
  {| done: false, value: number |} |
  {| done: true |}
type Next = () => Result

const DONE: Result = { done: true }

class Iterator {
  next: Next

  constructor (next: Next) {
    this.next = next
  }

  [symbolIterator] () {
    return this
  }

  // add a percentage of noise
  addNoise (factor: number = 0.1) {
    return this.map(value =>
      value * (1 + (Math.random() - 0.5) * factor)
    )
  }

  clamp (min: number, max: number) {
    return this.map(value =>
      value < min ? min : value > max ? max : value
    )
  }

  map (fn: number => number) {
    return new Iterator(() => {
      const cursor = this.next()
      if (cursor.done) {
        return cursor
      }
      return {
        done: false,
        value: fn(cursor.value)
      }
    })
  }

  take (n: number) {
    return new Iterator(() => {
      if (n < 1) {
        return DONE
      }
      --n
      return this.next()
    })
  }

  // converts to miliseconds (ie * 1e3)
  toMs () {
    return this.map(x => Math.floor(x * 1e3))
  }
}

export const exponential = (base: number = 2) => {
  let curr = base

  return new Iterator(() => {
    const value = curr
    curr *= base
    return {
      done: false,
      value
    }
  })
}

export const fibonacci = () => {
  let curr = 1
  let next = 1

  return new Iterator(() => {
    const value = curr
    curr = next
    next += value

    return {
      done: false,
      value
    }
  })
}

export const power = (power: number = 2) => {
  let i = 1

  return new Iterator(() => {
    return {
      done: false,
      value: i++ ** power
    }
  })
}
