import { ValuesType } from 'utility-types'
import { StoreOptions, Store } from 'vuex'
import { TypeSafeModule } from './module'

export type TypeSafeStoreOptions<S extends object, Modules extends Record<string, TypeSafeModule<ValuesType<S>, any>> = {}, RootLevelState = keyof S extends keyof Modules ? never : Omit<S, keyof Modules>> = Omit<StoreOptions<S>, 'modules' | 'state'> &
  ({} extends S ? never : {} extends Modules ? { state: S | (() => S) } : keyof S extends keyof Modules ? { modules: Modules } : { modules: Modules; state: RootLevelState | (() => RootLevelState) })

export function createTypeSafeStore<S extends object, Modules extends Record<string, TypeSafeModule<ValuesType<S>, any>> = {}>(options: TypeSafeStoreOptions<S, Modules>) {
  return (new Store<S>(options) as any) as TypeSafeStore<S, Modules>
}

export type ParseTypeString<S extends string> = S extends `${infer M}/${infer T}` ? [M, T] : [never, S]

export type PayloadTypeOf<Module extends TypeSafeModule<any, any>, Type extends keyof NonNullable<Module['mutations']>> = NonNullable<Module['mutations']> extends never ? never : Parameters<NonNullable<Module['mutations']>[Type]> extends [any, infer P] ? P : never

export type TypeSafeStore<S extends object, Modules extends Record<string, TypeSafeModule<ValuesType<S>, any>> = {}> = Omit<Store<S>, 'commit'> & {
  commit: <T extends TypeString<S, Modules>>(
    type: T,
    ...args: ParseTypeString<T>[0] extends never
      ? [never] // TBD
      : {} extends Modules
      ? [never]
      : PayloadTypeOf<Modules[ParseTypeString<T>[0]], ParseTypeString<T>[1]> extends never
      ? []
      : [PayloadTypeOf<Modules[ParseTypeString<T>[0]], ParseTypeString<T>[1]>]
  ) => {}
}

export type TypeString<S extends object, Modules extends Record<string, TypeSafeModule<ValuesType<S>, any>> = {}> = {
  [M in keyof Modules]: NonNullable<Modules[M]['mutations']> extends never ? never : `${string & M}/${string & keyof NonNullable<Modules[M]['mutations']>}`
}[keyof Modules]
