import { PropOptions } from 'vue'

export const oneOf = (keys: string[]): PropOptions['validator'] => {
  return value => {
    return keys.indexOf(value) !== -1
  }
}

export const bp = {
  pc: '@media screen and (min-width: 769px)',
  sm: '@media screen and (max-width: 768px)'
}
