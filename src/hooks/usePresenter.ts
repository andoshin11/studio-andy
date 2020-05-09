import { Store } from 'vuex'
import { useContext, ref, Ref } from 'nuxt-composition-api'
import { onUnmounted } from '@vue/composition-api'
import { RootState, createStoreFromState } from '@/storeConstruct'

export type PresenterFn<T> = (store: Store<RootState>) => T

export const usePresenter = <R>(presenterFn: PresenterFn<R>) => {
  const { store } = useContext()
  const data = ref(presenterFn(store))

  const getterFn = (state: RootState) => presenterFn(createStoreFromState(state))

  const unWatch = (store as Store<RootState>).watch(getterFn, newVal => {
    ;(data.value as R) = newVal
  })

  onUnmounted(() => {
    if (unWatch) unWatch()
  })

  return data as Ref<R>
}
