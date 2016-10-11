export default class EventStart {
  constructor($state, $window, $stateParams, CityService, EventService, CategoryService, InstitutionService) {
    this.$state = $state
    this.window = $window
    this.service = EventService
    if (this.hasDraft()) {
      this.draft = this.getDraft()
    }
    this.event = {}
    // this.categories = [
    //   { id: 'Aniversários', label: 'Aniversários' },
    //   { id: 'Casamentos', label: 'Casamentos' },
    //   { id: 'Corridas', label: 'Corridas' },
    //   { id: 'Jantares', label: 'Jantares' },
    //   { id: 'Voluntariado', label: 'Voluntariado' }
    // ]
    CityService.findAll()
      .then(response => this.cities = response.data.values)    
    InstitutionService.findAll()
      .then(response => this.institutions = response.data.values)
    CategoryService.findAll()
      .then(response => this.categories = response.data.values)

    this.popovers = {
      name: 'Você deve começar sua campanha pela escolha de um título. Por exemplo: "ajudando a causa X", "correndo pela causa Y" ou “fazendo um aniversário para a causa W". Uma dica: coloque nomes que chamem a atenção de seus parentes e amigos para quando o evento do bem  for compartihado em  suas mídias sociais.',
      institution: 'Para garantir a legitimidade das causas financiadas, o projeto beneficiado deve ser cadastrado na nossa plataforma. Você também pode procurar projetos e instituições já cadastrados em nosso portfolio de inspiração. Caso queira sugerir uma causa de interesse, entre em contato por aqui.',
      category: 'Qual categoria seu evento se adequa? Caso tenha um evento que se adeque a uma categoria não sugerida, não tem problema, classifique-a como "criativos".',
      city: 'É a cidade na qual você está localizado. Uma campanha pode acontecer de duas maneiras: ou somente aqui pela internet, ou tanto pela internet quanto em uma festa, presencialmente.',
      goal: 'Aqui você pode definir uma meta financeira, que é definida por duas informações: um valor e uma data-limite para a duração da campanha. Todas as nossas campanhas tem no mínimo 22 dias, pois é o tempo adequado para mobilizar seus amigos, mesmo que seu evento do bem tenha uma data específica, a maioria dos eventos batem a meta depois da data específica. Logo as datas de aniversários, casamentos entre outros não são limitantes mas motivadoras e impulsionadoras da captação de ajuda para a causa que você acredita.',
      description: 'Este é o texto em que você explica a seus amigos e familiares o porquê de ter criado sua campanha, apresentando-lhes o destino das doações e destacando-lhes a importância do impacto socioambiental que poderão causar. Por ser uma mensagem pessoal, é importante que você seja natural para que ela tenha a sua cara :D Deixe bem clara sua proposta. Por exemplo, no caso de um aniversário, você pode justificar sua campanha pedindo, ao invés de presentes, doações para o projeto/instituição em que acredita. Quanto mais pessoal, do coração e verdadeiro seu texto for...melhor! Finalize-o com uma frase de efeito para dar início à sua campanha!',
      video: 'Você pode gravar um vídeo explicando sua campanha. Caso prefira, pode ser um vídeo institucional da causa beneficiada. Se você deixar em branco o endereço do vídeo, sua página automaticamente utilizará o vídeo-padrão ou uma imagem do projeto salvo em nosso banco de dados.'
    }
  }
  save(event) {
    event = angular.copy(event)
    event.institution_uuid = event.institution_uuid.uuid
    // let end_date = event.end_date.split('/')
    // event.end_date = `${end_date[2]}-${end_date[1]}-${end_date[0]}`
    console.log(JSON.stringify(event))
    this.service.save(event)
      .then(
        response => console.log(response),
        error => console.error(error)
      )
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

EventStart.$inject = ['$state','$window','$stateParams', 'CityService', 'EventService', 'CategoryService', 'InstitutionService']