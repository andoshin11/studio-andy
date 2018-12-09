import { PropOptions } from 'vue'

export const oneOf = (keys: string[]): PropOptions['validator'] => {
  return value => {
    return keys.indexOf(value) !== -1
  }
}
