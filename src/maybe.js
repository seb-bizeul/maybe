import deepEqual from 'fast-deep-equal'
import { curry } from 'ramda'

const JUST = 'Just'
const NOTHING = 'Nothing'

export function Just(value) {
  return { type: JUST, value }
}

export function Nothing() {
  return { type: NOTHING }
}

export function of(value) {
  return Just(value)
}

export function fromNullable(value) {
  return value != null ? Just(value) : Nothing()
}

export const map = curry((fn, maybe) => {
  return isJust(maybe) ? Just(fn(maybe.value)) : maybe
})

export const chain = curry((fn, maybe) => {
  return isJust(maybe) ? fn(maybe.value) : maybe
})

export const flatMap = chain

export const ap = curry((maybe, fn) => {
  return isJust(fn) ? map(fn.value, maybe) : Nothing()
})

export function get(maybe) {
  if (isJust(maybe)) {
    return maybe.value
  }
  throw new TypeError('Can not extract the value of a Nothing')
}

export const getOrElse = curry((fn, maybe) => {
  if (isJust(maybe)) {
    return maybe.value
  }
  return fn()
})

export const equals = curry((maybe1, maybe2) => {
  if (isJust(maybe1) && isJust(maybe2)) {
    return maybe1.value === maybe2.value || deepEqual(maybe1.value, maybe2.value)
  }
  else if (isNothing(maybe1) && isNothing(maybe2)) {
    return true
  }
  return false
})

export function isJust(maybe) {
  return maybe.type === JUST
}

export function isNothing(maybe) {
  return maybe.type === NOTHING
}
