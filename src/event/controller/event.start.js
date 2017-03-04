export default class EventStart {
  constructor($rootScope, $state, $window, $stateParams, $timeout, $filter, $location, $anchorScroll, Regex, LocationService, CityService, EventService, CategoryService, InstitutionService, ValidationFactory, institutions, categories, event) {
    this.rootScope = $rootScope
    this.state = $state
    this.window = $window
    this.filter = $filter
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.service = EventService
    this.institutionService = InstitutionService
    this.institutions = institutions
    this.categories = categories
    this.event = event
    this.locationService = LocationService
    this.validation = ValidationFactory
    this.urlPattern = Regex.URL
    // this.event = {
    //   categorie_uuid: null
    // }
    this.temp = event.temp
    delete event.temp
    this.amountOptions = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true
    }
    if ($stateParams.causa) {
      this.event.institution_uuid = $stateParams.causa
    }
    if ($stateParams.categoria) {
      this.event.categorie_uuid = { slug: $stateParams.categoria }
    }
    // console.log($stateParams)
    // if ($stateParams.slug) {
    //   this.service.findById($stateParams.slug)
    //     .then(response => {
    //       let event = angular.copy(response.data)
    //       console.log(event)
    //       delete event.cover
    //       event.end_date = null
    //       event.goal_amount = event.goal
    //       event.video = event.videos.values[0].url
    //       event.categorie_uuid = event.categories.values[0]
    //       event.institution_uuid = event.institution.uuid
    //       this.temp.state = event.cities.values[0].state
    //       event.citie = event.cities.values[0]
    //       this.event = event
    //       this.event.end_date = this.filter('date')(new Date(event.ends), 'dd/MM/yyyy')
    //       console.log(this.form)
    //     })
    // }
    if ($stateParams.meta) {
      this.event.goal_amount = $stateParams.meta
    }
    if ($stateParams.termino) {
      this.event.end_date = $stateParams.termino
    }
    this.inputCity = document.querySelector('input[name="citie"]')
    if (this.hasDraft()) {
      this.draft = this.getDraft()
    }
    this.locationService.getStates()
      .then(response => this.states = response.data.values)

    // InstitutionService.findAll()
    //   .then(response => {
    //     this.institutions = response.data.values
    //     if ($stateParams.causa) {
    //       this.event.institution_uuid = $stateParams.causa
    //     }
    //     this.formatLabel = function(model) {
    //       let len = this.institutions.length
    //       for (var i = 0; i < len; i++) {
    //         if (model === this.institutions[i].uuid) {
    //           return this.institutions[i].name
    //         }
    //       }
    //     }
    //   })
    // CategoryService.findAll()
    //   .then(response => {
    //     this.categories = response.data.values
    //     if ($stateParams.categoria) {
    //       this.event.categorie_uuid = { slug: $stateParams.categoria }
    //     }
    //   })

    this.popovers = {
      name: {
        title: 'O nome da sua campanha',
        text: 'Você deve começar sua campanha pela escolha de um título. Por exemplo: "ajudando a causa X", "correndo pela causa Y" ou “fazendo um aniversário para a causa W". Uma dica: coloque nomes que chamem a atenção de seus parentes e amigos para quando o evento do bem  for compartihado em  suas mídias sociais.'
      },
      institution: {
        title: 'A instituição que quer ajudar',
        text: 'Para garantir a legitimidade das causas financiadas, o projeto beneficiado deve ser cadastrado na nossa plataforma. Você também pode procurar projetos e instituições já cadastrados em nosso portfolio de inspiração. Caso queira sugerir uma causa de interesse, entre em contato por aqui.'
      },
      state: {
        title: 'Seu estado',
        text: 'Selecione seu estado para que as cidades sejam carregadas.'
      },
      category: {
        title: 'Categoria da campanha',
        text: 'Qual categoria seu evento se adequa? Caso tenha um evento que se adeque a uma categoria não sugerida, não tem problema, classifique-a como "criativos".'
      },
      city: {
        title: 'Cidade da campanha',
        text: 'É a cidade na qual você está localizado. Uma campanha pode acontecer de duas maneiras: ou somente aqui pela internet, ou tanto pela internet quanto em uma festa, presencialmente.'
      },
      goal: {
        title: 'Meta',
        text: 'A meta motiva seus amigos a se unirem a você e assim ampliar o impacto social! Para pensar em uma meta factível faça uma lista de apoiadores mais prováveis de sua campanha: fale com amigos e familiares próximos, avalie um valor médio provável por doação, calcule o valor total e dobre o resultado, esta será sua meta. Será factível e ao mesmo tempo motivadora.'
      },
      end: {
        title: 'Data limite',
        text: 'Todas as nossas campanhas tem no mínimo 25 e máximo 90 dias, pois é o prazo necessário para você mobilizar seus amigos. Mesmo que uma data específica de um evento esteja há poucos dias da data de criação de seu evento do bem, fique tranquilo que a maioria das campanhas batem a meta depois de sua data chave.'
      },
      description: {
        title: 'Descrição da campanha',
        text: 'Este é o texto em que você explica a seus amigos e familiares o porquê de ter criado sua campanha, apresentando-lhes o destino das doações e destacando-lhes a importância do impacto socioambiental que poderão causar. Por ser uma mensagem pessoal, é importante que você seja natural para que ela tenha a sua cara :D Deixe bem clara sua proposta. Por exemplo, no caso de um aniversário, você pode justificar sua campanha pedindo, ao invés de presentes, doações para o projeto/instituição em que acredita. Quanto mais pessoal, do coração e verdadeiro seu texto for...melhor! Finalize-o com uma frase de efeito para dar início à sua campanha!'
      },
      video: {
        title: 'Vídeo da campanha',
        text: 'Você pode gravar um vídeo explicando sua campanha. Caso prefira, pode ser um vídeo institucional da causa beneficiada. Se você deixar em branco o endereço do vídeo, sua página automaticamente utilizará o vídeo-padrão ou uma imagem do projeto salvo em nosso banco de dados.'
      }
    }
  }
  selectInstitution(institution) {
    if (institution) {
      let len = this.institutions.length
      for (var i = 0; i < len; i++) {
        if (institution === this.institutions[i].uuid) {
          return this.institutions[i].name
        }
      }
    }
  }
  selectCategory(category) {
    if (category) {
      let len = this.categories.length
      for (var i = 0; i < len; i++) {
        if (category.uuid === this.categories[i].uuid) {
          return this.categories[i].uuid
        }
      }
    }
  }
  getCities(state, city) {
    return this.locationService.getCities(state, city)
      .then(response => {
        return response.data.values
      })
  }
  changeState() {
    setTimeout(() => {
      this.inputCity.focus()
      delete this.event.citie
    }, 100)
  }
  setPopoverContent(field) {
    this.popoverContent = this.popovers[field]
  }
  validateDate(field, date) {
    date = date.split('/')
    date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
    if (!field.$error.mask && field.$viewValue) {
      let validMin = false,
          validMax = false,
          valid = false
      validMin = this.validation.dateMinByDays(date, 25, 'future')
      validMax = this.validation.dateMaxByDays(date, 90, 'future')
      valid = (
        this.validation.dateMinByDays(date, 25, 'future') &&
        this.validation.dateMaxByDays(date, 90, 'future')
      )

      this.errorDateMin = date.setDate(date.getDate() + 25)
      this.errorDateMax = date.setDate(date.getDate() + 90)
      // field.$setValidity('end_date_min', !validMin)
      // field.$setValidity('end_date_max', !validMax)
      field.$setValidity('end_date', valid)
    }
  }
  checkEndDate(field, end) {
    if (!field.$error.mask && field.$viewValue) {
      let end_date = end.split('/')
      end_date = `${end_date[2]}-${end_date[1]}-${end_date[0]}`
      let dateEnd = new Date(end_date)
      if (dateEnd == 'Invalid Date') {
        field.$setValidity('mask', false)
      } else {
        let dateCurrent = this.event.uuid ? new Date(this.event.created_at) : new Date(),
        timeDiff = dateEnd - dateCurrent,
        diffDays = parseInt(timeDiff / (1000 * 3600 * 24)),
        validMin = (diffDays >= 25) ? true : false,
        validMax = (diffDays <= 89) ? true : false,
        dateMin = this.event.uuid ? new Date(this.event.created_at) : new Date(),
        dateMax = this.event.uuid ? new Date(this.event.created_at) : new Date(),
        errorDateMin = new Date(dateMin.setDate(dateMin.getDate() + 26)),
        errorDateMax = new Date(dateMax.setDate(dateMax.getDate() + 90))
        this.errorDateMin = this.filter('date')(errorDateMin, 'dd/MM/yyyy')
        this.errorDateMax = this.filter('date')(errorDateMax, 'dd/MM/yyyy')
        field.$setValidity('end_date_min', validMin)
        field.$setValidity('end_date_max', validMax)
      }
    }
  }
  save(start, event) {
    event = angular.copy(event)
    // start.end_date.$setValidity('end_date', false)
    this.checkEndDate(start.end_date, event.end_date)
    if (start.$invalid) {
      angular.forEach(start.$error, field => {
        angular.forEach(field, errorField => {
          errorField.$setDirty()
        })
      })
    } else {
      if (event.video && event.video.trim().indexOf('http') != 0) {
        event.video = 'http://' + event.video
      }
      event.citie = event.citie.name
      event.categorie_uuid = event.categorie_uuid.uuid
      // event.goal_amount = parseInt(event.goal_amount)
      let method = event.uuid ? 'update' : 'save'
      this.service[method](event, progress => this.progress = progress)
        .then(
          response => {
            this.state.go('event.slug', {slug: response.data.slug})
          },
          error => {
            this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
            this.location.hash('body')
            this.anchorScroll()
          }
        )
    }
  }
  getAttr(name,attr) {
    let e = document.querySelector(`[name='${name}']`)
    return e.getAttribute(attr)
  }
  saveDraft(event) {
    let draft = angular.copy(event)
    this.window.localStorage.setItem('draftEvent', JSON.stringify(draft))
  }
  getDraft() {
    let draft = this.window.localStorage.getItem('draftEvent')
    return JSON.parse(draft)
  }
  loadDraft() {
    this.event = this.getDraft()
  }
  removeDraft() {
    this.window.localStorage.removeItem('draftEvent')
  }
  hasDraft() {
    return !!this.window.localStorage.getItem('draftEvent')
  }
}

EventStart.$inject = ['$rootScope','$state','$window','$stateParams','$timeout','$filter','$location','$anchorScroll', 'Regex', 'LocationService', 'CityService', 'EventService', 'CategoryService', 'InstitutionService','ValidationFactory','institutions','categories','event']