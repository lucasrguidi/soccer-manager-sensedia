## 🏁 Visão Geral

Este projeto é uma aplicação Next.js (App Router + Server Actions) que consome uma API externa (usuários, posts e álbuns) e gera dados adicionais via rotas internas. Permite:

- Listar usuários com busca e paginação.
- Cadastrar e deletar usuários (Server Actions).
- Exibir detalhes de cada usuário (incluindo posts, álbuns, cidade e dias da semana “disponíveis”).
- Navegação via breadcrumbs e fallback para usuário não-encontrado.
- Menu dropdown com usuário “logado” fake.

## 🛠 Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS + shadcn/ui**
- **React Server Actions** (`'use server'`)
- **Faker.js** (seeded)
- **Zod + React-Hook-Form**
- **Environment Vars**:
  - `API_URL` → endpoint principal para `/users`, `/posts`, `/albums`
  - `NEXT_PUBLIC_BASE_URL` → para rotas internas `/api/random/*`

---

## 📁 Estrutura de Pastas

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                       ← Home
│  ├─ actions/
│  │   ├─ create-user-action.ts      ← POST /users/create
│  │   └─ delete-user-action.ts      ← DELETE /users/{id}
│  ├─ api/random/
│  │   ├─ city/route.ts              ← GET /api/random/city?seed=
│  │   ├─ user/route.ts              ← GET /api/random/user?seed=
│  │   └─ weekDays/route.ts          ← GET /api/random/weekDays?seed=
│  ├─ users/
│  │   ├─ page.tsx                   ← Lista e formulário de registro
│  │   └─ [userId]/
│  │       ├─ page.tsx               ← Detalhe de usuário
│  │       └─ _components/
│  │           └─ user-not-found.tsx ← Fallback “Perfil não encontrado”
│  └─ hooks/useBreadcrumbs.ts
├─ components/                       ← banners, avatars, cards…
└─ services/
   ├─ get-user-list-data.tsx
   ├─ get-user.tsx
   └─ get-current-user.tsx
```

---

## 🔀 Rotas de Página

| Rota              | Componente                    | Descrição                                  |
| ----------------- | ----------------------------- | ------------------------------------------ |
| `/`               | `app/page.tsx`                | Home / apresentação                        |
| `/users`          | `app/users/page.tsx`          | Lista de usuários + formulário de registro |
| `/users/[userId]` | `app/users/[userId]/page.tsx` | Perfil detalhado, dias e estatísticas      |

---

## 🚧 APIs Internas

Todas rodam no **Serverless** do Next.js:

| Método | Rota                             | Descrição                                     |
| ------ | -------------------------------- | --------------------------------------------- |
| GET    | `/api/random/city?seed={id}`     | Gera cidade fake baseada em seed (para lista) |
| GET    | `/api/random/weekDays?seed={id}` | Gera dias da semana aleatórios                |
| GET    | `/api/random/user?seed={id}`     | Usuário fake “logado” (menu dropdown)         |

---

## 🔍 Lógica de Negócio em Destaque

1. **Tabela de Usuários**
   - **Truncamento visual**: nome e e-mail cortados para exibição, mas mantidos completos para busca.
2. **Dados Randomizados (Cidade & Dias da semana)**
   - Chamadas a `${NEXT_PUBLIC_BASE_URL}/api/random/city` e `/weekDays` com seed = `user.id` para constância.
   - `username` gerado com seed de `user.email`.
3. **Cadastro de Usuário**
   - Formulário segue Figma, mas envia apenas `email`, `name` e `password`, sendo esse último fixo.
   - Todas as mutações são **Server Actions**.
4. **Dias da Semana**
   - Função `formatWeekDays` normaliza:
     - `"todos"` → todos os dias
     - `"weekend"` → Sábado + Domingo
     - custom → dias específicos
5. **Breadcrumbs**
   - Componente `Breadcrumb` mapeia segmentos de rota para nomes legíveis e com link, sendo último segmento sem link.
6. **Fallback de Usuário Não-Encontrado**
   - `UserNotFound` exibe card com botão de volta para `/users`.
7. **Menu Dropdown de Sessão**
   - Usuário “logado” vem de `/api/random/user?seed=11`, sendo fixo.
   - Avatar com iniciais gerados pela função `getInitials()`.

---

## 🚀 Scripts Disponíveis

```bash
npm install
npm run dev    # modo desenvolvimento
npm run build
npm run start  # production
npm run lint
npm run format
```

---

## ⚙️ Setup & Execução

1. Clone e instale dependências:
   ```bash
   git clone … && cd soccer-manager-sensedia
   npm install
   ```
2. Configure seu `.env`:
   ```env
   API_URL=https://sua-api-externa.com
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
3. Rode em dev:
   ```bash
   npm run dev
   ```
4. Acesse: `http://localhost:3000/users`

---

## 🏆 Considerações Finais

- **Performance**: SSR em todas as requisições GET.
- **UX**: Loaders apenas em ações client (`useTransition`).
- **Escalabilidade**: Componentização com shadcn/ui, Hooks, Utilitários, Tipos, Constantes e Services desacoplados.

---
