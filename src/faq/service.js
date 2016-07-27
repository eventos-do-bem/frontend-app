import CommonService  from './../common/service/common.js'

export default class FaqService {
  constructor(API, $http, $q) {
    this.$q = $q
    this.getQuestions = (id) => {
      let deferred = this.$q.defer()
      this.getCategories()
        .then(response => {
          let category = response.filter(value => {
            return value.id == id
          })
          return this.$q.resolve(category[0].questions)
        })
    }
    this.getCategory = (id) => {
      let deferred = this.$q.defer()
      this.getCategories()
        .then(response => {
          let category = response.filter(value => {
            return value.id == id
          })
          return this.$q.resolve(category[0])
        })
    }
    this.getCategories = () => {
      let deferred = this.$q.defer()
      let categories = [
        {
          id: 1,
          name: 'Criadores de campanhas',
          questions: [
            {
              id: 1,
              title: 'Question 1',
              question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
            },
            {
              id: 2,
              title: 'Question 2',
              question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
            }
          ]
        },
        {
          id: 2,
          name: 'Apoiadores',
          questions: [
            {
              id: 3,
              title: 'Question 3',
              question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
            },
            {
              id: 4,
              title: 'Question 4',
              question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
            }
          ]
        },
        {
          id: 3,
          name: 'Sobre a plataforma',
          questions: [
            {
              id: 5,
              title: 'Question 5',
              question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
            },
            {
              id: 6,
              title: 'Question 6',
              question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
            }
          ]
        }
      ]
      return this.$q.resolve(categories)
    }
  }

}

FaqService.$inject = ['API','$http','$q']