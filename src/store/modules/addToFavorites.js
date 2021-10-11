import addToFavoritesApi from '@/api/addToFavorites'

const state = {
  favoritesCountOptimistic: null,
  isFavoritedOptimistic: null
}

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure',

  setFavorites: '[addToFavorites] Set favorites',
  toggleFavorite: '[addToFavorites] Toggle favorite'
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to Faforites'
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},

  [mutationTypes.setFavorites](state, {favoritesCount, isFavorited}) {
    state.favoritesCountOptimistic = favoritesCount
    state.isFavoritedOptimistic = isFavorited
  },
  [mutationTypes.toggleFavorite](state) {
    if (state.isFavoritedOptimistic) {
      state.favoritesCountOptimistic--
    } else {
      state.favoritesCountOptimistic++
    }
    state.isFavoritedOptimistic = !state.isFavoritedOptimistic
  }
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)
      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
