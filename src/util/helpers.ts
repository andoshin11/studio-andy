import { number } from '@/assets/css/prism.css'
import { PropOptions } from 'vue'

export const oneOf = (keys: string[]): PropOptions['validator'] => {
  return (value) => {
    return keys.indexOf(value) !== -1
  }
}

export const pluck = <T extends object, K extends keyof T>(data: T[], key: K): T[K][] => data.map((item) => item[key])

export const sortBy = <T extends object>(key: keyof T) => (a: T, b: T) => {
  const keyOfA = a[key]
  const keyofB = b[key]

  return keyOfA === keyofB ? 0 : keyOfA > keyofB ? 1 : -1
}
