# Configuração de CI/CD com Render

Este projeto usa GitHub Actions para CI/CD e Render para hospedagem.

## Configuração no Render

1. **Criar novo Web Service no Render**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub `lar_fraterno_front`
   - Configure:
     - **Name**: `lar-fraterno-front` (ou nome de sua preferência)
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: Free ou Starter

2. **Configurar Variáveis de Ambiente no Render**
   - No dashboard do seu serviço, vá em "Environment"
   - Adicione as seguintes variáveis:
     ```
     NEXT_PUBLIC_API_BASE_ROUTE=https://seu-apollo-api.onrender.com
     NEXT_PUBLIC_SUPABASE_URL=sua_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_supabase_anon_key
     NODE_ENV=production
     ```

3. **Obter Deploy Hook URL**
   - No dashboard do serviço, vá em "Settings"
   - Role até "Deploy Hook"
   - Copie a URL do Deploy Hook

## Configuração no GitHub

1. **Adicionar Secrets no GitHub**
   - Vá em Settings → Secrets and variables → Actions
   - Adicione os secrets:
     - `RENDER_DEPLOY_HOOK_URL`: Cole a URL do Deploy Hook do Render
     - `NEXT_PUBLIC_API_BASE_ROUTE`: URL da API no Render
     - `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase

2. **Testar o Pipeline**
   - Faça um push para a branch `main` ou `master`
   - Vá em Actions no GitHub para ver o workflow rodando
   - O deploy será automaticamente disparado no Render após os testes passarem

## Workflow

O pipeline executa:
1. **Test Job**: Instala dependências, roda linter, faz build da aplicação
2. **Deploy Job**: Dispara deploy no Render (apenas em push para main/master)

## Importante

- Certifique-se de que a URL da API (`NEXT_PUBLIC_API_BASE_ROUTE`) aponta para o serviço apollo-api no Render
- Atualize o `ALLOWED_ORIGINS` no apollo-api para incluir a URL do frontend no Render
- O Next.js precisa das variáveis de ambiente em build time, por isso elas são configuradas tanto no GitHub Actions quanto no Render

## Troubleshooting

Se o build falhar:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Verifique os logs no dashboard do Render
3. Teste o build localmente: `npm run build`
