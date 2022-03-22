<div  align="center">
  <img src=".github/Ignite-NodeJS-logo.png" width="650">
<br>
<br>

# API DE ALUGUEL DE VEÍCULOS - BOOTCAMP IGNITE NODEJS CAP IV

</div>

> Essa parte do projeto foi desenvolvido no módulo IV do Ignite NodeJS da Rocketseat

## 🚗 Sobre o projeto

Nesse módulo damos continuidade a nossa API de aluguel de veículos. Vamos implementar a funcionalidade de realização de pagamentos, de envio de email para recuperação de senha e outras coisas.

## 💻Tópicos abordados no módulo

Os passos de desenvolvimentos são:

### Carro

- [x] Corrigindo status de um carro
- [x] Caso de uso de devolução de carro
- [x] Controller de devolução de carro
- [x] Listagem de aluguéis do usuário
- [x] Refatorando a listagem de aluguel do usuário
- [x] Criando documentação com autenticação em categoria
- [x] Replicando autenticação para a documentaçao
- [x] Documentação para upload de imagens do carro
- [x] Correção dos testes

### Autenticação

- [x] Refresh Token
- [x] Repositório de Refresh token
- [x] Refatorando Autenticação do usuário
- [x] Criando caso de uso do refresh token
- [ ] Controller refresh token

### Recuperação de senha

- [ ] Criando caso de uso
- [ ] Criando provider de e-mail
- [ ] Inserindo template engine para envio de e-mail
- [ ] Caso de uso de reset de senha

### Testes

- [ ] Refatorando testes
- [ ] Testando envio de e-mail
- [ ] Coverage Report

## Requisitos da aplicação:

- **Cadastro de Carro**

  - Requitos funcionais => RF
    - Deve ser possível cadatrar um novo carro.
  - Requitos não funcionais => RNF
    - Não se aplica.
  - Regras de negócio => RN
    - Não deve ser possível cadastrar um carro com uma placa já existente.
    - O carro deve ser cadastrado, por padrão, como disponível.
    - Somente usuários administradores podem fazer o cadastro de carros.

- **Listagem de Carro**

  - Requitos funcionais => RF
    - Deve ser possível listar todos os carros disponíveis.
    - Dever ser possível listar todos os carros disponíveis pela categoria.
    - Dever ser possível listar todos os carros disponíveis pela marca.
    - Dever ser possível listar todos os carros disponíveis pelo nome do carro.
  - Requitos não funcionais => RNF
    - Não se aplica.
  - Regras de negócio => RN
    - Não é necessário estar logado para acessar a listagem de carros.

- **Cadastro de Especificação no carro**

  - Requitos funcionais => RF
    - Deve ser possível cadatrar uma especificação para um carro.
  - Requitos não funcionais => RNF
    - Não se aplica.
  - Regras de negócio => RN
    - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
    - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
    - Somente usuários administradores podem fazer o cadastro de especificações.

- **Cadastro de Imagens do carro**

  - Requitos funcionais => RF
    - Deve ser possível cadatrar uma imagem do carro.
  - Requitos não funcionais => RNF
    - Utilizar o Multer para upload dos arquivos.
  - Regras de negócio => RN
    - O usuário deve poder cadastrar várias imagens para o mesmo carro.
    - Somente usuários administradores podem fazer o cadastro de imagens.

- **Aluguel de carro**

  - Requitos funcionais => RF
    - Deve ser possível cadastrar um aluguel de carro.
  - Requitos não funcionais => RNF
    - Não se aplica.
  - Regras de negócio => RN
    - O usuário deve estar logado na aplicação para poder alugar algum carro.
    - O aluguel dever ter duração mínima de 24 horas.
    - Não deve ser possível cadastrar um alguel caso já houver outro em aberto para o mesmo usuário.
    - Não deve ser possível cadastrar um alguel caso já houver outro em aberto para o mesmo carro.
      - O status de disponibilidade do carro alugado dever ser modificado para indisponível (false).

- **Devolução de Carro**

  - Requitos funcionais => RF
    - Deve ser possível realizar a devolução de um carro.
  - Regras de negócio => RN
    - Se o carro for devolvido antes de 24hrs, a diária deve ser cobrada normalmente.
    - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
    - Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
    - Ao realizar a devolução, deverar ser calculado o total do aluguel.
    - Se estiver em atraso, deverar ser cobrado multa de atraso proporcional.
    - Se houver multa, somar-la ao valor do aluguel.
    - O Usuário deve estar logado.

- **Listagem de alugueis para usuários**

  - Requitos funcionais => RF
    - Deve ser possível realizar a busca de todos os alugueis para o usuário.
  - Regras de negócio => RN
    - O Usuário deve estar logado na aplicação.

## 🧐 Como contribuir

- Faça um fork do projeto;
- Crie uma nova branch, exemplo: `git checkout -b my-feature`;
- Commit as modificações, exemplo: `git commit -m 'feat: My new feature'`;
- Faça um push para a sua branch: `git push origin my-feature`.

Criado por Manfrinne Ferreira [Contato](https://www.linkedin.com/in/manfrinne-ferreira-6033121a7/)

## 👮 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

---
