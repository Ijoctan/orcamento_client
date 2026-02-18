# Gerenciador de Orçamentos - Frontend

Aplicação frontend desenvolvida com **Next.js** para gerenciamento de orçamentos, itens, medições e validações de soma de valores. O sistema permite criar, editar, finalizar orçamentos e gerenciar medições com validações de regras de negócio implementadas no backend.

---

## 📋 Descrição da Aplicação

Este projeto é a camada de apresentação de um sistema de controle de orçamentos. Ele oferece:

- **Cadastro e Edição de Orçamentos**: Criar orçamentos com tipo pré-definido (via seleção) e valor total.
- **Gerenciamento de Itens**: Adicionar, editar e remover itens que compõem o orçamento, com cálculo automático de valor total (Qtd × Valor Unitário).
- **Medições**: Registrar medições de progresso, com validação de quantidade não exceder o permitido.
- **Validações Globais**: Notificação centralizada de erros retornados pela API, com botões para fechar.
- **Navegação Simples**: Botão "Voltar" global em todas as páginas (exceto home).

---

## 🚀 Tecnologias Utilizadas

### Obrigatórias
- **Next.js 16.1.6** — Framework React com SSR/SSG
- **Axios 1.13.5** — Cliente HTTP para requisições
- **Redux Toolkit 2.11.2** — Gerenciamento de estado centralizado
- **React 19.2.3** — Biblioteca UI

### Adicionais Implementados
- **TypeScript 5** — Tipagem estática em todo projeto
- **TailwindCSS 4** — Framework CSS para estilos responsivos
- **ESLint 9** — Linting de código

---

## 📦 Instalação do Projeto

### Pré-requisitos
- Node.js v18+ e npm v9+
- Conexão com backend em execução (padrão: `http://localhost:8080`)

### Passos

1. **Clonar repositório**
   ```bash
   git clone <url-do-repositorio>
   cd frontend
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Executar em desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse em `http://localhost:3000`

4. **Build para produção**
   ```bash
   npm run build
   npm start
   ```

5. **Lint de código**
   ```bash
   npm run lint
   ```


##  Regras de Negócio 

### Orçamento
- Permite criar/editar com dropdown de tipos (carregado do backend)
- Bloqueia edição se status = `FINALIZADO`
- Bloqueia criação de itens se status = `FINALIZADO`
- Exibe protocolo, tipo, valor total, status, data de criação

### Itens
- Soma dos itens validada no backend
- Permite criar/editar apenas se orçamento ≠ `FINALIZADO`
- Exibe quantidade acumulada (atualizada após validação de medição)
- Valor total = Quantidade × Valor Unitário

### Medições
- Max uma medição com status `ABERTA` por orçamento
- Valida quantidade máxima (não pode exceder quantidade restante)
- Permite validar apenas se status = `ABERTA`
- Atualiza quantidade acumulada dos itens após validação

### Notificações
- Erros retornados pela API exibidos em `GlobalAlert`
- Botão × para fechar a notificação
- Suporta múltiplas fontes de erro (orcamento, item, medicao)






