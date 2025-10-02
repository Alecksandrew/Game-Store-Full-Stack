# 🎮 Full-Stack Game Store

Projeto full-stack de um e-commerce de jogos digitais, desenvolvido para aplicar e aprofundar conhecimentos na construção de aplicações web modernas com .NET e React.

## 🚀 Sobre o Projeto

Este projeto é uma simulação completa de uma loja de chaves de jogos digitais, inspirada em plataformas como G2A, Nuuvem e Steam. A aplicação permite que usuários se cadastrem, naveguem por um catálogo de jogos consumido da API da IGDB, gerenciem listas de desejos, realizem "compras" (simuladas) e acessem suas chaves digitais em uma área de cliente.

O objetivo principal foi construir uma aplicação robusta do zero, cobrindo todo o ciclo de vida do desenvolvimento, desde a modelagem do banco de dados e criação da API RESTful no backend, até a construção de uma interface reativa e responsiva no frontend, finalizando com o deploy automatizado na nuvem.

## 🛠️Tecnologias

### Backend (C# | .NET 8)

- **ASP.NET Core Web API**: Estrutura para a construção da API RESTful.
- **Entity Framework Core**: Mapeamento objeto-relacional (ORM) para interagir com o banco de dados utilizando a abordagem Code-First.
- **ASP.NET Core Identity**: Gerenciamento completo de autenticação e autorização, incluindo registro, login, roles e hashing/salting de senhas.
- **Autenticação JWT**: Geração e validação de JSON Web Tokens (Access e Refresh Tokens) para proteger os endpoints da API. Implementaçao de blacklist com cache ao dar logout para aumentar a segurança da aplicação.
- **Injeção de Dependência (DI)**: Aplicação dos princípios SOLID para criar um código desacoplado e de fácil manutenção, com serviços como IAuthService e IAccountService.
- **SendGrid**: Serviço de e-mail para envio de confirmação de conta e links de redefinição de senha.

### Frontend (React | TypeScript)

- **React & Vite**: Biblioteca para construção de interfaces de usuário com um ambiente de desenvolvimento moderno e rápido.
- **TypeScript**: Tipagem estática para garantir a robustez, manutenibilidade e escalabilidade do código.
- **React Router**: Gerenciamento de rotas para navegação entre páginas e rotas protegidas.
- **React Hook Form**: Construção de formulários performáticos e com validação robusta.
- **Context API**: Gerenciamento de estado global para autenticação, carrinho e wishlist, evitando prop drilling.
- **Tailwind CSS**: Framework CSS utility-first para estilização ágil, responsiva e customizável.
- **Fetch API Nativa**: Consumo dos endpoints do backend, com uma camada de abstração (fetchWithAuth) para lidar com a renovação automática de tokens.

### Banco de Dados

- **SQL Server**: Banco de dados relacional para persistência dos dados da aplicação.
- **Git & GitHub**: Versionamento de código e organização do projeto.

## ✨ Principais Funcionalidades

- **Autenticação Completa**: Cadastro, login, confirmação de e-mail, recuperação de senha e logout seguro com blacklist de tokens.
- **Gerenciamento de Conta**: Os usuários podem visualizar seus dados, alterar a senha e deletar sua conta de forma segura.
- **Catálogo de Jogos via IGDB**: O backend atua como um proxy para buscar e exibir um catálogo dinâmico de jogos, protegendo a chave da API externa.
- **Página de Detalhes do Jogo**: Visualização de informações completas de um jogo, incluindo uma seção para os usuários deixarem avaliações (reviews).
- **Lista de Desejos (Wishlist)**: Funcionalidade persistente no banco de dados para salvar jogos de interesse.
- **Carrinho de Compras**: Gerenciado no frontend para uma experiência de usuário fluida.
- **Checkout Simulado**: Processo de "compra" que utiliza transações atômicas no banco de dados para garantir a consistência dos dados (alocação de chave e baixa de estoque).
- **Histórico de Compras**: Página onde o usuário pode visualizar todas as suas compras e as chaves digitais adquiridas.
- **Painel de Administração**: Área protegida por Role (perfil de acesso) onde um administrador pode gerenciar o estoque e os preços dos jogos.
- **Design 100% Responsivo**: Interface adaptada para uma ótima experiência em desktops, tablets e dispositivos móveis.

## 💡 Conceitos Aplicados e Aprendizados

Este projeto foi uma oportunidade para aplicar conceitos cruciais de desenvolvimento full-stack, focando em boas práticas e arquitetura de software:

**Arquitetura de API RESTful**: Desenho e implementação de endpoints seguindo os padrões REST, utilizando DTOs (Data Transfer Objects) para desacoplar os modelos de domínio da API.

**Segurança em Primeiro Lugar**:
- Implementação de um fluxo de autenticação robusto com JWT Access e Refresh Tokens, incluindo a invalidação de tokens no logout (blacklist) e renovação automática de sessão (token refresh).
- Proteção de endpoints com base em autenticação ([Authorize]) e perfis de usuário (Roles), como na distinção entre usuário comum e administrador.
- Tratamento de senhas seguras utilizando o hashing nativo do ASP.NET Core Identity.

**Gerenciamento de Banco de Dados**:
- Uso prático do Code-First com EF Core, onde as migrações de banco de dados são geradas a partir dos modelos C#.
- Modelagem de dados relacionais e aplicação de transações atômicas em operações críticas (como o checkout) para garantir a integridade dos dados.

**Boas Práticas de Código Limpo**:
- Aplicação dos princípios SOLID, especialmente o da Responsabilidade Única (SRP) e Inversão de Dependência (DIP), através da separação de responsabilidades em Serviços, Controllers e Repositórios (implícitos no UserManager e DbContext).


## 📱 Demonstração


### FLUXO DE AUTENTICAÇÃO (CADASTRO E LOGIN)


### NAVEGAÇÃO PELA LOJA E DETALHES DO JOGO


### GERENCIAMENTO DE CONTA DE USUÁRIO


### PROCESSO DE CHECKOUT SIMULADO


## 📋 Roadmap do Projeto

- [x] Estrutura do Backend com .NET  e EF Core
- [x] Sistema completo de Autenticação com JWT (Login, Registro, Confirmação de Email, Troca de Senha)
- [x] Sistema de Gerenciamento de Conta (Ver dados, Trocar Senha, Deletar Conta)
- [x] Integração Frontend-Backend para Autenticação
- [X] Proxy no Backend para API da IGDB
- [X] Desenvolvimento da Home Page e listagem de jogos
- [X] Página de Detalhes do Jogo com sistema de Reviews
- [X] Funcionalidade de Wishlist
- [X] Funcionalidade de Carrinho
- [ ] Funcionalidade de Checkout Simulado
- [ ] Página de Histórico de Compras
- [ ] Painel de Administração (CRUD de Inventário)
- [ ] Deploy da aplicação na Azure

## 📚 Créditos

- **Dados dos jogos**: [IGDB API](https://www.igdb.com/api)
