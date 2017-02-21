class EventExplore {
  constructor(EventService, categories,category,institutions, institution, StorageService) {
    this.eventService = EventService
    this.profile = StorageService.getItem('profile')
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
    this.query.category = category ? category.data : category
    this.institutions = institutions.data.values
    this.query.institution = institution ? institution.data : institution
    this.search()
  }
  changePage() {
    this.search()
  }
  getSearch(data) {
    data = angular.copy(data)
    if (data.category) data.category = data.category.uuid
    if (data.institution) data.institution = data.institution.slug
    data.page = this.pagination.current_page
    this.eventService.search(data)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.events = response.data.values
      })
  }
}

EventExplore.$inject = ['EventService', 'categories', 'category', 'institutions', 'institution', 'StorageService']

export default EventExplore