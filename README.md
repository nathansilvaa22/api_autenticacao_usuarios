# API de Usuários

## Descrição
Esta é uma API para gerenciar usuários, que inclui funcionalidades de cadastro e login. A segurança das senhas é garantida pelo `bcrypt` e a autenticação é feita através de tokens gerados pelo `jsonwebtoken`.

## Funcionalidades
- Cadastro de Usuários
- Login de Usuários
- Autenticação via JWT (JSON Web Token)

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB 
- bcrypt
- jsonwebtoken

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/api-usuarios.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd api-usuarios
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    PORT=3000
    DB_CONNECTION_STRING=your_database_connection_string
    JWT_SECRET=your_jwt_secret
    ```
2. Inicie o servidor:
    ```sh
    npm start
    ```

## Endpoints

### Cadastro de Usuário

- **URL:** `/api/register`
- **Método:** `POST`
- **Body:**
    ```json
    {
      "name": "Seu Nome",
      "email": "seuemail@example.com",
      "password": "suasenha"
    }
    ```
- **Resposta:**
    ```json
    {
      "message": "Usuário registrado com sucesso!"
    }
    ```

### Login de Usuário

- **URL:** `/api/login`
- **Método:** `POST`
- **Body:**
    ```json
    {
      "email": "seuemail@example.com",
      "password": "suasenha"
    }
    ```
- **Resposta:**
    ```json
    {
      "token": "seu_jwt_token"
    }
    ```

### Exemplo de Rota Protegida

- **URL:** `/api/protected`
- **Método:** `GET`
- **Headers:**
    ```json
    {
      "Authorization": "Bearer seu_jwt_token"
    }
    ```
- **Resposta:**
    ```json
    {
      "message": "Acesso autorizado a rota protegida."
    }
    ```

## Segurança

### Senhas
As senhas dos usuários são criptografadas utilizando o `bcrypt` antes de serem armazenadas no banco de dados.

### Tokens
Os tokens JWT são utilizados para autenticação de usuários em rotas protegidas. Certifique-se de manter o segredo (`JWT_SECRET`) seguro e não compartilhá-lo.

## Autor
- Nathan Silva(https://github.com/nathansilvaa22)

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

 
