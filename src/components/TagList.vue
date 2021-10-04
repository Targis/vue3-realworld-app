<template>
  <ul class="tag-list" v-if="tags">
    <li class="tag-default tag-pill tag-outline" v-for="tag in tags" :key="tag">
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MvTagList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
