## 🧪 SauceDemo Automation Test Suite

![Cypress](https://img.shields.io/badge/Cypress-15.6.0-brightgreen)
![Mochawesome](https://img.shields.io/badge/Mochawesome-7.1.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)

Uma suíte completa de testes automatizados para a aplicação SauceDemo, implementando boas práticas de QA Automation com Cypress e relatórios detalhados com Mochawesome.

📋 Índice

- Visão Geral

- Funcionalidades Testadas

- Tecnologias Utilizadas

- Estrutura do Projeto

- Instalação e Configuração

- Execução dos Testes

- Relatórios

- Tipos de Testes Implementados

- CI/CD

- Contribuição

---

🎯 Visão Geral

Este projeto implementa uma suíte abrangente de testes automatizados para a aplicação web SauceDemo, cobrindo funcionalidades críticas como autenticação, fluxo de compras, performance, acessibilidade e APIs.

Características Principais:

✅ Cobertura completa dos fluxos principais

✅ Testes de UI, API e Performance

✅ Auditoria de acessibilidade integrada

✅ Relatórios detalhados com screenshots

✅ Configuração robusta para diferentes cenários

✅ Comandos customizados reutilizáveis

---

🚀 Funcionalidades Testadas

|Módulo | Funcionalidades |	Status |
|Autenticação |	Login com diferentes usuários, tratamento de erros |	✅ |
|Carrinho |	Adicionar/remover produtos, múltiplos itens |	✅ |
|Checkout |	Fluxo completo de compra |	✅ |
|Performance |	Métricas de carregamento, auditoria Lighthouse | 	✅ |
|Acessibilidade |	WCAG compliance, navegação por teclado |	✅ |
|API |	Health check, headers de segurança |	✅ |

---

🛠 Tecnologias Utilizadas

Frameworks e Ferramentas

- Cypress 15.6.0 - Framework de testes end-to-end

- Mochawesome - Geração de relatórios HTML

- Lighthouse - Auditoria de performance

- axe-core - Auditoria de acessibilidade

- cypress-audit - Integração com Lighthouse

Linguagens e Ambientes

- JavaScript/Node.js - Linguagem de programação

- Git Bash - Terminal (compatível com Windows)

- npm - Gerenciador de pacotes

---

📁 Estrutura do Projeto

```text
saucedemo/
├── 📂 cypress/
│   ├── 📂 e2e/
│   │   ├── 🧪 accessibility-ultimate.cy.js
│   │   ├── 🧪 api.cy.js
│   │   ├── 🧪 carrinho.cy.js
│   │   ├── 🧪 checkout.cy.js
│   │   ├── 🧪 login.cy.js
│   │   └── 🧪 performance.cy.js
│   ├── 📂 fixtures/
│   │   ├── 📄 accessibility-config.json
│   │   ├── 📄 api-data.json
│   │   ├── 📄 example.json
│   │   ├── 📄 performance-config.json
│   │   └── 📄 selectors.json
│   ├── 📂 support/
│   │   ├── 🔧 commands.js
│   │   └── 🔧 e2e.js
│   ├── 📂 screenshots/
│   └── 📂 reports/
├── ⚙️ cypress.config.js
├── 📦 package.json
├── 📋 README.md
└── 🗂️ .gitignore
```

---

⚙️ Instalação e Configuração

Pré-requisitos

- Node.js 18 ou superior

- npm 9 ou superior

- Git Bash (recomendado para Windows)

Passos de Instalação

1. Clone o repositório

```bash
git clone [url-do-repositorio]
cd saucedemo
```

2. Instale as dependências

```bash
npm install
```

3. Verifique a instalação do Cypress

```bash
npx cypress verify
```

🧪 Execução dos Testes

Execução Completa

```bash
# Executa todos os testes e gera relatório completo
npm run test:complete
```

Testes Individuais
```bash
# Testes de Acessibilidade
npm run test:accessibility

# Testes de API
npm run test:api

# Testes do Carrinho
npm run test:carrinho

# Testes de Checkout
npm run test:checkout

# Testes de Login
npm run test:login

# Testes de Performance
npm run test:performance
```

Modos de Execução
```bash
# Modo headed (com interface)
npm run test:api:debug

# Modo headless (sem interface)
npm run test:fast

# Execução passo a passo
npm run test:step-by-step
```
---

📊 Relatórios

Relatório Mochawesome

Após a execução dos testes, os relatórios são gerados em:

```text
cypress/reports/combined.html
```
Características dos Relatórios:

📈 Dashboard interativo com métricas

🎯 Status detalhado de cada teste

🖼️ Screenshots automáticos em falhas

⏱️ Tempos de execução por teste

📋 Logs de console integrados

Exemplo de Saída:
```text
📊 ESTATÍSTICAS GERAIS
✅ 32 testes passaram
❌ 1 teste falhou
⏱️ Tempo total: 17 minutos
📁 6 specs executados
```

---

🔬 Tipos de Testes Implementados

1. Testes de Acessibilidade (accessibility-ultimate.cy.js)

- Auditoria WCAG com axe-core

- Navegação por teclado

- Estrutura semântica de headings

- Atributos ARIA em formulários

2. Testes de API (api.cy.js)

- Health check da aplicação

- Validação de headers de segurança

- Testes de CORS

- Monitoramento de performance de rede

3. Testes de UI (carrinho.cy.js, checkout.cy.js, login.cy.js)

- Fluxo completo de compras

- Cenários positivos e negativos

- Diferentes tipos de usuários

- Validação de estados da aplicação

4. Testes de Performance (performance.cy.js)

- Métricas de carregamento (Lighthouse)

- Auditoria de best practices

- Monitoramento de tempo de resposta

---

🔄 CI/CD

GitHub Actions (Exemplo)
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Tests
        run: |
          npm install
          npm run test:complete
```

---

🤝 Contribuição

Padrões de Desenvolvimento

1. Novos Testes

- Seguir estrutura existente nos arquivos .cy.js

- Adicionar comandos customizados quando necessário

- Incluir fixtures para dados de teste

2. Comandos Customizados

- Adicionar em cypress/support/commands.js

- Documentar uso no README

- Manter compatibilidade com testes existentes

3. Relatórios

- Não modificar configuração do Mochawesome sem necessidade

- Manter estrutura de pastas de relatórios

Processo de Desenvolvimento

1. Fork do projeto

2. Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')

4. Push para a branch (git push origin feature/AmazingFeature)

5. Abra um Pull Request

---

📝 Scripts Disponíveis

|Script |	Descrição |
|npm run test:complete |	Execução completa com relatórios |
|npm run test:fast	| Execução rápida sem vídeo |
|npm run test:[modulo]	| Testes específicos por módulo |
|npm run cy:open	| Abre o Cypress Test Runner |
|npm run clean:reports	| Limpa relatórios anteriores |

---

🐛 Solução de Problemas

Problemas Comuns

1. Erro de timeout
```bash
# Aumentar timeout
npm run test:api --config defaultCommandTimeout=30000
```
2.Problemas com screenshots
```bash
# Desativar screenshots
npm run test:no-screenshots
```
3.Erro de memória
```bash
# Executar testes individualmente
npm run test:step-by-step
```
---

📄 Licença

Este projeto é destinado para fins educacionais e de demonstração de práticas de QA Automation.

Última atualização: Novembro 2025
