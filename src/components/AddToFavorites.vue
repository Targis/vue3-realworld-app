<template>
  <button
    v-if="articleSlug"
    @click="handleLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic
    }"
  >
    <i class="ion-heart"></i>
    &nbsp;
    {{ favoritesCountOptimistic }}
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'
import {mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
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
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  computed: {
    ...mapGetters({
      isAnonymous: authGetterTypes.isAnonymous
    })
  },
  methods: {
    handleLike() {
      if (this.isAnonymous) {
        this.$router.push({name: 'login'})
        return false
      }
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
