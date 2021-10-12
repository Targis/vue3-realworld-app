import commentsApi from '@/api/comments'

const state = {
  data: [],
  isLoading: false,
  errors: null
}

export const mutationTypes = {
  getCommentsStart: '[comments] Get comments start',
  getCommentsSuccess: '[comments] Get comments success',
  getCommentsFailure: '[comments] Get comments failure',

  addCommentStart: '[comments] Add comment start',
  addCommentSuccess: '[comments] Add comment success',
  addCommentFailure: '[comments] Add comment failure',

  deleteCommentStart: '[comments] Delete comment start',
  deleteCommentSuccess: '[comments] Delete comment success',
  deleteCommentFailure: '[comments] Delete comment failure'
}

export const actionTypes = {
  getComments: '[comments] getComments',
  addComment: '[comments] addComment',
  deleteComment: '[comments] deleteComment'
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
    state.errors = payload
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
    state.errors = payload
  },

  [mutationTypes.deleteCommentStart]() {},
  [mutationTypes.deleteCommentSuccess](state, {id}) {
    console.log(id)
    const index = state.data.map(e => e.id).indexOf(id)
    state.data.splice(index, 1)
  },
  [mutationTypes.deleteCommentFailure]() {}
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
        .catch(result => {
          context.commit(
            mutationTypes.addCommentFailure,
            result.response.data.errors
          )
        })
    })
  },

  [actionTypes.deleteComment](context, {slug, id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteCommentStart)
      commentsApi
        .deleteComment({slug, id})
        .then(() => {
          context.commit(mutationTypes.deleteCommentSuccess, {id})
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteCommentFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
