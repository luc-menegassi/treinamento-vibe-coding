# Módulo 13 — Segurança

## 13.1 — Por que este módulo existe

Primeiro módulo da Trilha 3 (Engenharia). Diferente dos Módulos 7-12
(conceitual, sem caso real por trás), este módulo **tem** um caso real —
vivido por você mesmo, no Módulo 0: a exposição acidental de um token do
GitHub direto no chat.

Vale reler aquele caso (Módulo 0, seção 0.8) antes de seguir — ele já cobre
o incidente mais concreto que você teve. Este módulo generaliza a lição pra
além daquele caso específico.

---

## 13.2 — O que nunca deve aparecer em código, commit, ou chat

- **Chaves de API** (de qualquer serviço — Claude, GitHub, bancos de dados,
  serviços de e-mail).
- **Tokens de acesso** (como o Personal Access Token do Módulo 0).
- **Senhas**, mesmo de contas de teste.
- **Strings de conexão de banco de dados** (geralmente incluem usuário e
  senha embutidos).
- **Dados pessoais reais** de terceiros, mesmo em dados de exemplo.

A regra prática do Módulo 0 continua valendo aqui, generalizada: **qualquer
credencial só deve ser digitada no prompt interativo da própria ferramenta
que a pede** — nunca escrita num arquivo que será commitado, nunca colada
num chat, nunca hardcoded dentro do código.

---

## 13.3 — Onde credenciais deveriam viver: variáveis de ambiente

Quando um projeto precisa de uma chave de API de verdade (por exemplo, se um
dia você integrar a API do Claude num projeto seu, como descrito na
documentação de "Claude em Artifacts"), a prática correta é usar
**variáveis de ambiente** — valores configurados fora do código-fonte,
geralmente num arquivo `.env.local` que o `.gitignore` já deveria excluir
(reveja o Módulo 6 — nosso `.gitignore` já lista `.env*.local` desde o
início, mesmo sem termos usado isso ainda).

**Prompt bom** para configurar isso corretamente:

> "Preciso usar uma chave de API neste projeto. Me mostra como configurar
> isso via variável de ambiente, sem nunca escrever a chave real dentro de
> nenhum arquivo que vá pro Git — só um arquivo de exemplo (`.env.example`)
> com um valor fictício, pra outras pessoas saberem o que configurar."

---

## Missão — Auditando um projeto em busca de segredos expostos

### Situação

Antes de confiar que um projeto está limpo, vale fazer uma varredura
deliberada — não assumir que "nunca aconteceu, então não precisa checar".

### Prompt bom

> "Faz uma varredura neste repositório procurando por qualquer coisa que
> pareça uma chave de API, token, senha, ou string de conexão hardcoded no
> código — incluindo em arquivos de configuração, não só no código-fonte
> principal. Se achar algo suspeito, não me diga o valor completo, só onde
> está e que tipo de credencial parece ser."

Repare no cuidado extra do prompt: pedir para o Claude **não repetir** o
valor da credencial, mesmo que a encontre — isso evita que o próprio processo
de auditoria vire um novo vazamento (por exemplo, ficando registrado no
histórico da conversa).

### O que fazer na prática

1. Rode essa varredura em qualquer projeto antes de torná-lo público (se um
   dia um dos seus repositórios privados virar público, por exemplo).
2. Se algo for encontrado, o passo não é só apagar do código atual — é
   revogar a credencial (mesma lição do Módulo 0: uma credencial exposta
   deve ser tratada como comprometida, mesmo depois de removida do código,
   porque pode continuar no histórico de commits antigos).
3. Considere adicionar um arquivo `.env.example` (com valores fictícios)
   sempre que o projeto passar a depender de variáveis de ambiente reais.

### Checkpoint — tente sozinho primeiro

Antes de pedir a varredura ao Claude, dê uma olhada rápida você mesmo nos
arquivos de configuração dos seus projetos reais (PyForge, curso de Linux, e
este treinamento) — nenhum deles usa credenciais reais hoje, mas veja se
você reconhece, de cabeça, quais arquivos *seriam* os primeiros lugares a
checar se algum dia precisassem.

### O que você deveria ter aprendido

- A lista do que nunca deve aparecer em código: chaves de API, tokens,
  senhas, strings de conexão, dados pessoais reais.
- Variáveis de ambiente (`.env.local`, excluído pelo `.gitignore`) são o
  lugar correto pra credenciais reais — nunca hardcoded no código.
- Uma credencial exposta continua comprometida mesmo depois de removida do
  código atual, porque pode sobreviver no histórico de commits — revogar é
  sempre necessário, não só apagar.
- Pedir para o Claude não repetir um valor sensível que encontrar evita que
  a própria auditoria vire um vazamento novo.

**Próximo módulo**: Módulo 14 — Git como Mecanismo de Segurança (usando o
histórico do Git para investigar e reverter problemas, não só para
versionar código).
