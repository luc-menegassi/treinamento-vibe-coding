# Módulo 6 — Construindo e Publicando o Site do Treinamento

## 6.1 — Por que este módulo existe

Este é o projeto final da Trilha 1 (Controlar): construir e publicar, do
zero, o próprio site deste treinamento. Diferente dos Módulos 0-5, aqui não
existe um caso real "pronto" de outro projeto para estudar — o caso real
**é você construindo agora**, e os erros que você encontrou no caminho
viraram as missões deste módulo.

Uma decisão consciente foi tomada antes de começar: usar **Next.js**, o
mesmo framework do PyForge — não porque fosse o mais simples em teoria (uma
análise honesta colocaria HTML puro como caminho de menor esforço), mas
porque manter o mesmo stack dos seus outros projetos reais evita que você
precise aprender dois padrões diferentes ao mesmo tempo.

---

## 6.2 — Anatomia do projeto

Antes de entrar nas missões, uma referência rápida do que cada arquivo faz —
volte aqui sempre que esquecer o propósito de um deles (o Glossário também
tem entradas pra cada um).

| Arquivo/pasta | Propósito |
|---|---|
| `package.json` | Identidade do projeto: nome, dependências, comandos (`dev`, `build`) |
| `next.config.mjs` | Configura o Next.js para gerar o site como arquivos estáticos, prontos pro GitHub Pages |
| `tsconfig.json` | Configuração do TypeScript, incluindo o atalho de import `@/` |
| `.gitignore` | Impede que `node_modules/` e as pastas de build sejam commitadas |
| `app/layout.tsx` | O "molde" de toda página: cabeçalho, navegação, rodapé |
| `app/globals.css` | Aparência visual do site inteiro |
| `lib/modulos.ts` | Lê os `.md` da pasta `content/` e monta a lista de módulos |
| `content/*.md` | O conteúdo de cada módulo, em Markdown puro (sem MDX — ver 6.3) |
| `app/page.tsx` | A home, listando os módulos |
| `app/modulo/[slug]/page.tsx` | Renderiza cada módulo individualmente (rota dinâmica) |
| `lib/glossario.ts` + `app/glossario/page.tsx` | Dados e página do Glossário |
| `lib/cheatsheet.ts` + `app/cheatsheet/page.tsx` | Dados e página do Cheatsheet |
| `.github/workflows/deploy.yml` | Publica o site automaticamente a cada `git push` na `main` |

### 6.3 — Por que Markdown puro, e não MDX como o PyForge

O PyForge usa MDX porque o conteúdo dele mistura texto com **componentes
React interativos** (`PyPlayground`, `Quiz`, `Diagrama`). O conteúdo deste
treinamento é só texto, tabela e código — não há nada interativo para
incorporar. Markdown puro (lido e renderizado com `react-markdown`) resolve
isso com uma fração da complexidade, sem abrir mão de nada que o conteúdo
realmente precisa.

---

## Missão — "O build funciona, mas a estrutura de pastas está errada"

### Situação

Depois de criar os arquivos 1 a 9 (incluindo `lib/modulos.ts` e a pasta
`content/`), a estrutura parecia certa numa primeira olhada no VS Code — mas
um print da árvore de arquivos revelou que `lib/` e `content/` tinham sido
criadas **dentro** de `app/`, em vez de na raiz do projeto.

### Por que isso quebraria o projeto

Dois arquivos dependiam dessas pastas estarem na raiz:
- `tsconfig.json` tinha `"@/*": ["./*"]` — o atalho `@/` aponta pra raiz do
  projeto, não pra dentro de `app/`.
- `lib/modulos.ts` tinha `path.join(process.cwd(), "content")` — também
  aponta pra raiz.

Se o projeto tivesse sido rodado com essa estrutura errada, o erro seria algo
como "módulo não encontrado" ou "pasta não existe" — mas o problema real
(localização errada) só ficaria claro investigando, não pela mensagem em si.

### Como foi corrigido

Revisão visual da árvore de arquivos (um print) antes de rodar qualquer
coisa — o problema foi identificado e corrigido **antes** de gerar um erro de
verdade, movendo `content/` e depois `lib/` para a raiz, cada uma em uma
etapa separada e confirmada com um novo print.

### O que você deveria ter aprendido

- Onde um arquivo/pasta é criado importa tanto quanto o conteúdo dele — a
  mesma lição do Módulo 2, aplicada a pastas em vez de arquivos individuais.
- Conferir a estrutura com um print **antes** de rodar `npm install`/`npm run
  dev` pode evitar um ciclo de debug inteiro.
- Mover várias coisas de uma vez (mover A e B juntos) tem mais risco de dar
  errado do que mover uma de cada vez, confirmando entre os passos.

---

## Missão — "O erro de sintaxe que sumiu ao comparar linha por linha"

### Situação

Depois de criar `app/layout.tsx`, o `npm run dev` recusou compilar:

```
Unexpected token. Did you mean `{'>'}` or `&gt;`?
```

apontando para a linha do `>` que fecha a tag `<a>` no rodapé — uma linha que,
olhando isoladamente, parecia sintaticamente correta.

### A causa real

Comparando o arquivo colado com o conteúdo original, a linha de **abertura**
da tag (`<a`) simplesmente não tinha sido copiada — sobraram só os atributos
(`href`, `target`, `rel`) soltos, sem nenhuma tag os envolvendo. O parser via
esses atributos como texto solto, e travava exatamente no `>` que deveria
fechar uma tag que, pra ele, nunca tinha aberto.

### Como foi corrigido

