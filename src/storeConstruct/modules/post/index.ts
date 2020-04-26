import { Module } from 'vuex'
import { RootState } from '@/storeConstruct'
import { IPostState, initialState } from './state'
import { mutations } from './mutations'

export * from './state'
export * from './mutations'

export const module: Module<IPostState, RootState> = {
  namespaced: true,
  state: initialState,
  mutations
}
