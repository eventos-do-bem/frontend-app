export default class CreditCardFactory {
  constructor() {
    this.options = {
      amex: [34,37],
      visa: [4],
      mastercard: [51,52,53,54,55],
      diners: [300,301,302,303,304,305,2014,2149,36],
      hipercard: [38],
      aura: [50],
      elo: [63]
    }
  }
  getFlag(number) {
    let matched = false
    if (number) {
      for (let flag in this.options) {
        if (!matched) {
          for (let max in this.options[flag]) {
            let regex = new RegExp('^' + this.options[flag][max])
            if (number.match(regex)) {
              matched = true
              return flag
            }
          }
        }
      }
    }
  }
  static creditCardFactory() {
    return new CreditCardFactory()
  }
}

CreditCardFactory.creditCardFactory.$inject = []