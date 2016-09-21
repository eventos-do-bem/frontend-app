export default class NotificationService {
  constructor() {
  }
  setRoute(route) {
    this.source = new EventSource(route)
    this.source.addEventListener('message', this.handleCallback, false)
  }
  handleCallback(response) {
    return JSON.parse(response.data)
  }
  handleError(response) {
    console.error(response)
  }
}