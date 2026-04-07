# Culi

Plataforma web de cursos e receitas inspirada na culinaria italiana, desenvolvida com Vite, React e TypeScript.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Supabase

## Scripts

- `npm run dev`: inicia o ambiente local
- `npm run build`: gera a build de producao
- `npm run preview`: serve a build localmente

## Ambiente

O projeto utiliza as variaveis opcionais abaixo para integrar com Supabase:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sem essas variaveis, a aplicacao usa placeholders definidos em [`src/lib/supabase.ts`](/C:/Users/samue/Downloads/Plataforma%20curso/src/lib/supabase.ts).

## Deploy

Para publicar na Vercel:

1. Importe este repositorio no painel da Vercel.
2. Mantenha o comando de build como `npm run build`.
3. Defina as variaveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` se for usar a integracao real com Supabase.
