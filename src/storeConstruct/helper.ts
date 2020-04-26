export const createRootTypes = <T extends object>(namespace: string, localTypes: T): { [key in keyof T]: string } => {
  return Object.entries(localTypes).reduce(
    (acc, ac) => {
      const [key, val] = ac
      acc[key as keyof T] = `${namespace}/${val}`
      return acc
    },
    {} as { [key in keyof T]: string }
  )
}
