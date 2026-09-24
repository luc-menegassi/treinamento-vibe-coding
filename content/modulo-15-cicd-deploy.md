# Módulo 15 — CI/CD e Deploy

## 15.1 — Por que este módulo existe

Você já usa CI/CD desde o Módulo 6 — todo `git push` na `main` dispara o
`deploy.yml`, que builda e publica o site sozinho. E antes disso, no
PyForge e no curso de Linux, você já enfrentou (e resolveu) vários problemas
reais de deploy. Este módulo não introduz nada tecnicamente novo — ele
**consolida** esse conhecimento espalhado como uma disciplina própria, e
organiza os erros reais que você já viveu como um catálogo de consulta.

---

## 15.2 — Anatomia de um workflow (usando o nosso `deploy.yml` real)

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

**`on`** define os **gatilhos** — o que faz o workflow rodar. `push` na
`main` é automático; `workflow_dispatch` permite disparar manualmente pela
aba Actions do GitHub, sem precisar de um commit novo (isso foi útil de
verdade quando um workflow travou e precisou ser re-executado sem mudar
código).

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**`permissions`** define o que o workflow tem autorização pra fazer. Sem
`pages: write`, por exemplo, o passo de publicação falharia por falta de
permissão, mesmo que o build funcionasse perfeitamente.

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```

**`concurrency`** evita que dois deploys rodem ao mesmo tempo — se você der
dois pushes em sequência rápida, o mais antigo é cancelado em favor do mais
novo, em vez de os dois competirem.

```yaml
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
  deploy:
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

**`jobs`** são as unidades de trabalho. O `deploy` só roda `needs: build` —
depois que o `build` tiver passado. Cada job roda numa máquina virtual
limpa, do zero, por isso o `checkout` (baixar o código) e o `setup-node`
(instalar o Node) são sempre os primeiros passos.

---

## 15.3 — Catálogo de falhas reais de deploy (já vividas por você)

| Sintoma | Causa real | Onde já aconteceu |
|---|---|---|
| `Get Pages site failed... Error: Not Found` | GitHub Pages nunca foi habilitado nas configurações do repositório | Curso de Linux |
| Erro persiste mesmo depois de mudar o Source pra "GitHub Actions" | A configuração pareceu salva, mas não persistiu de verdade | Curso de Linux |
| Botão "Run workflow" não aparece | Você está na visão "All workflows"; precisa entrar no workflow específico primeiro | Curso de Linux |
| Menu do run só mostra "View workflow file" e "Delete", sem "Re-run" | O run falhou **antes** de qualquer job começar — geralmente erro de sintaxe no YAML | Curso de Linux (e quase repetido no nosso Módulo 6) |
| Erro raro de tipo, tipo "conteúdo errado" dentro de um arquivo `.yml` | Conteúdo de outro arquivo foi colado no lugar (Módulo 2) | PyForge |
| Build passa localmente com `npm run dev`, mas falha no CI | `next build` faz checagens que `next dev` não faz (Módulo 3) | PyForge (duas vezes) |
| Deploy falha mesmo com build passando | Falta de permissão (`pages: write`) ou Source ainda não configurado como "GitHub Actions" | Curso de Linux, PyForge |

Esse catálogo não é exaustivo — é o que você já encontrou de verdade. A
lição maior não é decorar cada linha, é reconhecer o **padrão**: a maioria
das falhas de deploy tem causa em **configuração do GitHub** (Source,
permissões) ou em **conteúdo do próprio arquivo de workflow** — raramente é
o código da aplicação em si.

---

## Missão — Diagnosticando uma falha de deploy pelo catálogo

### Situação

Um novo problema de deploy aparece (neste ou em outro projeto seu). Antes de
perguntar ao Claude "por que não funcionou", use o catálogo acima como
primeira triagem.

### Prompt bom (depois da triagem inicial)

> "O deploy falhou com esta mensagem: [cole a mensagem completa]. Já
> conferi que o Source está em 'GitHub Actions' e que o conteúdo do
> `deploy.yml` parece correto. Qual das causas do nosso catálogo de falhas
> combina com esse erro, ou é um caso novo?"

Repare que o prompt já traz o que **foi checado**, não só o sintoma — isso
poupa uma rodada inteira de perguntas de esclarecimento.

### O que fazer na prática

1. Antes de perguntar, confira: Source está em "GitHub Actions"? O `build`
   passou localmente antes do push (Módulo 3)? O conteúdo dos arquivos
   modificados está correto (Módulo 2)?
2. Se nada disso resolver, aí sim é hora de investigar o log específico do
   step que falhou.
3. Depois de resolver, considere adicionar o novo padrão ao seu próprio
   catálogo pessoal — o Cheatsheet e o Glossário deste treinamento existem
   exatamente pra isso.

### Checkpoint — tente sozinho primeiro

Releia o catálogo acima sem eu explicar de novo, e tente responder: qual dos
sete casos você acha que é mais fácil de acontecer de novo no seu próprio
fluxo de trabalho, e por quê?

### O que você deveria ter aprendido

- A anatomia de um workflow: gatilhos (`on`), permissões, concorrência, e
  jobs com suas dependências (`needs`).
- A maioria das falhas de deploy tem causa em configuração do GitHub ou no
  conteúdo do workflow, não no código da aplicação.
- Um catálogo pessoal de falhas já vividas é mais valioso que decorar teoria
  genérica de CI/CD — e cresce a cada novo caso real.

**Próximo módulo**: Módulo 16 — Arquitetura e Manutenção, o último do
roadmap.
