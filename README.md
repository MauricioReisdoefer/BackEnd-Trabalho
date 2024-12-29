# Fórum API - Back-End

Este é um projeto de back-end para um fórum, desenvolvido como trabalho para uma disciplina acadêmica. Utiliza Node.js com o framework [Express](https://expressjs.com/) para o servidor e [Sequelize](https://sequelize.org/) como ORM para manipulação do banco de dados.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **SQLite** 

---

## Principais Rotas

### Rotas de Usuário (`/User`)

- **`POST /User/CreateUser`**  
  Cria um novo usuário.

- **`GET /User/GetUser/:id`**  
  Retorna os dados de um usuário específico pelo `id`.

- **`GET /User/RemoveUser/:id`**  
  Remove um usuário pelo `id`.

- **`PUT /User/UpdateUser/:id`**  
  Atualiza os dados de um usuário específico pelo `id`.

- **`GET /User/AllUsers`**  
  Retorna uma lista com todos os usuários cadastrados.

- **`GET /User/GetUser/Topics/:id`**  
  Retorna os tópicos criados por um usuário específico pelo `id`.

- **`GET /User/GetUser/Posts/:id`**  
  Retorna os posts criados por um usuário específico pelo `id`.

---

### Rotas de Tópicos (`/Topic`)

- **`POST /Topic/CreateTopic`**  
  Cria um novo tópico.

- **`GET /Topic/GetTopic/:id`**  
  Retorna os dados de um tópico específico pelo `id`.

- **`GET /Topic/RemoveTopic/:id`**  
  Remove um tópico pelo `id`.

- **`PUT /Topic/UpdateTopic/:id`**  
  Atualiza os dados de um tópico específico pelo `id`.

- **`GET /Topic/GetTopic/Posts/:id`**  
  Retorna os posts associados a um tópico específico pelo `id`.

---

### Rotas de Posts (`/Posts`)

- **`POST /Posts/CreatePost`**  
  Cria um novo post.

- **`GET /Posts/GetPost/:id`**  
  Retorna os dados de um post específico pelo `id`.

- **`GET /Posts/RemovePost/:id`**  
  Remove um post pelo `id`.

- **`PUT /Posts/UpdatePost/:id`**  
  Atualiza os dados de um post específico pelo `id`.

---

## Contribuição

Caso queira contribuir com melhorias, sinta-se à vontade para enviar um Pull Request ou abrir uma Issue.

---