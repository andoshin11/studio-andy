import { MutationTree } from './mutation'

export type TypeSafeModule<S, M extends MutationTree<S>> = {
  namespaced?: boolean | undefined
  state?: S | (() => S) | undefined
  mutations?: M | undefined
}

export function createTypeSafeModule<S, M extends MutationTree<S>>(options: { namespaced?: boolean; state?: S | (() => S); mutations?: M }): TypeSafeModule<S, M> {
  return {
    ...options,
  }
}