Comparação visual, linha por linha, do trecho reportado no erro contra o
conteúdo original — a linha faltante (`<a`) foi identificada e adicionada de
volta.

### O que você deveria ter aprendido

- Um erro de sintaxe aponta pra **onde o parser percebeu o problema**, não
  necessariamente pra onde ele **começou**. Nesse caso, a causa (linha
  faltante) estava *antes* da linha reportada no erro.
- Quando um trecho de código "parece certo" mas o compilador discorda, vale
  comparar contra a fonte original linha por linha, em vez de reler só o
  trecho isolado repetidamente.

---

## Missão — "O arquivo CSS cortado no meio"

### Situação

Ao criar `app/globals.css` (um arquivo longo), o `npm run dev` acusou:

```
Syntax error: Unclosed block
.cheat-codigo {
```

### A causa real

O arquivo colado estava **incompleto** — parava no meio da regra
`.cheat-codigo {`, faltando o resto dela e a última regra (`.cheat-desc`).
Isso não é um erro de sintaxe no sentido de "caractere errado" — é
literalmente conteúdo faltando, provavelmente cortado durante o
copiar-e-colar de um arquivo longo.

### Como foi diagnosticado

Em vez de tentar contar chaves `{` `}` manualmente em um arquivo de quase 400
linhas, o conteúdo completo foi colado de volta para conferência — e a
ausência do fechamento ficou evidente ao comparar o final do arquivo com o
esperado.

### O que você deveria ter aprendido

- "Bloco não fechado" em CSS pode ter a causa **bem antes** da linha onde o
  erro aparece — o CSS só percebe o problema quando tenta abrir mais um
  bloco à frente.
- Depois de colar um arquivo longo, vale rolar até o final e conferir se a
  última linha bate com o esperado — é mais rápido que catar chaves uma por
  uma.

---

## Missão — "O aviso vermelho que não era um erro de verdade"

### Situação

O VS Code passou a mostrar um sublinhado vermelho em `app/layout.tsx`, na
linha `import "./globals.css"`:

```
Cannot find module or type declarations for side-effect import of './globals.css'. ts(2882)
```

Mesmo depois de reiniciar o servidor de TypeScript do editor, o aviso
persistiu — mas o site continuava funcionando normalmente no navegador.

### A causa real

Essa é uma mudança de comportamento da própria versão mais recente do
TypeScript (6.0): uma configuração chamada `noUncheckedSideEffectImports`
passou a vir **ativada por padrão**, e ela reclama de qualquer
`import "arquivo.css"` sem uma declaração de tipo explícita — mesmo sendo um
padrão totalmente válido em projetos Next.js. Não era um erro de código, era
uma checagem nova de uma ferramenta.

### Como foi confirmado que não era um erro real

A pergunta certa, antes de tentar qualquer correção, foi: **"o site continua
funcionando de verdade, fora do editor?"** A resposta foi sim — o que já
indicava que o problema era do checador de tipos, não do código em si.

### A correção

Um arquivo `globals.d.ts`, na raiz do projeto, com uma linha:

```ts
declare module "*.css" {}
```

Isso ensina o TypeScript a reconhecer arquivos `.css` importados como módulos
válidos, sem reclamar.

### O que você deveria ter aprendido

- Nem todo sublinhado vermelho no editor é um erro que quebra o projeto —
  às vezes é o checador de tipos reagindo a uma mudança recente na própria
  ferramenta, não no seu código.
- A pergunta "isso ainda funciona de verdade, fora do editor?" é uma forma
  rápida de diferenciar aviso cosmético de erro real — mesmo espírito do
  Módulo 3 (diferenciar `dev` de `build`).

---

## 6.4 — Um erro que quase chegou até você, mas foi pego antes

Durante a produção do Glossário e Cheatsheet, um erro real quase foi
entregue: os links de navegação (`Cheatsheet`, `Glossário`) foram escritos
com `<a href="...">` em vez de `Link href="..."` do Next.js. Isso é
exatamente o mesmo erro documentado no guia de deploy do PyForge — "qualquer
link interno deve usar `next/link`; um `<a href="/curso/...">` manual
quebraria [o basePath]". Uma varredura no código (`grep` procurando esse
padrão) achou e corrigiu antes de qualquer arquivo ser entregue.

**Lição**: o mesmo tipo de erro pode se repetir em projetos diferentes,
mesmo quando já está documentado em outro lugar — vale revisitar
documentação de erros conhecidos ao começar uma tarefa parecida, e fazer uma
varredura deliberada, não confiar só na memória de "eu sei que isso pode dar
errado".

---

## O que você deveria ter aprendido (módulo completo)

- A anatomia de um projeto Next.js publicado no GitHub Pages: o papel de
  cada arquivo de configuração, da estrutura de pastas, e do workflow de
  deploy.
- Por que Markdown puro foi suficiente aqui, e por que o PyForge precisou de
  MDX (a diferença está no conteúdo, não no framework).
- Debugar estrutura de pastas (não só código) com a mesma disciplina do
  Módulo 2 — conferir localização antes de rodar.
- Diferenciar causa de sintoma em erros de parser — a linha reportada nem
  sempre é a linha onde o problema começou.
- Diferenciar aviso de editor de erro real, perguntando "isso ainda funciona
  de verdade?" antes de investigar mais fundo.
- Erros documentados em um projeto podem se repetir em outro — vale
  consultar o histórico antes de refazer o mesmo trabalho de descoberta.

**Trilha 1 (Controlar) concluída.** Próximo: Módulos 7 em diante (Construir),
começando por Contexto e exploração do projeto — mas antes disso, o
treinamento tem uma pausa natural para você usar o site que acabou de
construir.
