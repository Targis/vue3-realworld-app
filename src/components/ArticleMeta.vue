<template>
  <div class="article-meta" v-if="article">
    <router-link
      :to="{name: 'userProfile', params: {slug: article.author.username}}"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{
          name: 'userProfile',
          params: {slug: article.author.username}
        }"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <span v-if="isAuthor">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{name: 'editArticle', params: {slug: article.slug}}"
      >
        <i class="ion-edit"></i>
        Edit Article
      </router-link>
      &nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </span>
    <span v-if="!isAuthor">
      <mv-follow
        :username="article.author.username"
        :is-following="isFollowing"
      />
      &nbsp;

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
        {{ isFavoritedOptimistic ? 'Unfavorite Article' : 'Favorite Article' }}
        &nbsp; ({{ favoritesCountOptimistic }})
      </button>
    </span>
  </div>
</template>

<script>
import {actionTypes, mutationTypes} from '@/store/modules/addToFavorites'
import {mapState, mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import MvFollow from '@/components/Follow'

export default {
  name: 'MvArticleMeta',
  components: {
    MvFollow
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    isAuthor: {
      type: Boolean,
      required: true
    },
    isFollowing: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapState({
      isFavoritedOptimistic: state =>
        state.addToFavorites.isFavoritedOptimistic,
      favoritesCountOptimistic: state =>
        state.addToFavorites.favoritesCountOptimistic
    }),
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
        slug: this.article.slug,
        isFavorited: this.isFavoritedOptimistic
      })
      this.$store.commit(mutationTypes.toggleFavorite)
    }
  },
  mounted() {
    this.$store.commit(mutationTypes.setFavorites, {
      favoritesCount: this.article.favoritesCount,
      isFavorited: this.article.favorited
    })
  }
}
</script>
