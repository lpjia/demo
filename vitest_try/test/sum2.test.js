import { expect, test } from 'vitest'
import { sum } from '../src/calc/sum'

test('@2 adds 10 + 20 to equal 30', () => {
  expect(sum(10, 20)).toBe(30)
})