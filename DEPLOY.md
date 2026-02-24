# 🚀 Deploy na Vercel - Arquibancada 90

## Passo 1: Criar conta no Neon (PostgreSQL Gratuito)

1. Acesse: https://neon.tech
2. Clique em **"Sign Up"** e crie uma conta gratuita
3. Crie um novo projeto:
   - Nome: `arquibancada90`
   - Região: escolha a mais próxima (ex: US East ou São Paulo se disponível)
4. Copie a **connection string** fornecida (parece com):
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## Passo 2: Subir o código para o GitHub

```bash
# Inicialize o repositório (se ainda não tiver)
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Configuração para deploy na Vercel"

# Crie o branch main
git branch -M main

# Adicione o remote do GitHub (substitua pelo seu usuário)
git remote add origin https://github.com/SEU_USUARIO/arquibancada90.git

# Envie para o GitHub
git push -u origin main
```

## Passo 3: Conectar na Vercel

1. Acesse: https://vercel.com
2. Clique em **"Add New Project"**
3. Importe o repositório `arquibancada90`
4. Em **"Environment Variables"**, adicione:

   | Nome | Valor |
   |------|-------|
   | `DATABASE_URL` | `postgresql://...neon.tech/neondb?sslmode=require` |
   | `DIRECT_DATABASE_URL` | `postgresql://...neon.tech/neondb?sslmode=require` |
   | `ADMIN_PASSWORD` | `sua-nova-senha-admin` |

5. Clique em **"Deploy"**

## Passo 4: Executar Seed (após deploy)

Após o primeiro deploy, você precisa popular o banco de dados:

1. Vá no dashboard do projeto na Vercel
2. Acesse **Settings > Environment Variables**
3. Verifique se as variáveis estão configuradas
4. Acesse a URL do seu site + `/api/seed`
   - Exemplo: `https://arquibancada90.vercel.app/api/seed`

## Variáveis de Ambiente Necessárias

| Variável | Onde conseguir | Obrigatório |
|----------|----------------|-------------|
| `DATABASE_URL` | Neon.tech (connection string) | ✅ Sim |
| `DIRECT_DATABASE_URL` | Neon.tech (mesma connection string) | ✅ Sim |
| `ADMIN_PASSWORD` | Crie sua própria senha | ⚠️ Recomendado |

## Estrutura do Banco

O projeto usa PostgreSQL com as seguintes tabelas:

- **Jersey** - Camisas cadastradas
- **WaitlistEntry** - Lista de espera

## Problemas Comuns

### Erro de conexão com banco
- Verifique se as variáveis `DATABASE_URL` e `DIRECT_DATABASE_URL` estão corretas
- Certifique-se de que o banco Neon está ativo (dorme após inatividade)

### Tela branca / Erro 500
- Verifique os logs na Vercel: Dashboard > Deployments > clique no deploy > "Function Logs"
- Execute o seed: `https://seu-site.vercel.app/api/seed`

### Admin não funciona
- Verifique se a variável `ADMIN_PASSWORD` está configurada
- A senha padrão é `arquibancada90@admin`

## Comandos Úteis

```bash
# Gerar cliente Prisma localmente
bun run db:generate

# Criar migration
bun run db:migrate

# Executar seed local
bun run db:seed
```

---

## Resumo Rápido

1. ✅ Criar conta no Neon.tech e copiar connection string
2. ✅ Subir código para GitHub
3. ✅ Importar projeto na Vercel
4. ✅ Configurar variáveis de ambiente
5. ✅ Fazer deploy
6. ✅ Executar seed (`/api/seed`)

**URL do Admin:** `https://seu-site.vercel.app/admin`
**Senha padrão:** `arquibancada90@admin` (altere via variável `ADMIN_PASSWORD`)
