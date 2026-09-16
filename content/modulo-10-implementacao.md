# Módulo 10 — Implementação com IA

## 10.1 — Por que este módulo existe

Depois de entender (Módulo 7), especificar (Módulo 8) e planejar (Módulo 9),
finalmente chega o momento que a maioria das pessoas chama de "vibe coding":
pedir para o Claude escrever o código de verdade.

Mas repare que você chega nesse ponto **diferente** de quem pula direto pra
cá: já sabe o objetivo, já sabe as regras, já sabe quais arquivos serão
tocados e em que ordem. Este módulo não é sobre "olha como o Claude escreve
código" — isso você já viu acontecer nos módulos anteriores. É sobre **como
conduzir a implementação sem perder o controle** do que está sendo feito, à
medida que ela acontece.

---

## 10.2 — Conduzindo a implementação

Três práticas centrais:

1. **Siga a ordem do plano aprovado.** Se o plano dizia "primeiro o
   componente isolado, depois a integração", peça exatamente nessa
   sequência — não deixe o Claude (ou você mesmo, por pressa) pular etapas.
2. **Revise incrementalmente, não só no final.** Depois de cada etapa do
   plano, confira o resultado antes de pedir a próxima — é muito mais fácil
   corrigir um desvio pequeno do que desfazer uma implementação inteira
   porque a base já saiu errada.
3. **Interrompa se o Claude desviar do plano aprovado.** Se durante a
   implementação surgir uma mudança de abordagem (mesmo que pareça
   melhor), pare e pergunte por quê — pode ser uma boa descoberta no
   caminho, ou pode ser o Claude perdendo o fio do que foi combinado.

---

## 10.3 — Tamanho de prompt: um pedido grande ou vários pequenos?

Uma decisão prática que aparece toda vez que você implementa algo com mais
de uma parte: pedir tudo de uma vez, num prompt só, ou pedir por partes,
seguindo a ordem do plano?

| | Um prompt grande | Vários prompts pequenos |
|---|---|---|
| Velocidade | Mais rápido de pedir | Mais interações, mais lento |
| Revisão | Você só vê o resultado no final, tudo junto | Cada etapa pode ser conferida antes da próxima |
| Detectar desvio | Só depois de tudo pronto | Assim que acontece, numa etapa isolada |
| Risco se algo der errado | Desfazer pode significar jogar fora trabalho grande | Desfazer afeta só a etapa atual |
| Quando faz sentido | Tarefa pequena, de baixo risco, sem múltiplas partes | Tarefa com plano de várias etapas (Módulo 9) |

**Regra prática**: se o seu plano (Módulo 9) tem uma "ordem de
implementação" com mais de uma etapa, isso já é um sinal de que vale pedir
em prompts separados, um por etapa — o próprio plano já define os pontos de
corte naturais. Se a tarefa é pequena o suficiente pra não ter precisado de
plano formal (Módulo 9.3), um prompt só geralmente já resolve.

---

## Missão — Implementando o sistema de comentários, etapa por etapa

### Situação

Continuando o exemplo dos Módulos 8 e 9 (sistema de comentários nas aulas do
PyForge, já especificado e planejado em 3 etapas), chega a hora de
implementar — seguindo a ordem definida no plano, uma etapa de cada vez.

### Prompt bom (etapa 1, isolada)

> "Vamos implementar a primeira etapa do plano que aprovamos: o componente
> `Comentarios.tsx`, isolado, sem integrá-lo ainda ao layout da aula. Quero
> conferir esse componente sozinho antes de seguir pra etapa 2."

### Depois de revisar a etapa 1

Só depois de conferir que o componente funciona isoladamente (testando
localmente, como já é hábito desde o Módulo 3), você segue:

> "A etapa 1 está boa. Vamos pra etapa 2: integrar o `Comentarios.tsx` ao
> `AulaLayout.tsx`, exatamente como planejamos."

### O que fazer na prática

1. Tenha o plano do Módulo 9 por perto (literalmente reler antes de pedir
   cada etapa).
2. Peça uma etapa de cada vez, referenciando explicitamente o plano
   aprovado.
3. Rode/teste localmente depois de cada etapa (Módulo 3) antes de pedir a
   próxima.
4. Se o Claude sugerir pular a ordem ou mudar a abordagem no meio do
   caminho, pare e pergunte o motivo antes de aceitar.

### Checkpoint — tente sozinho primeiro

Antes de pedir a etapa 1 ao Claude, escreva você mesmo, em poucas linhas,
como imagina que o componente `Comentarios.tsx` (ou o equivalente na sua
própria tarefa real) deveria se comportar por dentro. Depois compare com o
que o Claude implementou — a lógica bateu com a sua expectativa?

### O que você deveria ter aprendido

- Implementação conduzida segue a ordem do plano aprovado, não a
  conveniência do momento.
- Revisar cada etapa antes de pedir a próxima limita o tamanho do estrago se
  algo sair errado.
- A escolha entre um prompt grande ou vários pequenos não é estética — ela
  afeta diretamente sua capacidade de detectar um desvio cedo.
- Interromper e perguntar quando o Claude muda de abordagem no meio do
  caminho é parte de "conduzir", não desconfiança excessiva.

**Próximo módulo**: Módulo 11 — Testes e Validação ("a IA dizer que funciona
não é evidência de que funciona").
