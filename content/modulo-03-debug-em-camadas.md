# Módulo 3 — Debug em Camadas

## 3.1 — Por que este módulo existe

Um erro raramente tem uma única causa quando você está montando
infraestrutura nova (deploy, CI/CD, configuração de ambiente). É comum um
sintoma (“o build falhou”) esconder duas, três causas diferentes, uma atrás
da outra — cada uma só aparece depois que a anterior foi resolvida.

Esse módulo ensina a não comemorar cedo demais, e a diferenciar dois tipos de
erro que parecem iguais mas não são: erro de **código** e erro de
**configuração/ambiente**.

---

## Missão 3 — "Descasque a cebola"

### Situação

Você está publicando o curso de Linux no GitHub Pages. O código já está
pronto e testado localmente. Mesmo assim, o deploy continua falhando — e a
cada correção, aparece um erro *diferente*.

### O caso real

A sequência real de causas, uma atrás da outra:

1. **Causa 1**: GitHub Pages nunca tinha sido habilitado nesse repositório —
   erro `Get Pages site failed... Error: Not Found`. Resolvido trocando
   Settings → Pages → Source para "GitHub Actions".
2. **Causa 2**: a configuração pareceu salva, mas não persistiu de verdade —
   o mesmo erro voltou a aparecer. Resolvido forçando a gravação (trocar
   para outra opção e voltar).
3. **Causa 3**: um erro totalmente diferente — o `.github/workflows/deploy.yml`
   estava com o conteúdo errado (ver Módulo 2, Missão 2 — o clássico "arquivo
   errado"). Só apareceu depois que as causas 1 e 2 já tinham sido
   resolvidas.

Cada uma dessas três causas, isoladamente, produzia um build falho. Só que
**cada uma só ficou visível depois que a anterior foi corrigida** — resolver
a causa 1 não resolveu o problema, só revelou a causa 2, e assim por diante.

### Prompt ruim

> "Ainda não funcionou, tenta de novo"

Isso não dá ao Claude nenhuma informação sobre *o que mudou* desde a última
tentativa. Se o erro for diferente do anterior, "tentar de novo" sem
contexto significa repetir um diagnóstico que já foi feito.

### Prompt bom

> "Corrigi [X], mas agora aparece um erro diferente: [cole a mensagem de erro
> completa, ou print]. É a mesma causa de antes ou é outra coisa?"

Essa pergunta explícita — "é a mesma causa ou é outra?" — foi literalmente
feita no caso real, e ajudou a confirmar que a causa 3 era, de fato, nova.

### O que fazer na prática

1. Depois de aplicar uma correção, **rode de novo e leia a mensagem de erro
   inteira** antes de assumir que é "o mesmo problema de antes".
2. Se a mensagem de erro mudou, trate como um problema novo — não continue
   tentando a mesma solução anterior.
3. Se a mensagem de erro é idêntica à anterior, é sinal de que a correção não
   "pegou" de verdade (como aconteceu na causa 2 — a config pareceu salva,
   mas não persistiu). Nesse caso, confirme que a mudança realmente foi
   aplicada antes de tentar de novo.

### Checkpoint — tente sozinho primeiro

Da próxima vez que um erro mudar depois de uma correção, antes de colar a
nova mensagem pro Claude, tente responder: **essa mensagem de erro parece
relacionada à correção que acabei de fazer, ou parece um problema
completamente diferente?** Escreva sua hipótese antes de perguntar.

### O que você deveria ter aprendido

- Um sintoma (“build falhou”) pode ter várias causas empilhadas — resolver
  uma não garante que o problema acabou.
- Sempre leia a mensagem de erro completa a cada nova tentativa, em vez de
  assumir que é a mesma de antes.
- Pergunte explicitamente "é a mesma causa ou é outra?" quando um erro mudar
  de forma.

---

## Missão 4 — "O erro que só aparece na hora de publicar"

### Situação

Seu projeto roda perfeitamente com `npm run dev`. Você nunca viu um erro.
Mas na hora de publicar de verdade (deploy via GitHub Actions), o build
falha com um erro de TypeScript que você nunca tinha visto.

### O caso real

Aconteceu duas vezes seguidas no PyForge:

1. Uma cópia duplicada e desatualizada de código (dentro de uma pasta de
   referência `_Desenvolvimentos/`) estava sendo type-checada pelo
   TypeScript — e só isso já quebrava o `next build`.
2. Depois de resolvido, apareceu um segundo erro: `Module '"*.mdx"' has no
   exported member 'meta'`. As páginas de aula importavam `meta` de dentro
   de arquivos `.mdx`, o que funciona em tempo de execução, mas o TypeScript
   não sabia disso — faltava uma declaração de tipo customizada.

Em ambos os casos, a explicação foi a mesma: **`next dev` não faz checagem de
tipos completa. Só `next build` faz.** Ou seja, o projeto podia estar "cheio
de erros de tipo" o tempo todo, sem nunca aparecer, até o primeiro build de
produção real rodar — que, nesse caso, foi dentro do CI (GitHub Actions), não
na sua máquina.

### Por que isso importa

Se o primeiro `next build` da sua vida acontece dentro do GitHub Actions,
você está descobrindo esses erros no pior lugar possível: sem terminal
interativo, com um ciclo de "commitar → esperar o CI rodar → ler o log →
corrigir → commitar de novo" que é muito mais lento que rodar localmente.

### Prompt bom

> "Antes de fazer o primeiro deploy, quero rodar o build de produção
> localmente para pegar erros de tipo que o `dev` não pega. Como faço isso
> no meu projeto [Next.js/Vite/etc]?"

### O que fazer na prática

1. Antes do primeiro `git push` que vai disparar um deploy, rode o comando de
   build de produção localmente (`npm run build`, no caso do Next.js e do
   Vite).
2. Se aparecer algum erro, resolva localmente — é muito mais rápido iterar
   na sua máquina do que esperar o CI rodar a cada tentativa.
3. Só depois do build local passar limpo, faça o commit e deixe o CI
   confirmar (ele deve reproduzir o mesmo resultado).

### Checkpoint — tente sozinho primeiro

Rode `npm run build` (ou equivalente) no seu projeto atual, mesmo que ele já
esteja publicado. Apareceu algum aviso ou erro que você nunca tinha visto no
`dev`? Investigue por conta própria por 5 minutos antes de perguntar ao
Claude o que significa.

### O que você deveria ter aprendido

- `dev` e `build` de produção não são a mesma checagem — `build` costuma ser
  mais rigoroso, especialmente com TypeScript.
- Rodar o build de produção localmente, antes do primeiro deploy, evita
  descobrir erros de tipo dentro do CI, onde o ciclo de correção é mais
  lento.

---

## O que você deveria ter aprendido (módulo completo)

- Sintomas de erro podem esconder múltiplas causas — resolver uma não é
  garantia de que o problema inteiro acabou.
- Diferencie "mesma causa, correção não aplicada de verdade" de "causa nova,
  problema diferente" lendo a mensagem de erro completa a cada tentativa.
- `next dev`/`vite dev` não substituem o build de produção como forma de
  validar o projeto — rode o build localmente antes do primeiro deploy.

**Próximo módulo**: Módulo 4 — Confiança Calibrada (quando checar o que o
Claude diz: drift de memória, otimizações sem prova, e correções que não
generalizam).
