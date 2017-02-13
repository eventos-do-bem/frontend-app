export default class ValidationFactory {
  constructor() {
  }
  dateDaysDiff(start, end, time) {
    let diff = start - end,
      daysDiff = diff / (1000 * 60 * 60 * 24)
    console.log(daysDiff)
    return daysDiff
  }
  dateMaxByDays(date, days, time = 'past') {
    let daysDiff
    if (time == 'past') {
      daysDiff = this.dateDaysDiff(new Date(), date)
    } else {
      daysDiff = this.dateDaysDiff(date, new Date())
    }
    return (daysDiff >= days) ? false : true
  }
  dateMinByDays(date, days, time = 'past') {
    let daysDiff
    if (time == 'past') {
      daysDiff = this.dateDaysDiff(new Date(), date)
    } else {
      daysDiff = this.dateDaysDiff(date, new Date())
    }
    return (daysDiff <= days) ? false : true
    // let diff,
    //     daysDiff = this.dateDaysDiff(new Date(), date)
    // if (time == 'past') {
    //   diff = (daysDiff >= days) ? false : true
    // } else {
    //   diff = (daysDiff <= days) ? false : true
    // }
    // return diff
    // return (daysDiff <= days) ? false : true
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