# Mentoria Ikigai MVP

Projeto de landing page e área de membros para a Mentoria Ikigai.

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Firebase (Autenticação e Firestore)
- Tailwind CSS

## Estrutura do Projeto

```
📦 src/
├── 📁 auth/                         # Google/Firebase login
├── 📁 components/                   # Componentes React reutilizáveis
├── 📁 pages/                        # Páginas da aplicação
├── 📁 lib/                          # Configurações e utilitários
├── 📁 data/                         # Dados estáticos
├── 📁 styles/                       # Estilos globais
└── 📁 assets/                       # Arquivos estáticos
```

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` com as variáveis do Firebase:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   ```
4. Execute o projeto em desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter 