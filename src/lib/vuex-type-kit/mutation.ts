export type Mutation<S> = (state: S, payload?: any) => any

export interface MutationTree<S> {
  [key: string]: Mutation<S>
}
