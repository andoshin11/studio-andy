import { PropOptions } from 'vue'

export const oneOf = (keys: string[]): PropOptions['validator'] => {
  return value => {
    return keys.indexOf(value) !== -1
  }
}

export const bp = {
  sm: '@media (max-width: 768px)'
}
