export default class UserDonations {
  constructor (ProfileService, StorageService, $filter) {
    this.profileService = ProfileService
    this.storage = StorageService
    this.filter = $filter
    this.pagination = { current_page: 1 }
    this.profile = this.storage.getItem('profile')
    this.getPayments()
  }
  getPayments () {
    this.profileService.getPayments({
      page: this.pagination.current_page,
      updated_at: 'DESC'
    }).then(
      response => {
        this.pagination = response.data.meta.pagination
        this.donations = response.data.values.map(donation => {
          if (donation.iugu_url) {
            donation.iugu_url = donation.iugu_url.replace('?bs=true', '.pdf')
          }
          donation.updated_at = donation.updated_at.replace(/(.+) (.+)/, '$1T$2Z')
          donation.updated_at = this.filter('date')(new Date(donation.updated_at), 'dd/MM/yyyy', 'Z')
          return donation
        })
      })
  }
  changePage () {
    this.getPayments()
  }
}

UserDonations.$inject = ['ProfileService', 'StorageService', '$filter']
