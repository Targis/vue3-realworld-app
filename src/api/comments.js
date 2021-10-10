import axios from '@/api/axios'

const getComments = slug => {
  return axios
    .get(`/articles/${slug}/comments`)
    .then(response => response.data.comments)
}

export default {
  getComments
}
