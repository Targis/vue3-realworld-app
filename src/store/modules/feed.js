import feedApi from '@/api/feed'
import {formatDate} from '@/helpers/utils'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure'
}

export const actionTypes = {
  getFeed: '[feed] getFeed'
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    console.log('get feed action')
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then(response => {
          response.data.articles.map(article => {
            article.createdAt = formatDate(article.createdAt)
            article.updatedAt = formatDate(article.updatedAt)
          })
          context.commit(mutationTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
