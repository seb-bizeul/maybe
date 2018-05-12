// @flow
import * as Maybe from './lib/maybe'

const x = Maybe.Just(5)
const y = Maybe.Just(6)
const f = Maybe.fromNullable('foo')
Maybe.map(x => x.concat('f'), f)
const z = Maybe.flatMap(x => Maybe.Just(x * 2), x)
