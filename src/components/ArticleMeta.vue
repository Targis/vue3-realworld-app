<template>
  <div class="article-meta" v-if="article">
    <router-link
      :to="{name: 'userProfile', params: {slug: article.author.username}}"
    >
      <img
        :src="article.author.image"
        @error="
          $event.target.src =
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        "
      />
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
      <mv-follow-user
        :is-following="article.author.following"
        :username="article.author.username"
      />
      &nbsp;
      <mv-add-to-favorites
        :btn-style-big="true"
        :is-favorited="article.favorited"
        :article-slug="article.slug"
        :favorites-count="article.favoritesCount"
      />
    </span>
  </div>
</template>

<script>
import MvFollowUser from '@/components/FollowUser'
import MvAddToFavorites from '@/components/AddToFavorites'
export default {
  name: 'MvArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    },
    isAuthor: {
      type: Boolean,
      required: true
    }
  },
  components: {
    MvFollowUser,
    MvAddToFavorites
  }
}
</script>
