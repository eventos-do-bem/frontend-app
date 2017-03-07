export default class OngDonations {
  constructor(ProfileService, StorageService) {
    this.profileService = ProfileService
    this.storage = StorageService
    this.pagination = { current_page: 1 }
    this.profile = this.storage.getItem('profile')
    this.getPayments()
    this.total = 0
  }
  getPayments() {
    this.profileService.getPayments({
      page: this.pagination.current_page,
      updated_at: 'DESC'
    }).then(
      response => {
        this.pagination = response.data.meta.pagination
        console.log(response.data.values)
        this.total = response.data.values.reduce((previousValue, currentValue) => {
          return {amount: previousValue.amount + currentValue.amount}
        })
        console.log(this.total)
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

OngDonations.$inject = ['ProfileService','StorageService']