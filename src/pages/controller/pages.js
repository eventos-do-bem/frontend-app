export default class Pages {
  constructor(CreditCardFactory) {
    this.creditCard = CreditCardFactory
    this.donateOff = {
      number: '0000-0000-0000-0000',
      name: 'nome completo',
      expiry: {
        month: '00',
        year: '0000'
      },
      cvc: '•••'
    }
    this.card = document.querySelector('.card')
    console.log(this.card)
    this.frontInputs = ['value','number','name','month','year']
    this.months = []
    for (let m = 1; m <= 12; m++) {
      if (m <= 9) {
        this.months.push(`0${m}`)
      } else {
        this.months.push(m)
      }
    }
    this.years = []
    let today = new Date()
    let curYear = today.getFullYear()
    for (let y = curYear; y <= curYear + 10; y++) this.years.push(y)
  }
  onFocus(input) {
    let card = document.querySelector('.card')
    if (this.frontInputs.indexOf(input) !== -1) {
      card.classList.remove('validated')
    }
  }
  onValidate(form) {
    let card = document.querySelector('.card')
    if (form.value.$valid && form.number.$valid && form.name.$valid && form.month.$valid && form.year.$valid) {
      card.classList.add('validated')
      // document.querySelector('form[name="donate"] input[name="cvc"]').focus()
    } else {
      card.classList.remove('validated')
    }
    //5165-3011-0835-3140
  }
  getFlag(number) {
    this.flag = this.creditCard.getFlag(number)
  }
}

Pages.$inject = ['CreditCardFactory']