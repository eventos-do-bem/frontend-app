export default function AppConfig ($httpProvider, envServiceProvider, $provide, $urlRouterProvider, $sceDelegateProvider, ZendeskWidgetProvider, TourConfigProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      devlocal: [
        '127.0.0.1:8000',
        'localhost:8000'
      ],
      development: [
        'frontend.eventosdobem.com'
      ],
      production: [
        'production.eventosdobem.com.br',
        'production.eventosdobem.com',
        'eventodobem.com.br',
        'eventosdobem.com',
        'eventodobem.com',
        'eventosdobem.com.br',
        'www.eventodobem.com.br',
        'www.eventosdobem.com',
        'www.eventodobem.com',
        'www.eventosdobem.com.br'
      ]
    },
    vars: {
      devlocal: {
        // apiUrl: 'http://dev.eventosdobem.app/api/',
        apiUrl: 'https://dev.eventosdobem.com/api/',
        staticUrl: 'http://localhost:8000/',
        accept: 'application/vnd.api.v1+json',
        contenttype: 'application/json',
        token: '0IphXRqJZe9wkMYQJJBp2X0TsVjQyg',
        fbAppId: '922781867788493',
        fbVersion: 'v2.6'
      },
      development: {
        apiUrl: 'https://dev.eventosdobem.com/api/',
        staticUrl: 'https://frontend.eventosdobem.com/',
        accept: 'application/vnd.api.v1+json',
        contenttype: 'application/json',
        token: '0IphXRqJZe9wkMYQJJBp2X0TsVjQyg',
        fbAppId: '922781867788493',
        fbVersion: 'v2.6'
      },
      production: {
        apiUrl: 'https://prod.eventosdobem.com/api/',
        staticUrl: 'https://production.eventosdobem.com/',
        accept: 'application/vnd.api.v1+json',
        contenttype: 'application/json',
        token: '0IphXRqJZe9wkMYQJJBp2X0TsVjQyg',
        fbAppId: '813381015395246',
        fbVersion: 'v2.6'
      }
      // anotherStage: {
      //  'customVar': 'lorem',
      //  'customVar': 'ipsum'
      // }
    }
  })

  // run the environment check, so the comprobation is made
  // before controllers and services are built
  envServiceProvider.check()

  window.zESettings = {
    webWidget: {
      color: { theme: '#EF3C49' }
    }
  }
  ZendeskWidgetProvider.init({
    // color: { theme: '#EF3C49' },
    accountUrl: 'help-eventosdobem.zendesk.com',
    beforePageLoad: function (zE) {
      zE.setLocale('pt-BR')
      // zE.setTheme('#EF3C49')
    }
  })

  $provide.decorator('taOptions', ['$delegate', function (taOptions) {
    taOptions.toolbar = [
      ['h1'], ['h2'], ['h3'], ['h4'], ['h5'], ['h6'], ['p'], ['bold'], ['italics'], ['underline'], ['ul'], ['ol'], ['redo'], ['undo'], ['clear'], ['justifyLeft'], ['justifyCenter'], ['justifyRight'], ['insertImage'], ['insertLink'], ['insertVideo']
    ]
    taOptions.classes = {
      focussed: 'focussed',
      toolbar: 'btn-group btn-group-justified',
      toolbarGroup: 'btn-group',
      toolbarButton: 'btn btn-default text-center',
      toolbarButtonActive: 'active',
      disabled: 'disabled',
      textEditor: 'form-control',
      htmlEditor: 'form-control'
    }
    // taOptions.disableSanitizer = false;
    return taOptions
  }])

  $httpProvider.interceptors.push('HttpInterceptor')
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://www.youtube.com/embed/**',
    'https://www.youtube.com/embed/**'
  ])

  TourConfigProvider.enableNavigationInterceptors()

  $urlRouterProvider.otherwise('/#')
}
