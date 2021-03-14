<template>
  <section class="container">
    <PostContainer :slug="slug" />
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch } from '@nuxtjs/composition-api'
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'
import { ErrorType } from '@/common/errors'
const PostContainer = () => import('@/containers/Post')

export default defineComponent({
  components: {
    PostContainer,
  },
  setup() {
    const { params, error, $container } = useContext()
    const slug = params.value.slug

    useFetch(async () => {
      try {
        const usecase = $container.resolve(FetchPostUseCase)
        await usecase.execute(slug)
      } catch (e) {
        if (e.type === ErrorType.NOT_FOUND) {
          error({ statusCode: 404, message: e.message })
          return
        } else {
          error({ statusCode: 500, message: e.message })
        }
      }
    })

    return {
      slug,
    }
  },
})
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>
