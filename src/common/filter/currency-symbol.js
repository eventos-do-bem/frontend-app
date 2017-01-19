export default function currencySymbolFilter($filter) {
  return function(value) {
    return $filter('currency')(value, 'R$ ', 0)
  }
}