import { PropOptions } from 'vue'

export const oneOf = (keys: string[]): PropOptions['validator'] => {
  return value => {
    return keys.indexOf(value) !== -1
  }
}

export const pluck = <T extends object, K extends keyof T>(data: T[], key: K): T[K][] => data.map(item => item[key])
