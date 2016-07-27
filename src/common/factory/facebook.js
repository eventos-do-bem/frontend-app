export default class FacebookFactory {
  constructor($window, $timeout, $q) {
    this.options = {
      appId: null,
      status: true,
      cookie: false,
      xfbml: false,
      version: 'v2.4',
      scope: ''
    }
    let options = ['appId','status','cookie','xfbml','version','scope']
    options.map(name => {
      this[name] = angular.bind(this, this.getSetOption, name)
    })
    this.FB = null
    this.FBPromise = null
    this.initPromise = null
    this.$window = $window
    this.$timeout = $timeout
    this.$q = $q
    this.loading = false
    this.loaded = false
    this.initialized = false
  }
  getSetOption(name, val) {
    if (val === void 0) {
      return this.options[name]
    }
    this.options[name] = val
    return this
  }
  handleResponse(response) {
    if (!response || response.error) {
      this.reject(response && response.error || false)
    } else {
      this.resolve(response)
    }
  }
  addCallbackToPromise(deferred, callback) {
    let promise = deferred.promise
    if (typeof callback === 'function') {
      promise.then(callback)
    }
    return promise
  }
  load() {
    if (!this.FBPromise) {
      let deferred = this.$q.defer()
      this.$window.fbAsyncInit = () => {
        this.FB = this.$window.FB
        this.loading = false
        this.loaded = true
        this.$timeout(() => deferred.resolve(FB))
      }
      ((d, s, id) => {
        let js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/pt_BR/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(this.$window.document, 'script', 'facebook-jssdk')

      this.loading = true

      this.FBPromise = deferred.promise
    }
    return this.FBPromise
  }
  init(params) {
    if (!this.initPromise) {
      this.initPromise = this.load().then(FB => {
        params = angular.extend({
          appId: this.options.appId,
          status: this.options.status,
          cookie: this.options.cookie,
          xfbml: this.options.xfbml,
          version: this.options.version
        }, params)

        if (!params.appId) {
          throw new Error('FacebookService: appId is not set')
        }

        FB.init(params)

        this.initialized = true

        return FB
      })
    }
    return this.initPromise
  }
  getLoginStatus(callback) {
    return this.init().then(FB => {
      let deferred = this.$q.defer()

      FB.getLoginStatus(angular.bind(deferred, this.handleResponse))

      return this.addCallbackToPromise(deferred, callback)
    })
  }
  api() {
    let apiArgs = arguments

    return this.init().then(FB => {
      let deferred = this.$q.defer(),
          args = Array.prototype.slice.call(apiArgs),
          callback
      
      if (typeof args[args.length - 1] === 'function') {
        callback = args.pop()
      }
      args.push(angular.bind(deferred, this.handleResponse))

      FB.api.apply(FB, args)

      return this.addCallbackToPromise(deferred, callback)
    })
  }
  login(callback, opts) {
    return this.init().then(FB => {
      let deferred = this.$q.defer()

      if (typeof callback !== 'function') {
        callback = null
        opts = callback
      }

      let getOpt = name => {
        let val = opts && opts[name]
        return val === void 0 ? this.options[name] : val
      }

      FB.login(angular.bind(deferred, this.handleResponse), {
        scope: getOpt('scope')
      })

      return this.addCallbackToPromise(deferred, callback)
    })
  }
  logout(callback) {
    return this.getLoginStatus().then(response => {
      let deferred = this.$q.defer()

      if (response.authResponse) {
        this.FB.logout(angular.bind(deferred, callback))
      } else {
        deferred.reject(response)
      }

      return this.addCallbackToPromise(deferred, callback)
    })
  }
  disconnect(callback) {
    return this.init().then(FB => {
      let deferred = this.$q.defer()

      FB.api('/me/permissions', 'DELETE', angular.bind(deferred, this.handleResponse))

      return this.addCallbackToPromise(deferred, callback)
    })
  }
  static facebookFactory($window, $timeout, $q) {
    return new FacebookFactory($window, $timeout, $q)
  }
}

FacebookFactory.facebookFactory.$inject = ['$window', '$timeout', '$q']