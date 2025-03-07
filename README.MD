# Teste técnico Dynadok

Este projeto tem como objetivo a criação de um serviço de cadastro e consulta de clientes, implementado com **Express**, **MongoDB**, **Redis** e **RabbitMQ**.

## Índice

- [Índice](#indice)
- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Setup](#setup)
  - [Pré-requisitos](#pré-requisitos)
  - [Instruções](#instruções)
- [Start](#start)
  - [Endpoints](#endpoints)
  - [Testes](#testes)
- [Tecnologias](#tecnologias)
- [Ambiente](#ambiente)

## Características

- **Arquitetura baseada em Docker**: Uso de contêineres para isolar e orquestrar serviços.
- **Comunicação assíncrona com RabbitMQ**: Mensageria para comunicação entre serviços.
- **Banco de dados NoSQL MongoDB**: Armazenamento de dados não estruturados.
- **Cache com Redis**: Armazenamento de dados temporários para performance.
- **Jest**: Para testes automatizados.

## Estrutura do Projeto

A arquitetura está organizada de acordo com os princípios da Clean Architecture. O código está dividido em camadas com **controllers**, **services**, **repositórios**

- **controllers/**: Gerenciam as requisições HTTP e comunicam-se com os serviços.
- **services/**: Contêm a lógica de negócios, invocando repositórios e realizando operações.
- **repositories/**: Interagem diretamente com o banco de dados (MongoDB).
- **middlewares/**: Contêm a lógica de autenticação e validação.

## Setup

### Pré-requisitos

- [Node 18.0.0 LTS](https://nodejs.org/en/) -> Para rodar a aplicação.
- [NPM](https://www.npmjs.com) -> Para instalar e usar os scripts package.json.
- [Docker](https://docs.docker.com/get-started/get-docker/) -> Docker para criar e gerenciar os contêineres.
- [Docker Compose](https://docs.docker.com/compose/install/) -> Para orquestrar múltiplos contêineres e definir a configuração do ambiente.

### Instruções

Feito os pré-requisitos, o próximo passo é seguir estas instruções:

1. Clonar o repositório.

   ```bash
   git clone git@github.com:issetmeik/dynadok-test.git
   cd dynadok-test
   ```

2. Abra o terminal na pasta raiz do projeto e digite "npm install" para instalar todas as dependências.
3. Crie um arquivo chamado ".env" na raiz do projeto.
4. Use o seguinte código no arquivo criado:

   ```env
   APP_PORT=4600

   MONGO_HOST=mongo
   MONGO_PORT=27017
   MONGO_DB_NAME=dynadok

   REDIS_HOST=redis
   REDIS_PORT=6379

   RABBITMQ_AMQP_PORT=5672
   RABBITMQ_MANAGEMENT_PORT=15672
   RABBITMQ_USER=admin
   RABBITMQ_PASS=admin
   ```

5. Com a configuração concluída, você só precisa executar esses comandos:

   ```bash
   npm install

   npm run build

   docker-compose up --build
   ```

6. Se tudo estiver OK, a api estara disponivel através dessa baseurl: **localhost:4600/api**

7. Divirta-se! :D

# START

### Endpoints

### 1. Cadastro de Cliente

- **Método:** `POST`
- **URL:** `api/clients`
- **Descrição:** Cadastra um novo cliente no sistema.
- **Body (JSON):**
  ```json
  {
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "123456789"
  }
  ```

### 2. Consulta de Cliente

- **Método:** `GET`
- **URL:** `api/clients/{id}`
- **Descrição:** Retorna os detalhes de um cliente específico.
- **Parâmetros:** `id` (ID do cliente)
- **Resposta (JSON):**
  ```json
  {
    "data": {
      "_id": "67cafb80011272b05fc0947e",
      "name": "Carlos",
      "phone": "19983143758",
      "email": "carlos_1728@gmail.com",
      "validated": true,
      "createdAt": "2025-03-07T13:58:24.165Z",
      "updatedAt": "2025-03-07T13:58:24.185Z",
      "__v": 0
    },
    "error": null,
    "statusCode": 200
  }
  ```

### 3. Listar Clientes

- **Método:** `GET`
- **URL:** `api/clients`
- **Descrição:** Retorna a lista de todos os clientes cadastrados.
- **Resposta (JSON):**
  ```json
  {
    "data": [
      {
        "_id": "67cb490333b31a08b0c78c52",
        "name": "Carlos",
        "phone": "19983143758",
        "email": "carlos_1728@gmail.com",
        "validated": true,
        "createdAt": "2025-03-07T19:29:07.545Z",
        "updatedAt": "2025-03-07T19:29:07.562Z",
        "__v": 0
      },
      {
        "_id": "67cb50aac7d11fd8af057b13",
        "name": "teste",
        "phone": "19983143758",
        "email": "teste_1728@gmail.com",
        "validated": true,
        "createdAt": "2025-03-07T20:01:46.635Z",
        "updatedAt": "2025-03-07T20:01:46.650Z",
        "__v": 0
      }
    ],
    "error": null,
    "statusCode": 200
  }
  ```

### 4. Atualizar Clientes

- **Método:** `PATCH`
- **URL:** `api/clients/{id}`
- **Descrição:** Atualiza os valores enviado de um cliente específico.
- **Parâmetros:** `id` (ID do cliente)
- **Body (JSON):**
  ```json
  {
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "123456789"
  }
  ```

### Testes

1 **Rodar os testes:**

O projeto utiliza o **Jest** para testes automatizados. Para rodá-los, use o seguinte comando:

```bash
npm test
```

## Tecnologias

- **Node.js** (Express)
- **MongoDB** (Banco de dados)
- **Redis** (Cache)
- **RabbitMQ** (Mensageria)
- **Docker** (Conteinerização)
- **Jest** (Testes)
