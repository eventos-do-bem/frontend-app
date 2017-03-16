# Contribuindo

## Novas features
Para codar uma feature, a partir da branch `master`:

```shell
git checkout -b feature/minha-feature master
```

ou

```shell
git flow feature start minha-feature
```

---

## Colocar a feature na `master`:

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

## Hotfix

Para resolver um bug urgente, comece a partir da branch `production` e as alterações devem voltar (merge) para as branches `master` e `production`:

```shell
git checkout -b hotfix/bugfix_x production
```

ou

```shell
git flow hotfix start bugfix_x
```

---

## Finalizando o hotfix

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