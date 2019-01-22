<template>
  <div :class="$style.Error">
    <template v-if="error.statusCode == 404">
      <div :class="$style.message">お探しのページは存在しません。</div>
    </template>
    <template v-else>
      <div :class="$style.message">エラーが発生しました。</div>
    </template>
    <nuxt-link 
      :class="$style.link" 
      exact 
      to="/">トップページへ</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    error: {
      type: Object as () => { statusCode: number; message: string },
      required: true
    }
  }
})
</script>

<style module>
.Error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
}

.message {
  margin-bottom: 24px;
}

.link {
  color: #ef6530;
  font-weight: bold;
  transition: 0.3s;
}

.link:hover {
  text-decoration: underline;
}
</style>
