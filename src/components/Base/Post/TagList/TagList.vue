<template>
  <ul class="TagList">
    <li v-for="tag in list" :key="tag" class="tag">
      <nuxt-link :to="tagPath(tag)">
      {{ tag }}
      </nuxt-link>
    </li>
    <li v-if="list.length < 1" class="empty">
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
  margin-bottom: 24px;
}

@media screen and (max-width: 768px) {
  .TagList {
    margin-bottom: 16px;
  }
}

.tag {
  border: solid 1px #5b3cc4;
  display: inline;
  margin-right: 8px;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.15s;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .tag {
    font-size: 14px;
  }
}

.tag a {
  color: #222;
}

.tag:hover {
  background: #5b3cc4;
}

.tag:hover a {
  color: #fff;
}

.empty {
  width: 240px;
  height: 24px;
}
</style>
