# Frontend - Corrige.AI

Interface moderna e responsiva para a plataforma de correção de redações, construída com as tecnologias mais recentes do ecossistema React.

## Tecnologias Utilizadas

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Componentes**: Shadcn UI
- **Gerenciamento de Estado**: Zustand (Arquitetura MVC)
- **Roteamento**: React Router DOM 7
- **Formulários**: React Hook Form + Zod
- **Requisições**: Axios
- **Ícones**: Lucide React

## Estrutura do Projeto

```
src/
├── app/                    # Features da aplicação (Feature-First Architecture)
│   ├── auth/               # Módulo de Autenticação
│   │   ├── controllers/    # Lógica de estado (Zustand)
│   │   ├── models/         # Interfaces e Tipos
│   │   ├── services/       # Comunicação com API/Firebase
│   │   └── [views]         # Componentes de página (Login, Register)
│   │
│   ├── home/               # Módulo Principal
│   │   ├── components/     # Componentes específicos da Home
│   │   ├── controllers/    # EssayController, ChatController
│   │   ├── models/         # EssayModel, ChatModel
│   │   ├── services/       # EssayService, ChatService
│   │   └── view.tsx        # Página principal
│
├── shared/                 # Código compartilhado
│   ├── components/         # Componentes UI reutilizáveis (Shadcn)
│   ├── lib/                # Configurações (Firebase, Utils)
│   └── api/                # Cliente HTTP base
```

## Arquitetura MVC

O projeto utiliza uma adaptação do padrão MVC (Model-View-Controller) para o frontend, utilizando Zustand para gerenciamento de estado:

1.  **Model**: Define as interfaces de dados (`Essay`, `User`, `ChatMessage`).
2.  **View**: Componentes React que apenas renderizam dados e chamam ações do Controller.
3.  **Controller**: Stores do Zustand que contêm o estado e a lógica de negócios (`actions`).
4.  **Service**: Camada responsável apenas pela comunicação externa (API, Firebase).

### Exemplo: EssayController

```typescript
// Controller gerencia o estado e lógica
export const useEssayController = create<IEssayController>()((set, get) => ({
    essays: [],
    loading: false,

    uploadEssay: async (data) => {
        set({ loading: true });
        const essay = await EssayService.uploadEssay(data); // Chama Service
        set(state => ({ 
            essays: [essay, ...state.essays], 
            loading: false 
        }));
    }
}));
```

## Funcionalidades Principais

### 1. Autenticação (Firebase)
- Login, Cadastro e Recuperação de Senha
- Proteção de rotas privadas
- Persistência de sessão

### 2. Correção de Redação
- Editor de texto para envio
- Visualização de feedback detalhado
- Histórico de redações com gráficos de evolução
- Notas por competência (C1-C5)

### 3. Chat em Tempo Real
- Conexão via Server-Sent Events (SSE)
- Modo Professor/Aluno
- Deduplicação de mensagens no cliente

## Como Rodar

```bash
# Instalar dependências
yarn

# Rodar servidor de desenvolvimento
yarn dev
```

O projeto estará disponível em `http://localhost:5173`.
