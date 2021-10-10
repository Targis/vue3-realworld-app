<template>
  <button
    v-if="username"
    @click="handleFollow"
    class="btn btn-sm action-btn btn-outline-secondary"
  >
    <i class="ion-plus-round"></i>
    &nbsp;
    {{ isFollowingOptimistic ? 'Unfollow' : 'Follow' }}
    {{ username }}
    <!-- <span v-text="followUserLabel" /> -->
  </button>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {actionTypes} from '@/store/modules/follow'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
export default {
  name: 'MvFollow',
  props: {
    isFollowing: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.follow.isLoading,
      error: state => state.follow.error,
      isFollowingOptimistic: state => state.follow.isFollowingOptimistic
    }),
    ...mapGetters({
      isAnonymous: authGetterTypes.isAnonymous
    })
  },
  methods: {
    handleFollow() {
      if (this.isAnonymous) {
        this.$router.push({name: 'login'})
        return false
      }
      this.$store.dispatch(actionTypes.followUser, {
        username: this.username,
        isFollowing: this.isFollowingOptimistic
      })
      this.$store.dispatch(actionTypes.toggleFollow, this.isFollowingOptimistic)
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.setFollow, this.isFollowing)
  }
}
</script>
