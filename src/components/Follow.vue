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
  </button>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {actionTypes, mutationTypes} from '@/store/modules/follow'
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
      this.$store.commit(mutationTypes.toggleFollow, this.isFollowingOptimistic)
    }
  },
  mounted() {
    this.$store.commit(mutationTypes.setFollow, this.isFollowing)
  }
}
</script>
