import Vuex from 'vuex'

// modules
import * as post from '@/store/modules/Post'

export interface RootState {
  post: post.IPostState
}

export default () =>
  new Vuex.Store<RootState>({
    modules: {
      post: post.store
    }
  })
