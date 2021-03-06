class EventExplore {
  constructor(EventService, categories, categorie, institutions, institution, StorageService, $anchorScroll, $location) {
    this.eventService = EventService
    this.profile = StorageService.getItem('profile')
    this.anchorScroll = $anchorScroll
    this.location = $location
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    }
    this.isOpen = false
    this.pagination = { current_page: 1 }
    this.query = {}
    this.search = () => this.getSearch(this.query)
    this.categories = categories.data.values
    this.query.categorie = categorie ? categorie.data : categorie
    this.institutions = institutions.data.values
    this.query.institution = institution ? institution.data : institution
    this.search()
  }
  changePage() {
    this.search()
    this.location.hash('form')
    this.anchorScroll()
  }
  getSearch(data) {
    data = angular.copy(data)
    if (data.categorie) data.categorie = data.categorie.slug
    if (data.institution) data.institution = data.institution.slug
    data.page = this.pagination.current_page
    this.eventService.search(data)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.events = response.data.values.map(event => {
          event.progress = Math.floor((event.total_receive / event.goal) * 100)
          switch(true) {
            case (event.progress < 15): event.progress_type = 'danger'; break;
            case (event.progress < 30): event.progress_type = 'warning'; break;
            case (event.progress <= 60): event.progress_type = 'info'; break;
            case (event.progress >= 60): event.progress_type = 'success'; break;
          }
          return event
        })
      })
  }
}

EventExplore.$inject = ['EventService', 'categories', 'categorie', 'institutions', 'institution', 'StorageService', '$anchorScroll', '$location']

export default EventExplore