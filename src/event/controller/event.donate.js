export default class EventDonate {
  constructor($rootScope, $state, $stateParams, $window, ProfileService, EventService, NotificationService, $uibModal, CreditCardFactory) {
    this.rootScope = $rootScope
    this.state = $state
    this.stateParams = $stateParams
    this.window = $window
    this.profileService = ProfileService
    this.eventService = EventService
    this.notificationService = NotificationService
    this.modal = $uibModal
    this.creditCard = CreditCardFactory
    this.logged = this.window.localStorage.getItem('token')

    if (!this.stateParams.slug) {
      this.state.go('pages.explore')
    }
    console.log(this.notificationService)

    this.eventService.findById(this.stateParams.slug)
      .then(response => this.uuid = response.data.uuid)

    if (this.logged) {
      this.profileService.me()
        .then(response => {
          console.log(response)
          let {name, birthdate, email, document} = response.data
          birthdate = birthdate.split('-')
          birthdate = `${birthdate[2]}/${birthdate[1]}/${birthdate[0]}`
          this.donate = {
            name: name,
            birthdate: birthdate,
            email: email,
            document: document
          }
        })
    }

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
    this.frontInputs = ['amount','card_number','card_name','card_month','card_year']
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
  openCard() {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      delete donate.document
    }
    donate.card_validate = `${donate.card_month}/${donate.card_year}`
    donate.card_number = donate.card_number.replace(/\-/g, '')
    let modalInstance = this.modal.open({
      templateUrl: './../src/event/view/donate.card.html',
      controller: 'EventDonateCard',
      controllerAs: 'ctrl',
      resolve: {
        donate: () => {
          return {
            uuid: this.uuid,
            data: donate
          }
        }
      }
    })
    modalInstance.result.then(
      response => {
        this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.status})      
      }
    )
  }
  openBillet() {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
    }
    console.log(donate)
    let modalInstance = this.modal.open({
      templateUrl: './../src/event/view/donate.billet.html',
      controller: 'EventDonateBillet',
      controllerAs: 'ctrl',
      resolve: {
        donate: () => {
          return {
            uuid: this.uuid,
            data: donate
          }
        }
      }
    })
    modalInstance.result.then(response => {
      console.log(response)
      // this.donate = {}
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.status})      
    })
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

EventDonate.$inject = ['$rootScope', '$state', '$stateParams', '$window', 'ProfileService', 'EventService', 'NotificationService', '$uibModal', 'CreditCardFactory']