export default class OngDonations {
  constructor(ProfileService, InstitutionService, StorageService) {
    this.profileService = ProfileService
    this.institutionService = InstitutionService
    this.storage = StorageService
    this.pagination = { current_page: 1 }
    this.profile = this.storage.getItem('profile')
    this.getPayments()
    this.getStatistics()
    this.total = 0
  }
  getStatistics() {
    this.institutionService.getStatistics()
      .then(response => {
        let statistics = response.data
        this.statistics = statistics
        this.statistics.total = parseFloat(statistics.totalDirectDonationReceived) + parseFloat(statistics.totalSubscriptionDonationReceiveD)
      })
  }
  getPayments() {
    this.profileService.getPayments({
      page: this.pagination.current_page,
      updated_at: 'DESC'
    }).then(
      response => {
        this.pagination = response.data.meta.pagination
        this.donations = response.data.values.map(donation => {
          if (donation.iugu_url) {
            donation.iugu_url = donation.iugu_url.replace('?bs=true','.pdf')
          }
          donation.updated_at = new Date(donation.updated_at)
          return donation
        })
      })
  }
  changePage() {
    this.getPayments()
  }
}

OngDonations.$inject = ['ProfileService', 'InstitutionService', 'StorageService']