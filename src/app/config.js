export default function AppConfig($httpProvider, envServiceProvider, $provide, $urlRouterProvider, $sceDelegateProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      development: ['127.0.0.1:8000', 'localhost:8000', 'frontend.eventosdobem.com'],
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
      // anotherStage: ['domain1', 'domain2'], 
      // anotherStage: ['domain1', 'domain2'] 
    },
    vars: {
      development: {
        apiUrl: 'https://dev.eventosdobem.com/api/',
        staticUrl: 'https://frontend.eventosdobem.com/',
        accept: "application/vnd.api.v1+json",
        contenttype: "application/json",
        token: "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg",
        fbAppId: "922781867788493",
        fbVersion: "v2.6"
      },
      production: {
        apiUrl: 'https://prod.eventosdobem.com/api/',
        staticUrl: 'https://production.eventosdobem.com/',
        accept: "application/vnd.api.v1+json",
        contenttype: "application/json",
        token: "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg",
        fbAppId: "813381015395246",
        fbVersion: "v2.6"
      }
      // anotherStage: { 
      // 	customVar: 'lorem', 
      // 	customVar: 'ipsum' 
      // } 
    }
  })

  // run the environment check, so the comprobation is made 
  // before controllers and services are built 
  envServiceProvider.check()

  $provide.decorator('taOptions', ['$delegate', function(taOptions) {
    taOptions.toolbar = [
      ['h1'],['h2'],['h3'],['h4'],['h5'],['h6'],['p'],['bold'],['italics'],['underline'],['ul'],['ol'],['redo'],['undo'],['clear'],['justifyLeft'],['justifyCenter'],['justifyRight'],['insertImage'],['insertLink'],['insertVideo']
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
    "http://www.youtube.com/embed/**",
    "https://www.youtube.com/embed/**"
  ])

  $urlRouterProvider.otherwise('/#')
}