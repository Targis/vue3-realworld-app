export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
