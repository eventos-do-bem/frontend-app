export default class Donate {
  constructor($uibModal, CreditCardFactory) {
    this.modal = $uibModal
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
    this.frontInputs = ['cardValue','cardNumber','cardName','cardMonth','cardYear']
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
    this.questions = [
      {question: 'Como eu apoio este projeto?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.'},
      {question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.'},
      {question: 'Como eu apoio este projeto?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.'},
      {question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.'},
      {question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.'}
    ]
  }
  openBillet() {
    let modalInstance = this.modal.open({
      templateUrl: './../src/pages/view/billet.html',
      controller: 'DonateBillet',
      controllerAs: 'ctrl',
      resolve: {
        donate: () => {
          return this.donate
        }
      }
    })
    modalInstance.result.then(donate => console.log(donate))
  }
  open(item) {
    if (item.active) return item.active = false
    this.questions.map(q => q.active = false)
    item.active = true
  }
  onFocus(input) {
    let card = document.querySelector('.card')
    if (this.frontInputs.indexOf(input) !== -1) {
      card.classList.remove('validated')
    }
  }
  onValidate(form) {
    let card = document.querySelector('.card')
    this.frontInputs.map(name => {
      if (!form[name].$valid) {
        card.classList.remove('validated')
        return
      }
    })
    card.classList.add('validated')
    //5165-3011-0835-3140
  }
  getFlag(number) {
    this.flag = this.creditCard.getFlag(number)
  }
}

Donate.$inject = ['$uibModal', 'CreditCardFactory']