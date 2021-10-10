import commentsApi from '@/api/comments'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getCommentsStart: '[comments] Get comments start',
  getCommentsSuccess: '[comments] Get comments success',
  getCommentsFailure: '[comments] Get comments failure'
}

export const actionTypes = {
  getComments: '[comments] getComments'
}

const mutations = {
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getCommentsFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  [actionTypes.getComments](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCommentsStart, slug)
      commentsApi.getComments(slug).then(comments => {
        context.commit(mutationTypes.getCommentsSuccess, comments)
        resolve(comments)
      })
    }).catch(response => {
      context.commit(mutationTypes.getCommentsFailure, response.data)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
