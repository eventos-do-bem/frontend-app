class Explore {
  constructor(ActivityAreaService,InstitutionService,StorageService) {
    this.activityAreaService = ActivityAreaService
    this.institutionService = InstitutionService
    this.profile = StorageService.getItem('profile')
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    }
    this.isOpen = false
    this.getInstitutions()
    this.getActivityAreas()
    this.search = () => this.getSearch(this.query)
  }
  getInstitutions() {
    this.institutionService.findAll()
      .then(response => {
        this.institutions = response.data.values
        // console.log(this.institutions)
      })
  }
  getSearch(data) {
    data = angular.copy(data)
    if (data.area_activity_uuid) {
      data.area_activity_uuid = data.area_activity_uuid.uuid
    }
    this.institutionService.search(data)
      .then(response => this.institutions = response.data.values)
  }
  getActivityAreas() {
    this.activityAreaService.findAll()
      .then(response => this.area_activities = response.data.values)
  }
}

Explore.$inject = ['ActivityAreaService','InstitutionService','StorageService']

export default Explore