export default function youtubeFilter($sce) {
  return function(val) {
    if (val) {
      let videoLink = val,
          watch = val.indexOf('?v=') + 3
      return $sce.getTrustedResourceUrl(`https://www.youtube.com/embed/${val.substring(watch, videoLink.length)}`)
    }
  }
}