import followUserApi from '@/api/followUser'

export const mutationTypes = {
  followUserStart: '[followUser] Follow user start',
  followUserSuccess: '[followUser] Follow user success',
  followUserFailure: '[followUser] Follow user failure'
}

export const actionTypes = {
  followUser: '[followUser] Follow user'
}

const mutations = {
  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {}
}

const actions = {
  [actionTypes.followUser](context, {username, isFollowing}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.followUserStart)
      const promise = isFollowing
        ? followUserApi.unfollowUser(username)
        : followUserApi.followUser(username)
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
  actions,
  mutations
}
