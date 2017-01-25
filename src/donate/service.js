import CommonService  from './../common/service/common.js'

export default class DonateService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
  }
  pay(uuid, data) {
    return this.$http.post(this.url + this.route, data, this.config)
  }
  payLogged(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/credit_card')
    return this.pay(uuid, data)
  }
  payPublic(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/credit_card')
    this.setPublicToken()
    return this.pay(uuid, data)
  }
  printBillet(uuid, data) {
    return this.$http.post(this.url + this.route, data, this.config)
  }
  printLoggedBillet(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/boleto')
    return this.printBillet(uuid, data)
  }
  printPublicBillet(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/boleto')
    this.setPublicToken()
    return this.printBillet(uuid, data)
  }
}

DonateService.$inject = ['$http','envService']