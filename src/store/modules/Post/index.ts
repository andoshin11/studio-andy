import { Module } from 'vuex'
import { RootState } from '@/store'
import { mutations } from '@/store/modules/Post/mutations'
import { IPostState, initialState } from '@/store/modules/Post/state'

export * from '@/store/modules/Post/state'

export const store: Module<IPostState, RootState> = {
  state: initialState,
  mutations
}
