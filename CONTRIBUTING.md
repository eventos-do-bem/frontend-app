# Contribuindo

![Eventos do Bem Logo](https://rawgit.com/eventos-do-bem/frontend-app/master/assets/images/evb-logo.svg)

---

### Status: eventos :heart: do bem
| branch: master | branch: production | website: master | website: production |
| - | - | - | - |
| [![Master: Build Status](https://img.shields.io/travis/eventos-do-bem/frontend-app/master.svg)](https://travis-ci.org/eventos-do-bem/frontend-app/branches) | [![Production: Build Status](https://img.shields.io/travis/eventos-do-bem/frontend-app/production.svg)](https://travis-ci.org/eventos-do-bem/frontend-app/branches) | [![Website: Status]( https://img.shields.io/website-up-down-green-red/https/frontend.eventosdobem.com.svg)](https://frontend.eventosdobem.com) | [![Website: Status]( https://img.shields.io/website-up-down-green-red/https/www.eventosdobem.com.br.svg)](https://www.eventosdobem.com.br) |

---

# GitHub

Faça um *Fork* do [repositório](https://github.com/eventos-do-bem/frontend-app) para sua conta

## Clone seu repositório e acesse o diretório
```shell
git clone https://github.com/YOUR_USERNAME/frontend-app.git
cd frontend-app
```

## Configure o repositório remoto

### Liste os repositórios remotos configurados para seu fork
```shell
git remote -v
origin https://github.com/YOUR_USERNAME/frontend-app.git (fetch)
origin https://github.com/YOUR_USERNAME/frontend-app.git (push)
```

### Especifique um novo repositório remoto como upstream que será sincronizado com o fork.
```shell
git remote add upstream https://github.com/eventos-do-bem/frontend-app.git
```

### Verifique o novo repositório upstream que você especificou para o seu fork.
```shell
git remote -v
origin https://github.com/YOUR_USERNAME/frontend-app.git (fetch)
origin https://github.com/YOUR_USERNAME/frontend-app.git (push)
upstream https://github.com/eventos-do-bem/frontend-app.git (fetch)
upstream https://github.com/eventos-do-bem/frontend-app.git (push)
```

### Mãos à Obra
- Colabore com features ou hotfixes listadas nas [*issues*](https://github.com/eventos-do-bem/frontend-app/issues)
- Faça pull request da colaboração em seu fork para análise e aceitação no repositório original : )

:exclamation: **Não esqueça de atualizar seu repositório em novas colaborações**:
```shell
git fetch upstream
```

---

## Tarefas úteis para desenvolvimento

| Comando  | Descrição |
| - | - |
| `npm install` ou `npm i` | Instala os pacotes do projeto necessários para desenvolvimento. |
| `npm run vendor:build` | Concatena e minifica os arquivos de libs externas usadas no projeto. Necessário antes do comando `npm start`. |
| `npm start`  | Usado para desenvolvimento, ele concatena e minifica o arquivo bundle e estilos. A cada alteração é executado novamente o build. |
| `npm run prod` | Executa as tarefas de concatenação e minificação dos arquivos do projeto, libs externas e estilos (usado no travis-ci para deploy). |

---

## Práticas usadas no desenvolvimento

### Novas features
Para codar uma feature, a partir da branch `master`:

```shell
git checkout -b feature/nova-feature master
//codificação
```

ou

```shell
git flow feature start nova-feature
//codificação
```

### Colocar a feature na `master`:
```shell
git add paths
git commit -m "Título do commit (quebra de linha)
(quebra de linha)
Resolvido item x
Resolvido item y
"
git checkout master
git merge --no-ff feature/nova-feature
git branch -d feature/nova-feature
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
git flow feature finish nova-feature
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