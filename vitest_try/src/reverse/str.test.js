import { expect, test } from 'vitest'
import { reverseStr } from './str'

test('reverseStr', () => {
  expect(reverseStr('hello')).toBe('olleh')
})