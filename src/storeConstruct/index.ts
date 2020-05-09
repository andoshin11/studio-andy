import Vuex from 'vuex'

import * as post from './modules/post'

export interface RootState {
  post: post.IPostState
}

export const createStore = () =>
  new Vuex.Store<RootState>({
    modules: {
      post: post.module
    }
  })

export const createStoreFromState = (state: RootState) => {
  const store = createStore()
  store.replaceState(state)
  return store
}
