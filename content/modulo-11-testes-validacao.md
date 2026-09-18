# Módulo 11 — Testes e Validação

## 11.1 — Por que este módulo existe

Este é, possivelmente, o módulo mais importante da Trilha 2. A regra central:

> A IA dizer que funciona não é evidência de que funciona.

Isso não é desconfiança gratuita do Claude — é reconhecer um limite real:
depois de implementar algo, é comum ver uma frase como "pronto, deve estar
funcionando corretamente" ou "isso resolve o problema". Essa frase é uma
**previsão**, não uma **observação**. Sem rodar, testar, ou conferir de
alguma forma concreta, ninguém (nem o Claude, nem você) sabe se está
realmente certo.

Isso conecta diretamente com o Módulo 4 (Confiança Calibrada) — em especial
a Missão 6 ("Prove que melhorou"), que já tratava exatamente disso no
contexto de otimização de performance. Este módulo generaliza esse
princípio para qualquer implementação, não só otimizações.

---

## 11.2 — Formas de validar, da mais simples à mais rigorosa

Nem toda tarefa precisa do nível mais alto de rigor — mas vale conhecer as
opções, do mais rápido ao mais completo:

| Forma de validação | O que verifica | Quando usar |
|---|---|---|
| **Build** | O projeto compila sem erros (Módulo 3) | Sempre, antes de qualquer coisa |
| **Typecheck** | Os tipos (TypeScript) batem, sem inconsistências | Projetos com TypeScript, especialmente depois de mudanças em várias partes |
| **Lint** | O código segue padrões de estilo/qualidade configurados no projeto | Quando o projeto já tem um linter configurado |
| **Teste manual** | Você mesmo usa a funcionalidade e confere o comportamento | Sempre, no mínimo isso |
| **Smoke test** | Uma checagem rápida de que "as coisas básicas não quebraram" | Depois de qualquer mudança, antes de aprofundar em testes específicos |
| **Teste automatizado** | Um código que testa outro código, executável a qualquer momento | Funcionalidades que serão mantidas por muito tempo, ou que quebram com frequência |
| **Teste de regressão** | Confirma que uma mudança nova não quebrou algo que já funcionava antes | Depois de mudanças em código já existente (não só em código novo) |

---

## 11.3 — Critérios de aceitação como ponte para os testes

Lembra dos critérios de aceitação da especificação (Módulo 8)? Eles não são
só documentação — são literalmente o roteiro de teste. Se a especificação
disse "um comentário enviado aparece imediatamente na lista, sem precisar
recarregar a página", esse é exatamente o comportamento que você testa
manualmente depois da implementação.

Isso fecha um ciclo importante: **especificar bem (Módulo 8) torna testar
mais fácil**, porque você já sabe, antes de implementar, o que "funcionando"
significa de verdade.

---

## Missão — Validando o sistema de comentários

### Situação

Continuando o exemplo dos Módulos 8, 9 e 10 (sistema de comentários no
PyForge, agora implementado), chega a hora de validar — não aceitar
"funciona" como resposta, mas confirmar de verdade.

### Prompt ruim

> "Ficou bom?"

Essa pergunta convida a uma resposta genérica e não-verificada — o Claude
pode responder "sim, ficou ótimo" sem isso significar que alguém rodou o
código.

### Prompt bom

> "Antes de considerar isso pronto, vamos validar contra os critérios de
> aceitação da especificação: um comentário vazio deve ser bloqueado, um
> comentário válido deve aparecer imediatamente na lista, e recarregar a
> página deve limpar a lista (comportamento esperado, não bug). Roda o
> projeto localmente comigo e vamos conferir os três, um de cada vez."

### O que fazer na prática

1. Rode o build/typecheck primeiro (Módulo 3) — é o nível mais barato de
   confirmação, e pega uma boa parte dos erros óbvios.
2. Teste manualmente cada critério de aceitação da especificação, um por
   um — não só "parece que funciona" de forma geral.
3. Se a mudança tocou em código já existente, confira que nada que
   funcionava antes quebrou (teste de regressão, mesmo que informal).
4. Só depois disso, considere a tarefa concluída.

### Checkpoint — tente sozinho primeiro

Pegue a última coisa que o Claude implementou pra você (neste treinamento ou
em outro projeto) e, antes de continuar lendo este módulo, tente listar:
quais critérios de aceitação você realmente conferiu na hora, e quais você
só aceitou porque "parecia certo"?

### O que você deveria ter aprendido

- "Funciona" dito pelo Claude é uma previsão, não uma observação — só vira
  fato depois de testado.
- Existem formas de validação com custos diferentes (build, typecheck,
  lint, teste manual, smoke test, automatizado, regressão) — escolha
  proporcional ao risco da mudança.
- Critérios de aceitação (Módulo 8) servem como roteiro de teste — escrevê-
  los bem antes facilita validar depois.
- Mudanças em código já existente merecem checagem de regressão, não só
  checagem do que é novo.

**Próximo módulo**: Módulo 12 — Code Review com IA (fechando o ciclo: IA
gera → humano verifica → IA revisa → humano decide — e onde entra a detecção
de alucinação).
