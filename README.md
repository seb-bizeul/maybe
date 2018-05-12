# Maybe
Maybe type to use with Flow

## Install
  ```
  yarn add @sbizeul/maybe
  ```
  or
  ```
  npm i @sbizeul/maybe
  ```

## Usage
  ````js
  import * as Maybe from '@sbizeul/maybe'
  
  const add = x => x * 2
  
  const maybe = Maybe.Just(5)
  const result = Maybe.map(add, maybe)
  ````
