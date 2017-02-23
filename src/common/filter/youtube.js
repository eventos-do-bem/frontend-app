export default function youtubeFilter($sce) {
  return function(url) {
    if (url) {
      let regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
      let match = url.match(regExp)
      let id = (match && match[2].length == 11) ? match[2] : false
      return `https://www.youtube.com/embed/${id}`
    }
  }
}