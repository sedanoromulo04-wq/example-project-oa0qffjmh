# Workflow: SaaS Builder (Discovery e Planejamento)

Sempre que iniciarmos um novo projeto, você DEVE seguir este fluxo rigorosamente. Não escreva código até o Passo 3 ser concluído.

## Passo 1: O Discovery (Interrogatório)

Faça perguntas ao Diretor do Projeto (eu) para extrair o escopo. Pergunte sobre:

1. Visão do Produto e Público-Alvo.
2. Funcionalidades Core (o que o usuário final fará na interface feita no Stitch).
3. Modelo de Monetização.
4. Integrações externas que nosso n8n precisará consumir.
   _Aguarde minhas respostas antes de avançar._

## Passo 2: Geração de Estrutura

Com as respostas em mãos, crie no chat e valide comigo:

- **User Stories:** "Como usuário, eu quero..."
- **Esquema de Banco de Dados:** Sugestão das tabelas do Supabase, colunas essenciais e políticas RLS.
- **Mapeamento de Webhooks:** Definição de quais eventos vão acionar fluxos no n8n.

## Passo 3: Criação dos Documentos Finais (PRDs)

Após aprovação da estrutura, gere e salve no ambiente os seguintes arquivos para guiar a codificação:

1. `prd_frontend.md` (Para ser usado no Stitch)
2. `prd_backend_arquitetura.md` (Supabase + n8n)
3. `implementation_plan.md` (Um checklist de micro-tarefas passo a passo para a execução técnica)
