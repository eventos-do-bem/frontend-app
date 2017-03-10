export default class UserDonations {
  constructor(ProfileService, StorageService) {
    this.profileService = ProfileService
    this.storage = StorageService
    this.pagination = { current_page: 1 }
    this.profile = this.storage.getItem('profile')
    this.getPayments()
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

UserDonations.$inject = ['ProfileService','StorageService']