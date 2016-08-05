import CommonService  from './../common/service/common.js'

export default class FaqService {
  constructor(API, $http, $q) {
    this.$q = $q
    this.categories = [
      {
        id: 1,
        name: 'Criadores de campanhas',
        questions: [
          {
            id: 1,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 2,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 3,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 4,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 5,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 6,
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
            id: 1,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 2,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 3,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 4,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 5,
            title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
            question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
          },
          {
            id: 6,
            title: 'Question 2',
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
  }
  getCategories() {
    let deferred = this.$q.defer()
    deferred.resolve(this.categories)
    return deferred.promise
  }
  getCategory(id) {
    let deferred = this.$q.defer()
    let category = this.categories.filter(value => {
      return value.id == id
    })
    deferred.resolve(category[0])
    return deferred.promise
  }
  getQuestion(id) {
    let deferred = this.$q.defer()
    let category = this.categories.map(category => {
      return category.questions.filter(question => {
        return question.id == id
      })
    }).filter(category => {
      return category.length > 0
    })
    deferred.resolve(category[0][0])
    return deferred.promise
  }
}

FaqService.$inject = ['API','$http','$q']