# Arquibancada 90

Mostruário digital premium de camisas de futebol. Uma experiência moderna e minimalista com forte identidade esportiva contemporânea.

## ✨ Features

- 🎽 **Mostruário Premium** - Exibição elegante de camisas de futebol
- 🌙 **Dark Mode** - Design escuro com acentos neon verde
- 📱 **Responsivo** - Funciona em todos os dispositivos
- ⚡ **Animado** - Transições suaves com Framer Motion
- 🔐 **Admin Protegido** - Painel administrativo com autenticação
- 📧 **Lista de Espera** - Captura de leads

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Animations:** Framer Motion

## 🚀 Deploy na Vercel

Veja o guia completo em [DEPLOY.md](./DEPLOY.md)

### Variáveis de Ambiente

```env
DATABASE_URL="postgresql://..."
DIRECT_DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="sua-senha-segura"
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── admin/           # Painel administrativo
│   ├── api/             # API routes
│   └── page.tsx         # Página principal
├── components/
│   ├── arquibancada/    # Componentes do projeto
│   └── ui/              # shadcn/ui components
└── lib/
    └── db.ts            # Prisma client
```

## 🔐 Acesso Admin

1. Acesse `/admin` (link discreto no footer)
2. Digite a senha de administrador
3. Gerencie as camisas do mostruário

## 📝 Licença

MIT
