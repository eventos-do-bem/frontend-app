export default class Home {
  constructor($scope,$interval) {
    let categories = ['fazer um jantar','fazer um aniversário','fazer uma corrida','dar uma festa'],
        length = 4,
        count = 0
    
    $interval(() => {
      count++
      if (count >= length) count = 0
      this.category = categories[count]
    }, 2000)

    this.impacts = [
      {
        id: 'health',
        active: true,
        color: '#3b94d0',
        icon: 'assets/icons/svgs/saude.svg',
        label: 'Saúde',
        image: 'assets/images/saude.jpeg',
        title: '"O projeto está sendo parte fundamental do meu tratamento. Sem esse apoio não teria chegado até aqui." Lia Mantovani',
        text: '<p>A Eventos do Bem foi a plataforma responsável pela arrecadação dos recursos para a abertura do CNPJ do Portal SuperAção. O Portal SuperAção tem a missão de levar apoio emocional e informação em saúde integral de forma inclusiva, para pacientes com câncer e seus familiares, em todo Brasil.</p><p>Para isso, o Portal criou uma rede onde um pacientes em tratamento do câncer ou seu familiar (SuperaDor) recebe apoio de outro que já passou exatamente pela mesma situação e superou (Anjo), com o apoio de um profissional voluntário que garante a segurança dessa relação.</p><p>Hoje, a ONG precisa manter seus serviços e está construindo um aplicativo para ampliar sua capacidade de atendimento para 10 a 50 mil participantes. Ajude o Portal a realizar o sonho de levar amor a mais pessoas, criando um evento do bem!</p>'
      },
      {
        id: 'education',
        active: false,
        color: '#f25d61',
        icon: 'assets/icons/svgs/causa-educacao.svg',
        label: 'Educação',
        image: 'assets/images/educacao.jpeg',
        title: 'Apoiando os sonhos das crianças do Projeto Vida.',
        text: '<p>Quando algumas das crianças do Projeto Vida são perguntadas sobre o que querem ser quando crescer, não há dúvidas: Amanda quer ser professora e Juliana advogada criminal (como os personagens do seriado que assiste!).</p><p>Essas meninas podem contar com o apoio do Projeto Vida, que atua com crianças que moram na comunidade da Vila Missionária, possibilitando um futuro melhor por meio de apoio escolar, mentoria personalizada e atividades lúdicas de aprendizado.</p><p>Com o objetivo de aumentar ainda mais esse bem, voluntários e mais de 100 apoiadores por meio de eventos do bem de aniversário ajudaram crianças como a Juliana e Amanda apoiando seus sonhos.</p><p>Você pode fazer um evento do bem e expandir ainda mais o apoio que o Projeto Vida dá para as crianças da Vila Missionária! Além disso, você e os apoiadores da campanha são convidados a conhecer o bem que vocês geraram ao vivo!</p>'
      },
      {
        id: 'habitation',
        active: false,
        color: '#179b48',
        icon: 'assets/icons/svgs/moradia.svg',
        label: 'Moradia',
        image: 'assets/images/moradia.jpeg',
        title: 'Dona Quitéria está melhorando seu lar.',
        text: `<p>"Pra mim foi um sonho. Até hoje eu não consigo dormir direito, até hoje eu levanto pra olhar né, ver se a cozinha tá do mesmo jeito... Meu Deus! Como está linda a minha casa!"</p><p>Foram realizados eventos do bem para apoiar reformas de moradias insalubres localizadas no Jardim Pantanal - SP, uma região de periferia e que sofre recorrentes alagamentos do rio Tietê que está nas proximidades da comunidade.</p><p>O Moradigna é um negócio social localizado em São Paulo que busca possibilitar moradias mais dignas para famílias de comunidades de baixa-renda, possibilitando uma melhor qualidade de vida para pessoas das classes C e D.</p><p>Faça um evento do bem, mobilizando seus amigos e conhecidos para fortalecer pessoas e famílias de alta vulnerabilidade social como de Dona Quitéria que agora olham para seus cômodos e sentem-se encorajados para crescer ainda mais.</p>`
      },
      {
        id: 'humans',
        active: false,
        color: '#9060c3',
        icon: 'assets/icons/svgs/humanos.svg',
        label: 'Direitos humanos',
        image: 'assets/images/direitos-humanos.jpeg',
        title: '"Se eu consegui, vocês também conseguem!"',
        text: '<p>Este é o testemunho de Dener, o primeiro atendido recuperado no Projeto Ruas, que atualmente já trabalha e tem moradia.</p><p>"Se foi possível para mim, será possível para vocês também...<br>Quando eu estava na rua, eu esperava ansioso todas as terças para encontrar com o pessoal do projeto que me incentivaram a viver. Hoje eu estou aqui fazendo parte da equipe Ruas, tentando salvar vidas como a minha foi salva."</p><p>O Projeto Ruas é um laboratório de inovação social focado em população em situação de rua, atuando em bairros e comunidades com o intuito de aproximar residentes da população de rua de sua região.</p><p>Em 2016 foi realizado um evento do bem no qual um aniversário possibilitou 20 rondas atendendo cerca de 400 pessoas que como o Dener estavam em situação de rua.</p>'
      }
    ]
    this.impact = this.impacts[0]
  }
  loadImpact(index, event) {
    let colors
    this.icons = document.querySelectorAll('.proven-impact .icons object')
    this.icons.forEach(icon => {
      colors = icon.contentDocument.querySelectorAll('.color')
      colors.forEach(color => color.style.fill = '#000000')
    })
    if (event) {
      let target = event.target
      target.classList.add('active')
      colors = target.children[0].contentDocument.querySelectorAll('.color')
      colors.forEach(color => color.style.fill = this.impacts[index].color)
    }
    this.impacts.map(impact => impact.active = false)
    this.impacts[index].active = true
    this.impact = this.impacts[index]
  }
}

Home.$inject = ['$scope','$interval']