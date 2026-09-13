# Módulo 2 — Entregas e Organização de Projeto

## 2.1 — Por que este módulo existe

Quando você depende do Claude para gerar código e depois copia/cola
manualmente (sem Cursor, sem terminal integrado abrindo os arquivos), existe
um risco que não tem nada a ver com o código estar certo ou errado: **o
conteúdo ir parar no arquivo errado**. É um erro de transcrição humana, não
de lógica — e por isso é traiçoeiro: o código gerado pelo Claude pode estar
perfeito, e mesmo assim o projeto quebra.

Este módulo ensina a pedir entregas que minimizem esse risco, e a conferir
antes de commitar.

---

## Missão 2 — "O erro que não é um erro de sintaxe"

### Situação

Você pediu ao Claude dois arquivos novos para configurar o deploy do
PyForge no GitHub Pages: um `next.config.mjs` (JavaScript) e um
`.github/workflows/deploy.yml` (YAML). Copiou os dois, colou nos lugares
certos... só que o build falhou.

### O caso real

O erro reportado pelo GitHub Actions ao abrir o YAML era só um bloco de
JavaScript:

```
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
...
const nextConfig = {
```

Ou seja: o conteúdo do `next.config.mjs` tinha ido parar dentro do
`deploy.yml`. Provavelmente, ao copiar os dois blocos de código de um
documento `.md` de entrega, um foi colado no lugar do outro — um erro de
transcrição, não de lógica do código gerado.

A pista mais importante nesse caso real: **o build não mostrou "erro de
sintaxe YAML"** de forma óbvia — mostrou um erro que, à primeira vista,
parecia relacionado a alguma configuração. Só ao abrir o arquivo e ler as
primeiras linhas é que ficou claro o que realmente tinha acontecido.

### Prompt ruim (não é bem um prompt — é a ausência de uma checagem)

Copiar dois blocos de código de uma entrega e colar direto nos arquivos,
sem abrir cada um depois para confirmar que o conteúdo bate com a extensão
do arquivo.

### Prática melhor

Depois de colar qualquer arquivo que o Claude gerou, **abra o arquivo e
confira as primeiras linhas antes de commitar.** Pergunta rápida a se
fazer: "isso que estou vendo é o tipo de conteúdo que eu esperava para esse
arquivo?" — um `.yml` deveria começar com `name:` ou similar, não com
`import`.

Se o build falhar de um jeito que não faz sentido à primeira vista, o
primeiro suspeito (antes de qualquer coisa mais complexa) é: **abra os
arquivos envolvidos e confira se o conteúdo é mesmo o que deveria estar
ali.**

### O que fazer na prática

1. Ao receber múltiplos arquivos numa mesma entrega, copie um de cada vez —
   evite copiar todos e colar todos em sequência sem conferir entre um e
   outro.
2. Depois de colar, abra o arquivo final e leia ao menos as primeiras 5
   linhas. Isso não substitui testar o projeto, mas pega esse tipo de erro
   antes mesmo de rodar qualquer coisa.
3. Se um build falhar com um erro que parece "sem sentido" dado o que você
   pediu, comece verificando arquivos, não lógica.

### Checkpoint — tente sozinho primeiro

Da próxima vez que você receber uma entrega com mais de um arquivo, antes de
colar tudo, escreva (mentalmente ou em uma nota) qual conteúdo você espera
ver em cada um, pela extensão (`.yml`, `.mjs`, `.tsx`...). Depois de colar,
confira se bateu.

### O que você deveria ter aprendido

- Um build pode falhar por erro de transcrição humana, não só por erro de
  lógica do código gerado — e o sintoma nem sempre aponta claramente pra
  isso.
- Conferir o *conteúdo* de um arquivo depois de colar é tão importante
  quanto conferir o *caminho* onde ele foi salvo.

---

## 2.2 — Pedindo entregas que reduzem esse risco

Um padrão que aparece em praticamente toda correção documentada nos dois
projetos reais: o Claude nunca entrega "o projeto inteiro recolado" para uma
mudança pequena — só os arquivos novos ou alterados, com uma seção explícita
dizendo onde cada um vai.

### Prompt ruim

> "Me manda o projeto atualizado"

Isso convida a uma entrega gigante, onde é fácil se perder sobre o que
realmente mudou — e mais difícil ainda de conferir arquivo por arquivo.

### Prompt bom

> "Me entrega só os arquivos novos ou alterados dessa correção, com uma
> tabela indicando onde cada um vai no projeto."

Esse formato (visto em praticamente todos os documentos de correção do
PyForge e do curso de Linux) faz duas coisas: reduz a superfície de erro (só
2-5 arquivos por vez, não o projeto inteiro) e força uma tabela de destino
explícita, que funciona como checklist na hora de aplicar.

### Quando pedir um snapshot completo, então?

Só quando:
- É a primeira entrega de um projeto novo (não existe "alterado" ainda).
- Você perdeu o controle de quantos arquivos foram tocados e precisa
  recomeçar do zero para garantir consistência.
- Você quer atualizar uma "Base de Conhecimento do Projeto" consolidada
  (isso é diferente do código do projeto em si — ver Módulo 4).

---

## 2.3 — Organização de pastas: uma decisão, não um acidente

Os dois projetos reais têm convenções de pastas que nunca foram explicadas
como decisão consciente — elas simplesmente "aconteceram":

- PyForge: `app/`, `components/`, `content/`, `lib/`, e uma pasta
  `_Desenvolvimentos/` guardando documentos de referência (`.md`) fora do
  código de produção.
- Linux: conteúdo das aulas concentrado num único arquivo
  (`courseData.ts`), diferente da abordagem por arquivo separado do PyForge.

O `_Desenvolvimentos/` do PyForge, aliás, causou um bug real: uma cópia
antiga de código ficou salva ali dentro (por um `.md` de entrega que
preservou a estrutura de pastas inteira ao ser extraído), e o TypeScript
tentou compilar essa cópia morta, quebrando o build. A causa raiz: o
`tsconfig.json` não excluía essa pasta da checagem de tipos.

### Prática recomendada para este treinamento

Desde o primeiro commit do site do treinamento (Módulo 0), decida
explicitamente:
- Onde fica o conteúdo de cada módulo (ex: `content/modulo-00/`,
  `content/modulo-01/`...).
- Onde ficam documentos de referência que **não são código de produção**
  (ex: `_referencias/` ou similar) — e garanta que o build exclui essa pasta
  explicitamente, exatamente para não repetir o bug do PyForge.

### Prompt bom para decidir isso com o Claude

> "Antes de criar os primeiros arquivos, me ajuda a decidir a estrutura de
> pastas do projeto. Quero separar claramente código de produção de
> documentos de referência/anotações, e garantir que o build nunca tente
> processar a pasta de referência."

---

## O que você deveria ter aprendido

- Depois de colar um arquivo gerado, confira o conteúdo, não só o destino.
- Peça entregas cirúrgicas (arquivos alterados + tabela de destino) em vez
  de snapshots completos para mudanças pequenas.
- Decida a estrutura de pastas do projeto conscientemente desde o início, e
  garanta explicitamente que pastas de referência/documentação fiquem fora
  da checagem de build.

**Próximo módulo**: Módulo 3 — Debug em Camadas (quando um sintoma tem várias
causas empilhadas, e por que o `build` de produção pega erros que o `dev`
nunca pegaria).
