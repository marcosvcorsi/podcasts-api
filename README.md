## Podcasts API

![CI](https://github.com/marcosvcorsi/podcasts-api/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/marcosvcorsi/podcasts-api/badge.svg?branch=main)](https://coveralls.io/github/marcosvcorsi/podcasts-api?branch=main)

## O que o projeto faz?

- Cadastrar um podcast com nome, descrição e links
- Faz a listagem e filtro dos podcasts paginados.

---

## Tecnologias

- [Node.js](https://nodejs.org/en/)

- [Typescript](https://www.typescriptlang.org/)

- [Express](https://expressjs.com/pt-br/)

- [Mongoose](https://mongoosejs.com/)

- [Jest](https://jestjs.io/pt-BR/)

---

## Download e instalação:

```bash
# Baixando o projeto
git clone https://github.com/marcosvcorsi/podcasts-api.git

# Acessando a pasta
$ cd podcasts-api

# Instalando as dependencias
# Com Yarn
$ yarn
```

## Execução

```bash
# Banco de dados MongoDB no docker
$ docker-compose up -d

# Ambiente de desenvolvimento
$ yarn dev

# Testes unitários e integração
$ yarn test

# Gera o código de produção JavaScript
$ yarn build

# Sobe a aplicação de produção
$ yarn start
```

## Rotas da aplicação

[Swagger da aplicação local](http://localhost:3000/api-docs)

### Cadastrar Podcast

Insere um novo podcast com nome, descrição e links. O nome deve ser unico na base de dados.

```bash
curl --request POST \
  --url http://localhost:3000/api/podcasts \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "teste",
	"description": "teste",
	"links": [
		"http://teste.com"
	]
}'
```

### Listar Podcasts

Retorna os ultimos 10 podcasts, ordenados do mais recente para o mais antigo.

```bash
curl --request GET \
  --url 'http://localhost:3000/api/podcasts' \
  --header 'Content-Type: application/json'
```

### Listar Podcasts com Paginação

Retorna os podcasts utilizando paginação, padrão é pagina 1 e limitado a 10.

```bash
curl --request GET \
  --url 'http://localhost:3000/api/podcasts?page=1&limit=10' \
  --header 'Content-Type: application/json'
```

### Buscar Podcasts por nome

Retorna os podcasts utilizando uma busca parcial pelo nome.

```bash
curl --request GET \
  --url 'http://localhost:3000/api/podcasts?search=teste' \
  --header 'Content-Type: application/json'
```
