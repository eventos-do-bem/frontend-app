export default class ValidationFactory {
  constructor() {
  }
  dateYearsDiff(start, end) {
    let diff = start - end,
      yearsDiff = diff / (1000 * 3600 * 24 * 365)
    return yearsDiff
  }
  dateMaxByYears(date, years) {
    let yearsDiff = this.dateYearsDiff(new Date(), date)
    return (yearsDiff >= years) ? false : true
  }
  dateMinByYears(date, years) {
    let yearsDiff = this.dateYearsDiff(new Date(), date)
    return (yearsDiff <= years) ? false : true
  }
  static validationFactory() {
    return new ValidationFactory()
  }
}

ValidationFactory.validationFactory.$inject = []