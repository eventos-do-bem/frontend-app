export default function AppConfig($httpProvider, envServiceProvider, $urlRouterProvider, $sceDelegateProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      development: ['127.0.0.1:8000', 'localhost:8000', 'frontend.eventosdobem.com'],
      production: ['production.eventosdobem.com.br', 'eventodobem.com.br', 'eventosdobem.com', 'eventodobem.com', 'eventosdobem.com.br', 'production.eventosdobem.com']
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
        fbAppId: "922781867788493"
        // fbAppId: "813381015395246"
      },
      production: {
        apiUrl: 'https://prod.eventosdobem.com/api/',
        staticUrl: 'https://production.eventosdobem.com/',
        accept: "application/vnd.api.v1+json",
        contenttype: "application/json",
        token: "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg",
        fbAppId: "813381015395246"
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

  $httpProvider.interceptors.push('HttpInterceptor')
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    "http://www.youtube.com/embed/**",
    "https://www.youtube.com/embed/**"
  ])

  $urlRouterProvider.otherwise('/#')
}