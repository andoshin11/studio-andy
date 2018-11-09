import Vue from 'vue'
import Vuex from 'vuex'

// modules
import * as post from '@/store/modules/Post'

Vue.use(Vuex)

export interface RootState {
  post: post.IPostState
}

export default new Vuex.Store<RootState>({
  modules: {
    post: post.store
  }
})
