<template>
  <section class="container">
    <HomeContainer />
  </section>
</template>

<script lang="ts">
import { container } from 'tsyringe'
import { defineComponent, useFetch, useContext } from '@nuxtjs/composition-api'
import FetchPostSummariesUseCase from '@/usecases/post/FetchPostSummariesUseCase'

const HomeContainer = () => import('@/containers/Home')

export default defineComponent({
  components: {
    HomeContainer,
  },
  setup() {
    const { error } = useContext()

    useFetch(async () => {
      try {
        await container.resolve(FetchPostSummariesUseCase).execute()
      } catch (e) {
        error({ statusCode: 500, message: e.message })
      }
    })
  },
  head: {
    title: 'Home | Studio Andy',
    meta: [{ hid: 'description', name: 'description', content: "Welcome to Shin Ando's (you may know me as Andy!) personal blog. I'm excited to share some parts of my daily life to all of you, my fellas." }],
  },
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
