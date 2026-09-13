# Módulo 1 — Antes de Programar, Decida

## 1.1 — Por que este módulo existe

É tentador, assim que uma ideia aparece, já pedir ao Claude "implementa isso
pra mim". Na maioria das vezes funciona bem. Mas em decisões **caras de
reverter** — trocar de framework, mudar a estrutura de pastas, migrar de
hospedagem — pedir implementação direto significa que, se a escolha for
ruim, você só descobre depois de já ter código construído em cima dela.

Este módulo ensina a reconhecer esse tipo de decisão e a pedir uma **análise
de trade-off antes de qualquer linha de código**.

---

## Missão 1 — "Nível de trabalho: alto"

### Situação

Você tem o PyForge rodando em Next.js e pensa: "será que MkDocs não seria
mais simples de manter?" Antes de pedir pro Claude fazer a conversão, você
decide perguntar o que essa mudança realmente custaria.

### O caso real

No desenvolvimento do PyForge, essa pergunta foi feita da seguinte forma:

> "Analisa o nível de trabalho caso fizéssemos uma conversão da página mdx
> para o mkdocs"

O Claude devolveu uma análise em camadas — o que migra fácil (conteúdo,
navegação, busca), o que dá trabalho médio (componentes visuais customizados)
e o que é trabalho pesado de verdade (o `PyPlayground`, um componente React
com estado, teria que ser reconstruído do zero em JavaScript puro). A
conclusão: "alto — isso não é bem uma conversão, é quase uma reescrita".

Nenhum código foi escrito nessa troca. Só depois de entender o custo real, a
decisão foi tomada: manter Next.js com export estático, que chegava ao mesmo
resultado (GitHub Pages) com uma fração do esforço.

### Prompt ruim

> "Muda meu projeto pra MkDocs"

Isso pula direto pra implementação. Se o Claude simplesmente obedecer, você
só descobre o tamanho do problema (reescrever o `PyPlayground` do zero, por
exemplo) no meio do caminho — com código pela metade dos dois lados.

### Prompt bom

> "Analisa o nível de trabalho caso fizéssemos uma conversão de [tecnologia
> atual] para [tecnologia nova]. Quero saber o que migra fácil, o que dá
> trabalho médio e o que é o ponto mais custoso, antes de decidir se vale a
> pena."

Repare na estrutura: pede a **análise em camadas de esforço**, não só um "dá
pra fazer ou não". E deixa claro que a decisão ainda não foi tomada.

### O que fazer na prática

1. Identifique o componente/funcionalidade mais "único" do seu projeto atual
   (no PyForge, era o `PyPlayground`; no seu projeto, pode ser qualquer coisa
   que não é um CRUD genérico).
2. Peça a análise comparativa incluindo explicitamente esse componente.
3. Peça uma tabela de comparação se houver mais de duas opções em jogo (o
   caso real comparou três: Next.js, Docusaurus, MkDocs).
4. Só depois de entender os números/esforços, peça a implementação — e só da
   opção escolhida.

### Checkpoint — tente sozinho primeiro

Antes de perguntar ao Claude, tente responder por conta própria: **qual é a
parte do seu projeto que você acha que seria mais difícil de recriar em
outra tecnologia?** Anote sua resposta. Depois peça a análise ao Claude e
compare — você acertou o ponto mais custoso?

### O que você deveria ter aprendido

- Decisões de arquitetura/stack merecem uma pergunta de análise antes de um
  pedido de implementação.
- Pedir a divisão por esforço (fácil / médio / difícil) revela riscos que uma
  resposta binária ("dá pra fazer") esconde.
- Peça a real comparação, quando aplicável, entre suas opções.

---

## 1.2 — Critério geral: quando vale a pena pausar para decidir

Nem toda tarefa merece uma análise antes. Pedir "cria um botão de tema
claro/escuro" não precisa de comparação de trade-off. O critério que separa
os dois casos:

| Pergunte-se | Se a resposta é "sim" → peça análise primeiro |
|---|---|
| Reverter isso depois seria fácil ou doloroso? | Doloroso |
| Essa mudança afeta a estrutura do projeto inteiro, ou só uma parte isolada? | Projeto inteiro |
| Existe mais de uma forma razoável de resolver isso? | Sim, mais de uma |
| Já existe bastante código construído em cima da decisão atual? | Sim |

Se pelo menos duas dessas respostas apontam para a coluna da direita, vale a
pena pedir a análise antes de pedir a implementação — mesmo que isso pareça
"perder tempo" no primeiro momento.

### Exemplos rápidos

- ✅ **Vale análise antes**: trocar de framework, mudar como o conteúdo é
  armazenado (arquivos MDX vs. banco de dados), decidir a estrutura de rotas
  de um projeto que ainda vai crescer bastante.
- ❌ **Não precisa de análise**: ajustar uma cor, corrigir um texto, adicionar
  um campo num formulário já existente, consertar um bug pontual.

---

## 1.3 — O que fazer quando a análise revela que "não vale a pena"

No caso real do PyForge, a resposta foi "não migre — o custo é maior que o
ganho". Isso **não é um fracasso da conversa** — é exatamente o resultado que
a análise deveria entregar quando a ideia inicial não se sustenta. A pergunta
seguinte útil, nesse caso, foi:

> "Então transformar tudo para HTML é a melhor solução? Ou tem alguma solução
> melhor?"

Ou seja: quando a primeira ideia não compensa, não descarte a pergunta
inteira — pergunte se existe uma alternativa **intermediária** antes de
desistir ou de forçar a ideia original.

---

## O que você deveria ter aprendido

- Reconhecer decisões caras de reverter, usando a tabela de critérios acima.
- Pedir análise de trade-off em camadas de esforço (fácil/médio/difícil),
  citando explicitamente as partes mais únicas do seu projeto.
- Não tratar "não vale a pena" como um beco sem saída — perguntar por
  alternativas intermediárias antes de decidir.

**Próximo módulo**: Módulo 2 — Entregas e Organização de Projeto (como pedir
e aplicar mudanças sem que o conteúdo vá parar no arquivo errado).
