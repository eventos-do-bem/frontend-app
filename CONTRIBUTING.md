# Contribuindo

## GitHub

- Faça um *Fork* do [repositório](https://github.com/eventos-do-bem/frontend-app)
- Colabore com features / hotfix das *issues*
- Devolva a colaboração para análise e aceitação : )

### **Use as tarefas e boas práticas colocadas a seguir*:

## Tarefas úteis para desenvolvimento

| Comando  | Descrição |
| - | - |
| `npm install` ou `npm i` | Instala os pacotes do projeto, necessários para desenvolvimento. |
| `npm run vendor:build` | Concatena e minifica os arquivos de libs externas usadas no projeto. Necessário antes do comando `npm start`.  |
| `npm start`  | Usado para desenvolvimento, concatena e minifica os arquivos vendor e bundle. A cada alteração ele executa novamente o build (apenas de arquivos do projeto (`bundle[.min].js`)). |
| `npm run prod` | Executa as tarefas de concatenação e minificação dos arquivos do projeto, libs externas e estilos (usado no travis-ci para deploy). |

### **`npm run prod` pode ser usado antes do commit/push no repositório (branch `master`) para verificação de integridade nos arquivos gerados.**

---

## Práticas usadas no desenvolvimento

### Novas features
Para codar uma feature, a partir da branch `master`:

```shell
git checkout -b feature/minha-feature master
```

ou

```shell
git flow feature start minha-feature
```

---

### Colocar a feature na `master`:

```shell
git checkout master
git merge --no-ff feature/minha-feature
git branch -d feature/minha-feature
```

**A flag `--no-ff` evita que informações de histórico da feature sejam perdidas.*

ou

```shell
git flow feature finish minha-feature
```

---

### Hotfix

Para resolver um bug urgente, comece a partir da branch `production` e as alterações devem voltar (merge) para as branches `master` e `production`:

```shell
git checkout -b hotfix/bugfix_x production
```

ou

```shell
git flow hotfix start bugfix_x
```

---

### Finalizando o hotfix

```shell
git checkout production
git merge --no-ff hotfix/bugfix_x
git checkout master
git merge --no-ff hotfix/bugfix_x
git branch -d hotgix/bugfix_x
```

ou

```shell
git flow hotfix finish bugfix_x
```

---

Qualquer dúvida entrar em contato "Gui Seek" <guiseek@gmail.com>

Desde já agradeço a colaboração : )