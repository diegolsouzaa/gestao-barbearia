1) Registro de Barbeiros
Como um Barbeiro
 Eu quero me registrar no sistema
 Para que eu possa acessar e gerenciar minhas informações e meus atendimentos

Regras de Negócio:
- Não pode existir mais de um barbeiro com o mesmo e-mail ou CPF.
- Campos obrigatórios: nome completo, cpf, e-mail, senha e telefone.
- A senha deve ter no mínimo 8 caracteres.



2) Login de Barbeiros
Como um Barbeiro
 Eu quero fazer login no sistema
 Para que eu possa acessar minha conta e gerenciar meus agendamentos

Regras de Negócio:
- O barbeiro só deve conseguir acessar se o e-mail e a senha estiverem corretos.
- Após 5 tentativas falhas de login, a conta deve ser bloqueada por 15 minutos.



3) Agendamento de Serviços para Clientes
Como um Barbeiro
 Eu quero cadastrar um agendamento para o meu cliente
 Para que eu possa organizar meus horários e evitar conflitos de atendimento

Regras de Negócio:
- Deve ser informado: nome do cliente, cpf, serviço, data e horário.
- Não pode ser criado um agendamento em um horário já ocupado pelo mesmo barbeiro.
- Caso o cliente já tenha um serviço no mesmo horário, o sistema deve impedir o cadastro.



4) Listagem de Serviços Agendados
Como um Barbeiro
 Eu quero visualizar meus agendamentos
 Para que eu possa ter controle dos serviços que preciso realizar no dia ou em uma data específica

Regras de Negócio:
- A listagem deve permitir filtro por data.
- Devem ser exibidos: nome do cliente, cpf, serviço, horário
- O barbeiro só pode visualizar seus próprios agendamentos, não de outros barbeiros.

