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

export function map(fn, maybe) {
  return isJust(maybe) ? Just(fn(maybe.value)) : maybe
}

export function chain(fn, maybe) {
  return isJust(maybe) ? fn(maybe.value) : maybe
}

export const flatMap = chain

export function ap(maybe, fn) {
  return isJust(maybe) && isJust(fn) ? map(fn.value, maybe) : Nothing()
}

export function get(maybe) {
  if (isJust(maybe)) {
    return maybe.value
  }
  throw new TypeError('Can not extract the value of a Nothing')
}

export function getOrElse(fn, maybe) {
  if (isJust(maybe)) {
    return maybe.value
  }
  return fn()
}

export function isJust(maybe) {
  return maybe.type === JUST
}

export function isNothing(maybe) {
  return maybe.type === NOTHING
}
