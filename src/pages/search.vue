<template>
  <section class="container">
    <ResultContainer />
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, watch } from '@nuxtjs/composition-api'
import SearchPostsUseCase from '@/usecases/post/SearchPostsUseCase'
const ResultContainer = () => import('@/containers/Result')

export default defineComponent({
  components: {
    ResultContainer,
  },
  setup() {
    const { query, error, $container } = useContext()

    const { fetch } = useFetch(async () => {
      try {
        if (typeof query.value.query !== 'string') return
        const usecase = $container.resolve(SearchPostsUseCase)
        await usecase.execute(query.value.query)
      } catch (e) {
        error({ statusCode: 500, message: e.message })
      }
    })

    watch(
      () => query.value.query,
      () => {
        fetch()
      }
    )
  },
  watchQuery: ['query'],
})
</script>

<style scoped>
.container {
  width: 1180px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
</style>
