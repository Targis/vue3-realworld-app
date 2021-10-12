import axios from '@/api/axios'

const getComments = slug => {
  return axios
    .get(`/articles/${slug}/comments`)
    .then(response => response.data.comments)
}

const addComment = ({slug, commentText}) => {
  return axios
    .post(`/articles/${slug}/comments`, {comment: {body: commentText}})
    .then(response => response.data)
}

export default {
  getComments,
  addComment
}
