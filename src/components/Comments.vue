<template>
  <div>
    <mv-loading v-if="isLoading" />
    <p v-if="isAnonymous">
      <router-link :to="{name: 'login'}">Sign in</router-link>
      or
      <router-link :to="{name: 'register'}">Sign up</router-link>
      to add comments on this article.
    </p>
    <mv-validation-errors v-if="errors" :validation-errors="errors" />
    <form
      @submit.prevent="postComment"
      class="card comment-form"
      v-if="currentUser"
    >
      <div class="card-block">
        <textarea
          class="form-control"
          rows="3"
          placeholder="Write a comment..."
          v-model="commentText"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="currentUser.image" class="comment-author-img" />
        <button type="submit" class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>
    <div v-if="comments">
      <div class="card" v-for="comment in comments" :key="comment.id">
        <div v-if="comment">
          <div class="card-block">
            <p class="card-text">
              {{ comment.body }}
            </p>
          </div>
          <div class="card-footer">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: comment.author.username}
              }"
            >
              <img :src="comment.author.image" class="comment-author-img" />
            </router-link>
            &nbsp;
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: comment.author.username}
              }"
            >
              {{ comment.author.username }}
            </router-link>
            <span class="date-posted">
              {{ format(comment.createdAt) }}
            </span>
            <span
              class="mod-options"
              v-if="
                currentUser && comment.author.username === currentUser.username
              "
            >
              <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes} from '@/store/modules/comments'
import {formatDate} from '@/helpers/utils'
import MvValidationErrors from '@/components/ValidationErrors'
import MvLoading from '@/components/Loading'
export default {
  name: 'MvComments',
  components: {
    MvValidationErrors,
    MvLoading
  },
  data() {
    return {
      commentText: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.comments.isLoading,
      errors: state => state.comments.errors,
      comments: state => state.comments.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
      isAnonymous: authGetterTypes.isAnonymous
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getComments, {
      slug: this.$route.params.slug
    })
    this.validationErrors = null
  },
  methods: {
    postComment() {
      this.$store
        .dispatch(actionTypes.addComment, {
          slug: this.$route.params.slug,
          commentText: this.commentText
        })
        .then((this.commentText = ''))
    },
    deleteComment(id) {
      if (!id) {
        return false
      }
      this.$store.dispatch(actionTypes.deleteComment, {
        slug: this.$route.params.slug,
        id
      })
    },
    format(dateString) {
      return formatDate(dateString)
    }
  }
}
</script>
