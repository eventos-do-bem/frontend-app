class Explore {
  constructor(InstitutionService,$http) {
    this.institutionService = InstitutionService
    this.http = $http
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    }
    this.getAreaActivities()
    this.search = {
      ong: () => this.getInstitutions()
    }
  }
  getInstitutions() {
    this.institutionService.findAll()
      .then(response => this.institutions = response.data.values)
  }
  getAreaActivities() {
    this.http.get('data/area_activities.json')
      .then(response => this.area_activities = response.data)
  }
}

Explore.$inject = ['InstitutionService','$http']

export default Explore