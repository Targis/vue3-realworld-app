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
  followUser: '[follow] Follow user'
}

const mutations = {
  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {},

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
  }
}

export default {
  state,
  actions,
  mutations
}
