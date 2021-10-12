<template>
  <div>
    ERRORS
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
              {{ comment.createdAt }}
            </span>
            <span class="mod-options">
              <i class="ion-trash-a" @click="deleteComment"></i>
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
export default {
  name: 'MvComments',
  data() {
    return {
      commentText: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.comments.isLoading,
      error: state => state.comments.error,
      comments: state => state.comments.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getComments, {
      slug: this.$route.params.slug
    })
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
    deleteComment() {
      console.log('delete comment')
    }
  }
}
</script>
