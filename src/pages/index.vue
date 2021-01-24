<template>
  <section class="container">
    <HomeContainer/>
  </section>
</template>

<script lang="ts">
import { container } from 'tsyringe'
import { defineComponent, useFetch, watch, useContext } from '@nuxtjs/composition-api'
import FetchPostsUseCase from '@/usecases/post/FetchPostsUseCase'

const HomeContainer = () => import('@/containers/Home')

export default defineComponent({
  head: {
    title: 'Home | Studio Andy',
    meta: [{ hid: 'description', name: 'description', content: "Welcome to Shin Ando's (you may know me as Andy!) personal blog. I'm excited to share some parts of my daily life to all of you, my fellas." }]
  },
  components: {
    HomeContainer
  },
  setup() {
    const { error } = useContext()

    const { fetchState } = useFetch(async () => {
      try {
        await container.resolve(FetchPostsUseCase).execute('publishedAt')
      } catch (e) {
        throw e // TODO: Explicit error handling
      }
    })

    watch(
      () => fetchState.pending,
      () => {
        if (fetchState.error) {
          error({ statusCode: 500, message: fetchState.error.message })
        }
      }
    )
  }
})
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

@media screen and (max-width: 1024px) {
  .container {
    width: 100%;
  }
}
</style>
