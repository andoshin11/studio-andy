import { createTypeSafeStore, TypeSafeStore } from '@/lib/vuex-type-kit'

import * as post from './modules/post'

export interface RootState {
  post: post.PostState
}

const modules = {
  post: post.module,
}

export const createStore = () =>
  createTypeSafeStore<RootState, typeof modules>({
    modules,
  })

export type Store = TypeSafeStore<RootState, typeof modules>
