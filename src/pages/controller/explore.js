class Explore {
  constructor(ActivityAreaService,InstitutionService) {
    this.activityAreaService = ActivityAreaService
    this.institutionService = InstitutionService
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    }
    this.getInstitutions()
    this.getActivityAreas()
    this.search = () => this.getSearch(this.query)
  }
  getInstitutions() {
    this.institutionService.findAll()
      .then(response => this.institutions = response.data.values)
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

Explore.$inject = ['ActivityAreaService','InstitutionService']

export default Explore