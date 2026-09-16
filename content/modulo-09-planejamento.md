# Módulo 9 — Planejamento

## 9.1 — Por que este módulo existe

Você já entendeu o projeto (Módulo 7) e já especificou o que quer (Módulo
8). Ainda assim, existe um passo antes de dizer "implemente": o
**planejamento** — pedir para o Claude apresentar *como* ele pretende
resolver aquilo, antes de escrever qualquer código.

A sequência completa do Loop do Vibe Coding, até aqui:

> Entender → Decidir → **Planejar** → Implementar → ...

Pular direto de "especificação pronta" para "implementação" ainda deixa uma
lacuna: você sabe *o quê*, mas não sabe *como* — quais arquivos serão
tocados, em que ordem, com que riscos. Sem essa etapa, você só descobre o
"como" olhando o resultado já pronto — momento tarde demais pra discordar da
abordagem sem precisar desfazer trabalho.

---

## 9.2 — O que um plano deveria conter

Antes de aprovar uma implementação, peça que o Claude apresente:

- **Arquivos que serão modificados**: uma lista explícita, não uma descrição
  vaga de "algumas partes do projeto".
- **Abordagem**: a estratégia técnica escolhida (e, se houver mais de uma
  razoável, por que essa foi a escolhida — conecta com o Módulo 1).
- **Dependências**: alguma biblioteca nova precisa ser instalada? Alguma
  parte do projeto depende de outra que será alterada?
- **Riscos**: o que pode dar errado, ou quebrar sem querer, nessa mudança?
- **Impactos**: o que muda pro usuário final, ou para outras partes do
  projeto que não são o alvo direto da mudança?
- **Ordem de implementação**: se a mudança tem várias partes, em que
  sequência elas serão feitas — e por quê nessa ordem.
- **Estratégia de testes**: como a mudança será validada depois de pronta
  (conecta direto com o Módulo 11).

Só depois de revisar esse plano — e poder discordar, ajustar, ou pedir
esclarecimento — você diz:

> "Aprovado. Implemente."

Essa frase (ou uma parecida) marca a transição deliberada entre planejar e
agir — o mesmo espírito do "não altere nada ainda" do Módulo 7, só que na
outra ponta do processo.

---

## Missão — Planejando antes de aprovar

### Situação

Continuando o exemplo do Módulo 8 (sistema de comentários nas aulas do
PyForge, já especificado com as nove perguntas), o próximo passo não é pedir
a implementação direto — é pedir o plano.

### Prompt bom

> "Com base na especificação que já escrevemos, antes de implementar, me
> apresenta um plano: quais arquivos você pretende criar ou modificar, qual
> abordagem técnica vai usar, se precisa de alguma dependência nova, quais
> riscos você vê, o que isso impacta em outras partes do projeto, em que
> ordem você pretende implementar, e como pretende testar que funcionou. Não
> implemente ainda — só quero revisar o plano primeiro."

### Um plano de exemplo (para a mesma especificação do Módulo 8)

> - **Arquivos**: novo componente `Comentarios.tsx`; novo arquivo de estado
>   local (sem backend, conforme a restrição já especificada); pequena
>   alteração em `AulaLayout.tsx` para incluir o componente no fim de cada
>   aula.
> - **Abordagem**: estado React local (`useState`), sem persistência entre
>   sessões — respeitando a restrição de que o site é estático.
> - **Dependências**: nenhuma nova.
> - **Riscos**: como não há persistência, um recarregamento de página apaga
>   os comentários — isso já era esperado pela especificação, mas vale
>   reforçar no plano pra não ser surpresa depois.
> - **Impactos**: nenhum impacto em outras aulas ou páginas — o componente é
>   isolado.
> - **Ordem**: 1) criar o componente isolado e testá-lo sozinho; 2)
>   integrá-lo ao layout da aula; 3) conferir visualmente em pelo menos duas
>   aulas diferentes.
> - **Testes**: verificação manual — enviar um comentário vazio (deve
>   bloquear), enviar um comentário válido (deve aparecer na lista),
>   recarregar a página (deve sumir, conforme esperado pela restrição).

### O que fazer na prática

1. Depois de ter uma especificação (Módulo 8), peça o plano antes de pedir
   implementação — mesmo que pareça um passo extra "óbvio".
2. Leia o plano procurando especificamente por: algo que te surpreenda
   (abordagem que você não esperava), algum risco que você não tinha
   considerado, ou uma ordem de implementação que não faz sentido pra você.
3. Só aprove ("Aprovado. Implemente.") depois de não ter mais dúvidas sobre
   o plano.

### Checkpoint — tente sozinho primeiro

Antes de pedir o plano ao Claude, tente esboçar você mesmo, em poucas linhas,
como você imagina que a implementação vai acontecer — quais arquivos, em que
ordem. Compare com o plano real do Claude depois: bateu, ou ele viu algo que
você não tinha pensado (ou vice-versa)?

### O que você deveria ter aprendido

- Planejar é uma etapa própria, distinta de especificar e de implementar —
  ela existe pra revisar o "como" antes de ele virar código.
- Um plano completo cobre arquivos, abordagem, dependências, riscos,
  impactos, ordem e estratégia de testes.
- Aprovar explicitamente ("Aprovado. Implemente.") marca uma transição
  deliberada, evitando que a implementação comece antes de você concordar
  com a abordagem.

---

## 9.3 — Quando pular direto pra implementação é aceitável

Tarefas pequenas e de baixo risco (mesmo critério dos Módulos 1 e 8) não
precisam de um plano formal — pedir "corrige esse typo" não exige uma lista
de arquivos e riscos. O planejamento formal vale a pena quando a mudança
tem múltiplas partes, toca em mais de um arquivo, ou envolve alguma decisão
técnica que poderia ser feita de mais de um jeito razoável.

**Próximo módulo**: Módulo 10 — Implementação com IA (como conduzir a
implementação, já aprovada, sem perder o controle do processo).
