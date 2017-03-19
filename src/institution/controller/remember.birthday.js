export default class RememberBirthday {
  constructor($uibModalInstance, ValidationFactory, birthday) {
    this.instance = $uibModalInstance
    this.validation = ValidationFactory
    this.birthday = birthday
  }
  validateDate(field, date) {
    date = date.split('/')
    date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
    if (!field.$error.mask) {
      let valid = (
        this.validation.dateMinByYears(date, 18) &&
        this.validation.dateMaxByYears(date, 121)
      )
      field.$setValidity('age', valid)
    }
  }
  subscribe(birthday) {
    this.instance.close(birthday)
  }
  close() {
    this.instance.dismiss()
  }
}

RememberBirthday.$inject = ['$uibModalInstance','ValidationFactory','birthday']