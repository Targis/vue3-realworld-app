import commentsApi from '@/api/comments'

const state = {
  data: [],
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getCommentsStart: '[comments] Get comments start',
  getCommentsSuccess: '[comments] Get comments success',
  getCommentsFailure: '[comments] Get comments failure',

  addCommentStart: '[comments] Add comment start',
  addCommentSuccess: '[comments] Add comment success',
  addCommentFailure: '[comments] Add comment failure'
}

export const actionTypes = {
  getComments: '[comments] getComments',
  addComment: '[comments] addComment'
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
  },

  [mutationTypes.addCommentStart](state) {
    state.isLoading = true
  },
  [mutationTypes.addCommentSuccess](state, payload) {
    state.isLoading = false
    state.data = [...state.data, payload]
  },
  [mutationTypes.addCommentFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  [actionTypes.getComments](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCommentsStart, slug)
      commentsApi.getComments(slug).then(comments => {
        console.log('get comments', comments)
        context.commit(mutationTypes.getCommentsSuccess, comments)
        resolve(comments)
      })
    }).catch(response => {
      context.commit(mutationTypes.getCommentsFailure, response.data)
    })
  },

  [actionTypes.addComment](context, {slug, commentText}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addCommentStart)
      commentsApi
        .addComment({slug, commentText})
        .then(data => {
          console.log('comment data', data.comment)
          context.commit(mutationTypes.addCommentSuccess, data.comment)
          resolve(data.comment)
        })
        .catch(errors => {
          context.commit(mutationTypes.addCommentFailure, errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
