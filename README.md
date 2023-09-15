# Projeto Labeddit - Backend

O Labeddit consiste no backend de um projeto full stack de conclusão do Bootcamp Web Full Stack da Labenu, nele estaremos tratando sobre todo o conteúdo estudado desde o frontend até o backend, ao longo desse um ano de estudos e treinamentos.

O Labeddit se comporta como uma rede social. Seu objetivo é de promover a conexão e interação entre pessoas. A API da Labeddit permite criar usuários (signup), fazer login, criar posts e comentários, editá-los, curtir, descurtir e acompanhar a quantidade de curtidas, descurtidas e comentários que cada post possui.

<br>

## ✏️ Índice:

- <a href="#layout">Layout</a>
- <a href="#requisicoes">Requisições</a>
- <a href="#exemplos">Exemplos de Requisições</a>
- <a href="#documentacao-post">Documentação no Postman</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#como-rodar">Como Rodar o Projeto</a>
- <a href="#pessoas-autoras">Pessoas Autoras</a>

<br>

<span id="layout"></span>

## 1. 📐 Layout

### 1.1 Estrutura das Tabelas
<br>

![Tabelas](https://uploaddeimagens.com.br/images/004/608/186/full/Untitled_%281%29.png?1694779616)

## 1.2 Endpoints Implementados
<br>

### 🤓 Endpoints Users:
- [x] Signup
- [x] Login
- [x] Get Users

### 🤳 Endpoints Posts:
- [x] Create Post
- [x] Get Posts
- [x] Edit Post
- [x] Delete Post
- [x] Like / Dislike

### 📝 Endpoints Comments:
- [x] Create Comment
- [x] Get Comments
- [x] Edit Comment
- [x] Delete Comment
- [x] Like / Dislike

<br>
<span id="requisicoes"></span>

## 2. 📲 Requisições

### 2.1 - Requisições de Usuários
- `/users `

### 2.2 - Requisições de Postagens
- `/posts`

### 2.3 - Requisições de Comentários
- `/comments`

<br>
<span id="exemplos"></span>

## 3. Exemplos de Requisições

### 3.1 - Requisições de Usuários

### Signup: 
* Endpoint público utilizado para cadastro. Devolve um token JWT.

```json
// request POST /users/signup
// body JSON
{
    "name": "Flávia Fernanda",
    "email": "flavia2@email.com",
    "password": "flavia123"
}

// response
// status 201 CREATED
{
    "message": "registered user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1MTZmNWZjLTQxMGEtNGNlYi1iNzQ3LWUxYWUxYWJkNzcyNiIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5NDAzODIzNiwiZXhwIjoxNjk0NjQzMDM2fQ.8UbCvc6yzab7FiRBvcyHuObZR8QvHNqeG3rrhLGkUyo"
}
```
### Login: 
* Endpoint público utilizado para login. Devolve um token JWT.
```json
// request POST /users/login
// body JSON
{
    "email": "flavia@email.com",
    "password": "flavia123"
}

// response
// status 200 OK
{
    "message": "login done",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlYzNmNDA0LWQ5OWEtNGI3NC1iYmE1LTdkM2U1OTQ0ZWYzMyIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5NDA1MDI2MiwiZXhwIjoxNjk0NjU1MDYyfQ.kURjUFd9XDM2fcC8kLGL3yEE8e1UA3AFLzhRnZravcw"
}
```

### Get Users: 
* Endpoint protegido, requer um token jwt de um ADMIN para acessá-lo.
```json
// request GET /users
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "4ec3f404-d99a-4b74-bba5-7d3e5944ef33",
        "name": "Flávia Fernanda",
        "role": "ADMIN",
        "createdAt": "2023-09-06T22:08:32.278Z"
    },
    {
        "id": "2516f5fc-410a-4ceb-b747-e1ae1abd7726",
        "name": "Flávia Fernanda 2",
        "role": "NORMAL",
        "createdAt": "2023-09-06T22:10:36.017Z"
    }
]
```
<br>

### 3.2 - Requisições de Posts

### Create Post: 

* Executa a criação de novos posts. Endpoint protegido, requer um token jwt para acessá-lo.
```json
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour!"
}

// response
// status 201 CREATED
```

### Get Posts: 
* Endpoint protegido, requer um token JWT para acessá-lo.
```json
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "bce7f135-01b6-40e8-93e4-3349ef9179a2",
        "content": "Deus é lindo",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-09-08T18:40:40.802Z",
        "updatedAt": "2023-09-08T18:40:40.802Z",
        "creator": {
            "id": "4ec3f404-d99a-4b74-bba5-7d3e5944ef33",
            "name": "Flávia Fernanda"
        }
    },
    {
        "id": "802fb3ec-1faa-4d2d-8170-c62718641f7e",
        "content": "Eu tenho a mente milionária",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-09-08T18:41:56.335Z",
        "updatedAt": "2023-09-08T18:41:56.335Z",
        "creator": {
            "id": "4ec3f404-d99a-4b74-bba5-7d3e5944ef33",
            "name": "Flávia Fernanda"
        }
    }
]
```

### Edit Post: 
* Endpoint protegido, requer um token jwt para acessá-lo.
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```json
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Deus é bom o tempo todo!"
}

// response
// status 200 OK
```

### Delete Post: 
* Endpoint protegido, requer um token jwt para acessá-lo.
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.
```json
// request DELETE /posts/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
```

### Like or Dislike Post:
* Endpoint protegido, requer um token jwt para acessá-lo. 
* Caso dê um like em um post que já tenha dado like, o like é desfeito. 
* Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito. 
* Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
* Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

### Like (funcionalidade 1)
```json
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```json
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

### 3.3 - Requisições de Comentários

### Create Comment: 

* Executa a criação de novos comentários as postagens. Endpoint protegido, requer um token jwt para acessá-lo.
```json
// request POST /comments/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "tra-la-la2"
}

// response
// status 201 CREATED
{
    "message": "comment created"
}
```

### Get Comments: 
* Endpoint protegido, requer um token JWT para acessá-lo.
```json
// request GET /comments/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "3ba4972a-7f79-451f-b400-84070a783e26",
        "content": "xuxuzin",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-09-12T20:02:34.259Z",
        "updatedAt": "2023-09-12T20:02:34.259Z",
        "creator": {
            "id": "01768797-1d51-4af4-b0e3-8791bdbdb63b",
            "name": "Antonio josefino"
        }
    }
]
```

### Edit Comment: 
* Endpoint protegido, requer um token jwt para acessá-lo.
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```json
// request PUT /comments/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Deus é bom o tempo todo!"
}

// response
// status 200 OK
{
    "message": "updated comment"
}
```

### Delete Comment: 
* Endpoint que permite a exclusão de comentários, desde que o usuário esteja devidamente logado e seja o criador do comentário em questão ou um usuário ADMIN.
```json
// request DELETE /comments/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    "message": "comment deleted"
}
```

### Like or Dislike Post:
* Endpoint protegido, requer um token jwt para acessá-lo. 
* Caso dê um like em um comentário que já tenha dado like, o like é desfeito. 
* Caso dê um dislike em um comentário que já tenha dado dislike, o dislike é desfeito. 
* Caso dê um like em um comentário que tenha dado dislike, o like sobrescreve o dislike.
* Caso dê um dislike em um comentário que tenha dado like, o dislike sobrescreve o like.

### Like (funcionalidade 1)
```json
// request PUT /comments/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```json
// request PUT /comments/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

<br>
<span id="documentacao-post"></span>

## 4. 💾 Documentação do Postman

link: https://documenter.getpostman.com/view/26594531/2s9YC5zDD4

<br>
<span id="tecnologias"></span>

## 5. 🛠 Tecnologias e Ferramentas Utilizadas

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQL](https://learn.microsoft.com/pt-br/sql/?view=sql-server-ver16)
- [SQLite](https://www.sqlite.org/docs.html)
- [Knex.js](https://knexjs.org/guide/)
- [POO](https://labenu.notion.site/Paradigmas-de-programa-o-77a9b3b7072d48b2ad75fc359afde658)
- [Arquitetura em Camadas](https://labenu.notion.site/Introdu-o-arquitetura-f838b79564404d79a960e9cacc99556e)
- [Geração de UUID](https://labenu.notion.site/Identificador-nico-Universal-UUID-52dd33d6edc942ceb8b61870195c398f)
- [Geração de Hashes](https://labenu.notion.site/Criptografia-Hash-de-senhas-com-Bcrypt-455db6cae99641fb842a17c0901873c7)
- [Autenticação e Autorização](https://labenu.notion.site/Endpoints-protegidos-via-token-c48fc57b62fa4e60bc74c47a54becb9f)
- [Roteamento](https://labenu.notion.site/Middlewares-no-Express-564111c138384f24a142368f2cd7a39a)
- [Postman](https://www.postman.com/)

<br>
<span id="como-rodar"></span>

## 6. 🎥 Como Rodar o Projeto

### 6.1 - Ferramentas Necessárias
<p>Para poder rodar esse projeto na sua máquina, você precisa ter as seguintes ferramentas instaladas:</p>

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
<br>

### 6.2 - Clonando Repositório
```bash
# Clone este repositório
$ git clone <https://github.com/ffernanda85/projeto-labeddit-backend.git>
```
### 6.3 - Instalando as Dependências
```bash
# Instale as dependências
$ npm install
```

### 6.4 - Executando a Aplicação
```bash
$ npm run dev

# O servidor iniciará na porta: 3003, você poderá acessar a aplicação em: <http://localhost:3003>
```
<br>
<span id="pessoas-autoras"></span>

## 👩🏽‍💻Pessoas Autoras:

<img style='width:130px'  src='https://avatars.githubusercontent.com/u/114631584?v=4' alt='pessoa desenvolvedora'>

<h4>Flávia Santos</h4>

Linkedin: https://www.linkedin.com/in/flavia-santos-dev/
