class Explore {
  constructor(ActivityAreaService,InstitutionService,StorageService,$anchorScroll,$location) {
    this.activityAreaService = ActivityAreaService
    this.institutionService = InstitutionService
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
    this.getActivityAreas()
    this.search = () => this.getSearch(this.query)
    this.search()
  }
  changePage() {
    this.search()
    this.location.hash('form')
    this.anchorScroll()
  }
  getSearch(data) {
    data = angular.copy(data)
    if (data.area_activity_uuid) {
      data.area_activity_uuid = data.area_activity_uuid.uuid
    }
    data.page = this.pagination.current_page
    this.institutionService.search(data)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.institutions = response.data.values
      })
  }
  getActivityAreas() {
    this.activityAreaService.findAll()
      .then(response => this.area_activities = response.data.values)
  }
}

Explore.$inject = ['ActivityAreaService','InstitutionService','StorageService','$anchorScroll','$location']

export default Explore