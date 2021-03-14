<template>
  <section class="container">
    <TagsContainer />
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch } from '@nuxtjs/composition-api'
import FetchPostsByTagUseCase from '@/usecases/post/FetchPostsByTagUseCase'

const TagsContainer = () => import('@/containers/Tags')

export default defineComponent({
  components: {
    TagsContainer,
  },
  setup() {
    const { params, error, $container } = useContext()

    useFetch(async () => {
      try {
        const tag = params.value.id
        const usecase = $container.resolve(FetchPostsByTagUseCase)
        await usecase.execute(tag)
      } catch (e) {
        error({ statusCode: 500, message: e.message })
      }
    })
  },
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
