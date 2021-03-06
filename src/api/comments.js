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

const deleteComment = ({slug, id}) => {
  return axios.delete(`/articles/${slug}/comments/${id}`)
}

export default {
  getComments,
  addComment,
  deleteComment
}
