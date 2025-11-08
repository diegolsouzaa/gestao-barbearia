## Gestão Barbearia API

API Rest para sistema de gestão de barbearia, construída com Node.js, Express e autenticação JWT. Os dados são armazenados em memória e a documentação está disponível via Swagger.

### Estrutura do Projeto
- **routes/**: Rotas da API
- **controllers/**: Lógica de controle dos endpoints
- **service/**: Regras de negócio e autenticação
- **model/**: Persistência em memória
- **resources/**: Documentação Swagger


### Como executar
1. Instale as dependências:
	```bash
	npm install
	```
2. Inicie a API:
	```bash
	npm start
	```
3. Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Testes Automatizados
Os testes de API REST estão implementados com Mocha, Chai, Supertest e Mochawesome.

#### Como executar os testes:
1. Certifique-se que a API está rodando (`npm start`).
2. Execute os testes:
	```bash
	npm test
	```
3. Para gerar relatório HTML dos testes:
	```bash
	npm run test:report
	```
	O relatório será gerado na pasta `mochawesome-report`.

#### Estrutura dos testes:
- Os scripts de teste estão na pasta `test/`, separados por funcionalidade.
- Os dados de teste (fixtures) estão na pasta `fixtures/`.
- As variáveis de ambiente, como `BASE_URL`, estão configuradas no arquivo `.env`.

### Autenticação
Utilize o endpoint de login para obter o token JWT. Envie o token no header `Authorization: Bearer <token>` para acessar rotas protegidas.

### Funcionalidades

#### 1) Registro de Barbeiros
Como um Barbeiro
 Eu quero me registrar no sistema
 Para que eu possa acessar e gerenciar minhas informações e meus atendimentos

Regras de Negócio:
- Não pode existir mais de um barbeiro com o mesmo e-mail ou CPF.
- Campos obrigatórios: nome completo, cpf, e-mail, senha e telefone.
- A senha deve ter no mínimo 8 caracteres.



#### 2) Login de Barbeiros
Como um Barbeiro
 Eu quero fazer login no sistema
 Para que eu possa acessar minha conta e gerenciar meus agendamentos

Regras de Negócio:
- O barbeiro só deve conseguir acessar se o e-mail e a senha estiverem corretos.
- Após 5 tentativas falhas de login, a conta deve ser bloqueada por 15 minutos.



#### 3) Agendamento de Serviços para Clientes
Como um Barbeiro
 Eu quero cadastrar um agendamento para o meu cliente
 Para que eu possa organizar meus horários e evitar conflitos de atendimento

Regras de Negócio:
- Deve ser informado: nome do cliente, cpf, serviço, data e horário.
- Não pode ser criado um agendamento em um horário já ocupado pelo mesmo barbeiro.
- Caso o cliente já tenha um serviço no mesmo horário, o sistema deve impedir o cadastro.



#### 4) Listagem de Serviços Agendados
Como um Barbeiro
 Eu quero visualizar meus agendamentos
 Para que eu possa ter controle dos serviços que preciso realizar no dia ou em uma data específica


### Documentação Swagger
A especificação completa dos endpoints, modelos de resposta e códigos de erro está disponível em `/api-docs` e no arquivo `resources/swagger.json`.

