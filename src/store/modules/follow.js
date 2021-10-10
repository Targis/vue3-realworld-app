import followApi from '@/api/follow'
// import userProfileApi from '@/api/userProfile'

const state = {
  profile: null,
  isLoading: false,
  error: null,
  isFollowingOptimistic: null
}

export const mutationTypes = {
  followUserStart: '[follow] Follow user start',
  followUserSuccess: '[follow] Follow user success',
  followUserFailure: '[follow] Follow user failure',

  setFollow: '[follow] Set follow',
  toggleFollow: '[follow] Toggle follow'
}

export const actionTypes = {
  followUser: '[follow] Follow user',
  setFollow: '[follow] Set follow',
  toggleFollow: '[follow] Toggle follow'
}

const mutations = {
  [mutationTypes.followUserStart](state) {
    state.isLoading = true
    state.profile = null
  },
  [mutationTypes.followUserSuccess](state, payload) {
    state.isLoading = false
    state.profile = payload
  },
  [mutationTypes.followUserFailure](state) {
    state.isLoading = false
  },

  [mutationTypes.setFollow](state, isFollowing) {
    state.isFollowingOptimistic = isFollowing
  },

  [mutationTypes.toggleFollow](state, isFollowing) {
    state.isFollowingOptimistic = !isFollowing
  }
}

const actions = {
  [actionTypes.followUser](context, {username, isFollowing}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.followUserStart)
      const promise = isFollowing
        ? followApi.unfollowUser(username)
        : followApi.followUser(username)
      promise
        .then(profile => {
          context.commit(mutationTypes.followUserSuccess, profile)
          resolve(profile)
        })
        .catch(() => {
          context.commit(mutationTypes.followUserFailure)
        })
    })
  },

  [actionTypes.setFollow](context, isFollowing) {
    context.commit(mutationTypes.setFollow, isFollowing)
  },

  [actionTypes.toggleFollow](context, isFollowing) {
    context.commit(mutationTypes.toggleFollow, isFollowing)
  }
}

export default {
  state,
  actions,
  mutations
}
