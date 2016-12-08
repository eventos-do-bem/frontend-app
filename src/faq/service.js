import CommonService  from './../common/service/common.js'

export default class FaqService {
  constructor(API, $http, $q) {
    this.$q = $q
    this.categories = [
      {
        id: 1,
        name: 'SOBRE A EVENTOS DO BEM',
        questions: [
          {
            id: 1,
            title: 'O que é a Eventos do Bem?',
            question: 'A Eventos do Bem é um negócio social de arrecadação de recursos (do inglês “fundraising”) para Organizações Sociais. Fazemos isso através de campanhas de arrecadação online, criadas e gerenciadas no nosso site, chamadas "eventos do bem", nas quais pessoas transformam eventos comemorativos e divertidos de suas vidas em motivação para ajudar projetos de impacto social e/ou ambiental (exemplo: no meu aniversário, peço a meus amigos e familiares que façam doações ao invés de presentes). Nossa missão é ajudar pessoas engajadas em causas de impacto socioambiental a ampliarem tanto seu financiamento quanto sua divulgação através de uma maior interação com a Organização Social de interesse. Assim, aproximamos pessoas de causas sociais e motivamos maior engajamento social.'
          },
          {
            id: 2,
            title: 'Como funciona?',
            question: `Na Eventos do Bem, você pode ajudar uma organização que representa a sua causa de duas formas:


1      Doando a um evento que está ativo.
2      Criando o seu próprio evento de arrecadação.
Para qualquer uma dessas opções, o primeiro passo é um cadastro simples e gratuito, sendo que você ainda pode optar por fazer login com suas mídias sociais.
 
Se você quiser apoiar um evento do bem, basta ir à página do evento de seu interesse e clicar no botão de efetivar a doação.
 
Se você for criar um evento do bem, é só clicar, na parte superior da tela, no botão amarelo para começar seu evento. É gratuito e dura menos de um minuto. Você só precisa escolher:
·         uma Organização Social a que quer ajudar,
·         um nome pro seu evento do bem,
·         o tipo de evento do bem (aniversário, casamento, etc)
·         a duração do seu evento do bem e, por último,
·       redigir uma mensagem explicando o que você gostaria de fazer no seu evento do bem.
 
Acabou! Seu evento do bem já está ativo e pronto para mudar o mundo!
Agora é só compartilhá-lo nas suas redes sociais, convidando todo mundo a se juntar a você.`
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