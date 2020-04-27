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
