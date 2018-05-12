// @flow
import test from 'tape'
import * as Maybe from '../src/maybe'

test('Just returns a new Just', t => {
  t.deepEqual(Maybe.Just(5), { type: 'Just', value: 5 })
  t.end()
})

test('Nothing returns a new Nothing', t => {
  t.deepEqual(Maybe.Nothing(), { type: 'Nothing' })
  t.end()
})

test('of returns a new Just', t => {
  t.deepEqual(Maybe.of('test'), { type: 'Just', value: 'test' })
  t.end()
})

test('fromNullable returns a new Just if value is not null or undefined', t => {
  t.deepEqual(Maybe.fromNullable(10), { type: 'Just', value: 10 })
  t.end()
})

test('fromNullable returns a new Nothing if value is null or undefined', t => {
  t.deepEqual(Maybe.fromNullable(null), { type: 'Nothing' })
  t.deepEqual(Maybe.fromNullable(undefined), { type: 'Nothing' })
  t.end()
})

test('Maybe type is a functor', t => {
  const value = 11
  t.deepEqual(
    Maybe.map(x => x * 2, Maybe.Just(value)),
    { type: 'Just', value: value * 2 }
  )
  t.end()
})

test('map can return Nothing', t => {
  t.deepEqual(Maybe.map(x => x * 2, Maybe.Nothing()), { type: 'Nothing' })
  t.end()
})

test('Maybe type can be chained', t => {
  const value = 17
  t.deepEqual(
    Maybe.chain(x => Maybe.Just(x * 2), Maybe.Just(value)),
    { type: 'Just', value: value * 2 }
  )
  t.end()
})

test('Maybe type is applicative', t => {
  const value = 17
  t.deepEqual(
    Maybe.ap(Maybe.Just(value), Maybe.Just(x => x * 2)),
    { type: 'Just', value: value * 2 }
  )
  t.end()
})

test('get unwrapped the value', t => {
  t.deepEqual(Maybe.get(Maybe.Just('unsafe')), 'unsafe')
  t.end()
})

test('get throw a TypeError if value is a Nothing type', t => {
  t.throws((() => Maybe.get(Maybe.Nothing())))
  t.end()
})

test('getOrElse unwrapped the value', t => {
  t.deepEqual(Maybe.getOrElse(() => 'never called', Maybe.Just('safe')), 'safe')
  t.end()
})

test('getOrElse returns the provided default value', t => {
  t.deepEqual(Maybe.getOrElse(() => 'default', Maybe.Nothing()), 'default')
  t.end()
})

test('isJust returns true if maybe is Just', t => {
  t.deepEqual(Maybe.isJust(Maybe.Just('true')), true)
  t.end()
})

test('isJust returns false if maybe is Nothing', t => {
  t.deepEqual(Maybe.isJust(Maybe.Nothing()), false)
  t.end()
})

test('isNothing returns true if maybe is Nothing', t => {
  t.deepEqual(Maybe.isNothing(Maybe.Nothing()), true)
  t.end()
})

test('isNothing returns false if maybe is Just', t => {
  t.deepEqual(Maybe.isNothing(Maybe.Just('false')), false)
  t.end()
})
