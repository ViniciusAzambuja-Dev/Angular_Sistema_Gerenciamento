# Workflow - Trainee Wise 2025

O Workflow é um sistema de gerenciamento de horas trabalhadas, onde usuários podem criar projetos, registrar atividades e lançar horas nessas atividades de forma organizada.

O objetivo é facilitar o controle do tempo investido em diferentes tarefas, permitindo um acompanhamento eficiente da produtividade. O sistema conta com autenticação de usuários e diferentes níveis de acesso, garantindo segurança e controle sobre os lançamentos.

## Funcionalidades

- **Gerenciamento de Tempo**: Controle das horas dedicadas a projetos e tarefas, permitindo lançamentos precisos e atualizações constantes.

- **Organização de Tarefas**: Criação e atribuição de tarefas para membros da equipe, com acompanhamento em tempo real do progresso e status de cada uma.

- **Registro de Horas**: Armazenamento detalhado das horas trabalhadas em tarefas e projetos, com fácil acesso a históricos e relatórios.

- **Visualização de Dados**: Painel de visualização para analisar o tempo gasto em projetos e tarefas, facilitando a tomada de decisões e ajustes.

- **Autenticação e Acesso**: Sistema de login para garantir que apenas usuários autorizados acessem funcionalidades específicas, com controle de permissões.

- **Gestão de Projetos**: Criação e administração de diversos projetos simultaneamente, com suporte para detalhamento e personalização de cada um.

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Frontend:** Angular
- **Backend:** Java Spring Boot
- **Banco de Dados:** MySQL

## Dependências

- **RxJs**
- **Chart.js**  
- **Jwt-Decode**  
- **Ngx-Cookie-Service**  
- **PrimeFlex**  
- **PrimeNg**  

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

- [Vscode 1.98.1](https://code.visualstudio.com/download)

- [Angular CLI: 17.3.11](https://v17.angular.io/cli) - Execute o comando:
```
npm install -g @angular/cli@17

/*Testar instalação*/

ng version
```
- [NVM: 1.1.12. e Node: 18.20.5](https://github.com/coreybutler/nvm-windows/releases) - Procure por tópico **Assets** e clique em **nvm-setup.exe**, após a instalação execute o arquivo.

- Após aceitar os termos e instalar a nvm, abra o prompt(cmd) como Administrador e execute os seguintes comandos: 
```
nvm install 18
nvm use <versão da nvm mostrada no prompt>

/*Testar instalações*/

nvm
node -v
```


### Configuração do Frontend

#### 1. Clonar o Repositório

Clone o repositório do **Front** para o seu ambiente local.

```bash
git clone https://github.com/ViniciusAzambuja-Dev/Angular_Sistema_Gerenciamento.git

cd Angular_Sistema_Gerenciamento
```

#### 2. Rodar a aplicação

Abra o terminal de sua IDE e execute os seguintes comandos:

```
npm install
```

Após instalar as dependências, rode o projeto com o seguinte comando:

```
npm run start //recomendável
```
  - Acesse a aplicação em seu navegador: http://localhost:4200

#### **Importante**

Se ocorrer erros ao executar **npm install**:

```
yarn install //recomendável

ou 

npm install --legacy-peer-deps

ou 

npm install --force
```
