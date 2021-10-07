<template>
  <button
    @click="handleFollow"
    class="btn btn-sm action-btn ng-binding btn-outline-secondary"
  >
    <i class="ion-plus-round"></i>
    &nbsp;
    <template v-if="!isFollowingOptimistic">Follow</template>
    <template v-if="isFollowingOptimistic">Unfollow</template>
    {{ username }}
  </button>
</template>

<script>
import {mapGetters} from 'vuex'
import {actionTypes} from '@/store/modules/followUser'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
export default {
  name: 'MvFollowUser',
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
  data() {
    return {
      isFollowingOptimistic: this.isFollowing
    }
  },
  computed: {
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
      this.isFollowingOptimistic = !this.isFollowingOptimistic
    }
  }
}
</script>
