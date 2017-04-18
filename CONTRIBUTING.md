![Eventos do Bem Logo](/assets/images/evb-logo.svg)

---

### Status: eventos :heart: do bem
| branch: master | branch: production | website: master | website: production |
| - | - | - | - |
| [![Master: Build Status](https://img.shields.io/travis/eventos-do-bem/frontend-app/master.svg)](https://travis-ci.org/eventos-do-bem/frontend-app/branches) | [![Production: Build Status](https://img.shields.io/travis/eventos-do-bem/frontend-app/production.svg)](https://travis-ci.org/eventos-do-bem/frontend-app/branches) | [![Website: Status]( https://img.shields.io/website-up-down-green-red/https/frontend.eventosdobem.com.svg)](https://frontend.eventosdobem.com) | [![Website: Status]( https://img.shields.io/website-up-down-green-red/https/www.eventosdobem.com.br.svg)](https://www.eventosdobem.com.br) |

---

# Contribuindo

## GitHub

- Faça um *Fork* do [repositório](https://github.com/eventos-do-bem/frontend-app)
- Colabore com features ou hotfixes listadas nas [*issues*](https://github.com/eventos-do-bem/frontend-app/issues)
- Devolva a colaboração para análise e aceitação : )

### **Use as tarefas e boas práticas colocadas a seguir*:

## Tarefas úteis para desenvolvimento

| Comando  | Descrição |
| - | - |
| `npm install` ou `npm i` | Instala os pacotes do projeto necessários para desenvolvimento. |
| `npm run vendor:build` | Concatena e minifica os arquivos de libs externas usadas no projeto. Necessário antes do comando `npm start`. |
| `npm start`  | Usado para desenvolvimento, ele concatena e minifica o arquivo bundle. A cada alteração ele executa novamente o build (apenas de arquivos do projeto para (`bundle[.min].js`)). |
| `npm run prod` | Executa as tarefas de concatenação e minificação dos arquivos do projeto, libs externas e estilos (usado no travis-ci para deploy). |

---

## Práticas usadas no desenvolvimento

### Novas features
Para codar uma feature, a partir da branch `master`:

```shell
git checkout -b feature/minha-feature master
//codificação
```

ou

```shell
git flow feature start minha-feature
//codificação
```

---

### Colocar a feature na `master`:
```shell
git add paths
git commit -m "Título do commit (quebra de linha)
(quebra de linha)
Resolvido item x
Resolvido item y
"
git checkout master
git merge --no-ff feature/minha-feature
git branch -d feature/minha-feature
```

**A flag `--no-ff` evita que informações de histórico da feature sejam perdidas.*

ou

```shell
git add paths
git commit -m "Título do commit (quebra de linha)
(quebra de linha)
Resolvido item x
Resolvido item y
"
git flow feature finish minha-feature
```

---

### Hotfix

Para resolver um bug urgente, comece a partir da branch `production` e as alterações devem voltar (merge) para as branches `master` e `production`:

```shell
git checkout -b hotfix/bugfix_x production
//codificação
```

ou

```shell
git flow hotfix start bugfix_x
//codificação
```

---

### Finalizando o hotfix

```shell
git add paths
git commit -m "Título do commit (quebra de linha)
(quebra de linha)
Resolvido item x
Resolvido item y
"
git checkout production
git merge --no-ff hotfix/bugfix_x
git checkout master
git merge --no-ff hotfix/bugfix_x
git branch -d hotfix/bugfix_x
```

ou

```shell
git add paths
git commit -m "Título do commit (quebra de linha)
(quebra de linha)
Resolvido item x
Resolvido item y
"
git flow hotfix finish bugfix_x
```

---

Qualquer dúvida entrar em contato @guiseek "Guilherme" <<guilherme@eventosdobem.com.br>>

### O :earth_americas: agradece sua colaboração! : )