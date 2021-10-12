<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <mv-article-meta
          :article="article"
          :is-author="isAuthor"
          :is-following="article.author.following"
        />
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
      <div class="article-actions" v-if="article">
        <mv-article-meta
          :article="article"
          :isAuthor="isAuthor"
          :is-following="article.author.following"
        />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <mv-comments />
        </div>
      </div>
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
import MvArticleMeta from '@/components/ArticleMeta'
import MvComments from '@/components/Comments'
export default {
  name: 'MvArticle',
  components: {
    MvLoading,
    MvErrorMessage,
    MvTagList,
    MvArticleMeta,
    MvComments
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
