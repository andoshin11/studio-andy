<template>
  <ul class="TagList">
    <li 
      v-for="tag in list" 
      :key="tag" 
      class="tag" >
      <nuxt-link 
        :to="tagPath(tag)">
        {{ tag }}
      </nuxt-link>
    </li>
    <li 
      v-if="list.length < 1" 
      class="empty">
      <Empty />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Empty from '@/components/Base/Empty'

interface IData {}

export default Vue.extend({
  components: {
    Empty
  },
  props: {
    list: {
      type: Array as () => string[],
      required: true
    }
  },
  data(): IData {
    return {}
  },
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    }
  }
})
</script>

<style scoped>
.TagList {
  width: 90%;
}

.tag {
  display: inline;
  margin-right: 8px;
  padding: 4px 8px;
  font-size: 16px;
  background: #ef6530;
  border: solid 1px #ef6530;
  border-radius: 1px;
  cursor: pointer;
  transition: 0.3s;
}

@media screen and (max-width: 768px) {
  .tag {
    font-size: 14px;
  }
}

.tag a {
  color: #fff;
}

.tag:hover,
.tag:focus {
  background: #fff;
}

.tag:hover a,
.tag:focus a {
  color: #ef6530;
}

.empty {
  width: 240px;
  height: 24px;
}
</style>
