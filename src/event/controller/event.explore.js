class EventExplore {
  constructor($stateParams,CategoryService,EventService,StorageService) {
    this.stateParams = $stateParams
    // this.activityAreaService = ActivityAreaService
    this.categoryService = CategoryService
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
    this.pendings = 0
    this.pagination = { current_page: 1 }
    this.getEvents()
    this.getCategories()
    this.search = () => this.getSearch(this.query)
  }
  getCategories() {
    this.categoryService.findAll()
      .then(response => {
        this.categories = response.data.values
        // if ($stateParams.categoria) {
        //   this.event.categorie_uuid = { slug: $stateParams.categoria }
        // }
      })
  }
  getEvents() {
    this.eventService.findAll({
      page: this.pagination.current_page
    }).then(response => {
      this.pagination = response.data.meta.pagination
      this.events = response.data.values
    })
  }
  changePage() {
    this.getEvents()
  }
  getSearch(data) {
    data = angular.copy(data)
    if (data.categorie_uuid) {
      data.categorie_uuid = data.categorie_uuid.uuid
    }
    this.eventService.search(data)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.events = response.data.values
      })
  }
  // getActivityAreas() {
  //   this.activityAreaService.findAll()
  //     .then(response => {
  //       this.area_activities = response.data.values
  //     })
  // }
}

EventExplore.$inject = ['$stateParams','CategoryService','EventService','StorageService']

export default EventExplore