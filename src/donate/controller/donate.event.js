export default class DonateEvent {
  constructor ($rootScope, $state, $stateParams, $window, $filter, $timeout, $location, $anchorScroll, ProfileService, EventService, DonateService, $uibModal, CreditCardFactory, ValidationFactory, LocationService, CityService, AuthService, StorageService) {
    this.rootScope = $rootScope
    this.state = $state
    this.stateParams = $stateParams
    this.window = $window
    this.filter = $filter
    this.timeout = $timeout
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.profileService = ProfileService
    this.eventService = EventService
    this.donateService = DonateService
    this.modal = $uibModal
    this.creditCard = CreditCardFactory
    this.validation = ValidationFactory
    this.locationService = LocationService
    this.authService = AuthService
    this.storageService = StorageService
    this.logged = this.window.localStorage.getItem('token')
    this.temp = {}
    this.donate = {
      is_anonymous: false
    }
    this.amountOptions = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true,
      vMin: '0.00'
    }

    if (!this.stateParams.slug) {
      this.state.go('pages.explore')
    }

    this.eventService.findById(this.stateParams.slug)
      .then(response => {
        this.uuid = response.data.uuid
        this.event = response.data
      })

    if (this.logged) {
      this.getProfile()
      // this.profileService.me()
      //   .then(response => {
      //     let {name, birthdate, email, document, zip_code, street, number, city, district, state} = response.data
      //     birthdate = birthdate.split('-')
      //     birthdate = `${birthdate[2]}/${birthdate[1]}/${birthdate[0]}`
      //     this.donate.name = name
      //     this.donate.birthdate = birthdate
      //     this.donate.email = email
      //     this.donate.document = document
      //     this.donate.zip_code = zip_code
      //     this.donate.street = street
      //     this.donate.number = number
      //     this.donate.city = city
      //     this.donate.district = district
      //     this.donate.state = state
      //     this.missingDoc = (this.donate.document) ? false : true
      //   })
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
    this.frontInputs = ['card_amount', 'card_number', 'card_name', 'card_month', 'card_year']
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
      {question: 'Como eu apoio esta campanha?', answer: 'Primeiro, escolha o valor desejado. Depois é só selecionar seu meio de pagamento (cartão ou boleto) e clicar em "doar" que redirecionaremos você para a próxima página para concluir o seu pagamento.'},
      {question: 'Posso ter segurança de que meus dados bancários estão seguros?', answer: 'Sim, além de termos um certificado de segurança no nosso site que criptografa as informações, nós não guardamos seus dados de cartão de crédito, ele é informado diretamente para a rede de cartão de crédito.'},
      {question: 'Quando o pagamento é efetivado?', answer: 'Se você pagou com cartão de crédito, a confirmação deverá ser no mesmo dia e você receberá um email de confirmação nosso em seu email cadastrado. Se foi com boleto, em até 4 dias úteis você receberá um email de confirmação de pagamento.'},
      {question: 'O que os outros podem ver do meu apoio?', answer: 'Como nossa política de transparência, a pessoa que criou o evento do bem poderá visualizar nome, email e valor do apoio. '},
      {question: 'Conseguirei ver o resultado do meu apoio à Organização?', answer: 'Sim! está é a melhor parte, a Organização social apoiada se dispõe a quantificar no que o seu apoio se transformou ( ex. apoio escolar para 30 crianças e etc.), você receberá esse retorno no seu email cadastrado na eventos do bem, por isso se certifique que o email que você se cadastrou está correto.'}
    ]
    this.locationService.getStates()
      .then(response => { this.states = response.data.values })
  }
  getProfile () {
    this.profileService.me()
      .then(
        response => {
          let {...profile} = angular.copy(response.data)
          profile.birthdate = this.filter('date')(profile.birthdate, 'dd/MM/yyyy')
          this.missingDoc = (profile.document) ? false : true
          profile = {
            name: profile.name,
            birthdate: this.filter('date')(profile.birthdate, 'dd/MM/yyyy'),
            email: profile.email,
            document: profile.document,
            type: profile.type,
            city: profile.city,
            district: profile.district,
            number: profile.number,
            state: profile.state,
            street: profile.street,
            zip_code: profile.zip_code
          }
          angular.extend(this.donate, profile)
        }
      )
  }
  checkEmail (email) {
    if (email) {
      this.authService.checkEmail(email)
        .then(response => this.login())
    }
  }
  login () {
    let modalInstance = this.modal.open({
      templateUrl: './../src/auth/view/modal/login.html',
      controller: 'ModalAuthLogin',
      controllerAs: 'ctrl',
      backdrop: 'static',
      size: 'sm',
      keyboard: false,
      resolve: {
        redirect: () => {
          return false
        }
      }
    })
    modalInstance.result.then(profile => {
      this.inputDocument = document.querySelector('input[name="document"]')
      if (!profile.document) {
        setTimeout(() => {
          this.inputDocument.focus()
        }, 100)
      }
      this.logged = this.storageService.getItem('token')
      this.getProfile()
    })
  }
  validateDate (field, date) {
    if (!field.$error.mask && date) {
      date = date.split('/')
      date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
      let valid = this.validation.dateMinByYears(date, 18)
      field.$setValidity('birthdate', valid)
    } else {
      field.$setValidity('birthdate', false)
    }
  }
  donateCard () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    }
    donate.card_validate = `${donate.card_month}/${donate.card_year}`
    donate.card_number = donate.card_number.replace(/\-/g, '')
    let method = (this.logged) ? 'payLogged' : 'payPublic'
    this.donateService[method](this.event.uuid, donate)
      .then(
        response => this.openCardSuccess(this.event.institution.user, this.donate.name),
        error => this.openCardError(error.data)
      )
  }
  openCardSuccess (user, donor) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/donate/view/donate.card.success.html',
      controller: 'DonateCardSuccess',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        data: () => {
          return {
            user: user,
            donor: donor
          }
        }
      }
    })
    modalInstance.result.then(response => {
      this.state.go('event.slug', {slug: this.stateParams.slug})
    })
  }
  openCardError (error) {
    this.anchorScroll('body')
    this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
  }
  openCard () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    }
    donate.card_validate = `${donate.card_month}/${donate.card_year}`
    donate.card_number = donate.card_number.replace(/\-/g, '')
    donate.amount = parseInt(donate.amount)
    let modalInstance = this.modal.open({
      templateUrl: './../src/donate/view/donate.card.html',
      controller: 'DonateCard',
      controllerAs: 'ctrl',
      resolve: {
        data: () => {
          return {
            uuid: this.uuid,
            donate: donate,
            user: this.event.institution.user
          }
        }
      }
    })
    modalInstance.result.then(response => {
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.data.status})
      this.anchorScroll('body')
      this.timeout(() => {
        this.state.go('event.slug', {slug: response.uuid})
      }, 3000)
    }, error => {
      this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
    }
    )
  }

  open (item) {
    if (item.active) return item.active = false
    this.questions.map(q => q.active = false)
    item.active = true
  }
  onFocus (input) {
    let card = document.querySelector('.card')
    if (this.frontInputs.indexOf(input) !== -1) {
      card.classList.remove('validated')
    }
  }
  onValidate (form) {
    let card = document.querySelector('.card')
    this.frontInputs.map(name => {
      if (!form[name].$valid) {
        card.classList.remove('validated')
        return
      }
    })
    card.classList.add('validated')
    // 4111111111111111 SUCESSO
    // 4242424242424242 SUCESSO
    // 4012888888881881 FALHA
  }
  getFlag (number) {
    this.flag = this.creditCard.getFlag(number)
  }
  changeMethod (method) {
    let input = document.querySelector(`input[name="${method}_amount"]`)
    setTimeout(() => {
      input.focus()
    }, 100)
  }
  changeState () {
    let inputCity = document.getElementById('city')
    inputCity.focus()
    delete this.donate.city
  }
  getCities (state, city) {
    return this.locationService.getCities(state, city)
      .then(response => {
        return response.data.values
      })
  }
  getAddress (zipcode) {
    if (zipcode) {
      let inputNumber = document.getElementById('number')
      return this.locationService.getAddressByZipCode(zipcode)
        .then(response => {
          let {address, city, district, state} = response.data
          angular.extend(this.donate, {
            street: address,
            city: city,
            state: state,
            district: district
          })
          inputNumber.focus()
        })
    }
  }
  waitBillet () {
    this.modal.open({
      templateUrl: './../src/donate/view/donate.billet.wait.html',
      backdrop: 'static',
      size: 'sm',
      windowClass: 'zSuper'
    })
  }
  donateBillet () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    }
    let method = (this.logged) ? 'printLoggedBillet' : 'printPublicBillet'
    this.donateService[method](this.uuid, donate)
      .then(response => {
        this.waitBillet()
        let billet = response.data.iugu_url.replace('?bs=true', '.pdf')
        console.log('billet: ',billet)
        this.window.open(billet, '_self')
      },
      error => {
        this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error.data})
        this.location.hash('body')
        this.anchorScroll()
      })
  }
  openBillet () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    }
    let modalInstance = this.modal.open({
      templateUrl: './../src/donate/view/donate.billet.html',
      controller: 'DonateBillet',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        data: () => {
          return {
            uuid: this.uuid,
            donate: donate,
            user: this.event.institution.user
          }
        }
      }
    })
    modalInstance.result.then(response => {
      // this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.data.status})
      // this.anchorScroll('scrollArea')
      this.waitBillet()
      let billet = response.data.iugu_url.replace('?bs=true', '.pdf')
      this.window.open(billet, '_blank')
    }, error => {
      if (error !== 'cancel') this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
    })
  }
}

DonateEvent.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$filter', '$timeout', '$location', '$anchorScroll', 'ProfileService', 'EventService', 'DonateService', '$uibModal', 'CreditCardFactory', 'ValidationFactory', 'LocationService', 'CityService', 'AuthService', 'StorageService']
