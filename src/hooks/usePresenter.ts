import { Store } from 'vuex'
import { useContext, ref, Ref, onUnmounted } from '@nuxtjs/composition-api'
import deepEqueal from 'deep-equal'
import { RootState } from '@/storeConstruct'

export type PresenterFn<T> = () => T

export const usePresenter = <R>(presenterFn: PresenterFn<R>) => {
  const { store } = useContext()
  const data = ref(presenterFn())

  const unWatch = (store as Store<RootState>).watch(presenterFn, (newVal) => {
    if (!deepEqueal(data.value, newVal)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.value = newVal as any
    }
  })

  onUnmounted(() => {
    if (unWatch) unWatch()
  })

  return data as Ref<R>
}
