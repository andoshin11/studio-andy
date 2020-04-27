import { unique } from './util'

describe('util', () => {
  test('unique', () => {
    expect(unique([1, 2, 3, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })
})
