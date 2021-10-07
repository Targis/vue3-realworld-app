<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
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
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
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
      </div>
    </div>
    <div class="container page">
      <mv-loading v-if="isLoading" />
      <mv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mv-tag-list :tags="article.tagList" />
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {mapState, mapGetters} from 'vuex'
import MvLoading from '@/components/Loading'
import MvErrorMessage from '@/components/ErrorMessage'
import MvTagList from '@/components/TagList'
import MvFollowUser from '@/components/FollowUser'
import MvAddToFavorites from '@/components/AddToFavorites'
export default {
  name: 'MvArticle',
  components: {
    MvLoading,
    MvErrorMessage,
    MvTagList,
    MvFollowUser,
    MvAddToFavorites
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted() {
    console.log(this.$route)
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    }
  }
}
</script>
