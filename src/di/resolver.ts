import { DependencyContainer, InjectionToken } from 'tsyringe'
import { constructor } from 'tsyringe/dist/typings/types'
import { RegistryType } from './registry'

type ResolvedType<T extends InjectionToken> = T extends keyof RegistryType ? (RegistryType[T] extends { provider: infer Provider } ? (Provider extends { useValue: infer _Value } ? _Value : Provider extends { useClass: constructor<infer _Class> } ? _Class : never) : never) : T extends constructor<infer __Class> ? __Class : never

export const createResolver = (container: DependencyContainer) => <T extends keyof RegistryType | any = any, Token extends InjectionToken = InjectionToken<T>>(token: Token): ResolvedType<Token> => {
  return container.resolve(token)
}
