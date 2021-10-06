<template>
  <button
    @click="handleLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic
    }"
  >
    <i class="ion-heart"></i>
    &nbsp;
    <template v-if="btnStyleBig">
      {{ isFavoritedOptimistic ? 'Unfollow Article' : 'Follow Article' }}
      &nbsp; ({{ favoritesCountOptimistic }})
    </template>
    <template v-else>
      {{ favoritesCountOptimistic }}
    </template>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'
export default {
  name: 'MvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    },
    btnStyleBig: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  methods: {
    handleLike() {
      console.log(this.articleSlug)
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic--
      } else {
        this.favoritesCountOptimistic++
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>
