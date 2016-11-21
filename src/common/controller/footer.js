export default class Footer {
  constructor($filter) {
    this.year =  $filter('date')(new Date(), 'yyyy')
  }
}

Footer.$inject = ['$filter']