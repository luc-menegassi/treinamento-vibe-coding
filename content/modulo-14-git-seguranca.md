# Módulo 14 — Git como Mecanismo de Segurança

## 14.1 — Por que este módulo existe

Até agora, o Git apareceu neste treinamento como ferramenta de
versionamento (Módulo 0) e de diagnóstico de destino de push (Módulo 5).
Este módulo mostra uma terceira função: o Git como **mecanismo de
segurança** — tanto pra investigar problemas quanto pra reverter mudanças
com segurança.

---

## 14.2 — Um problema que o Módulo 13 deixou em aberto

O Módulo 13 disse: "uma credencial exposta continua comprometida mesmo
depois de removida do código atual, porque pode sobreviver no histórico de
commits". Este módulo explica o porquê, e o que fazer a respeito.

**Por que apagar do arquivo atual não basta**: o Git guarda o histórico
completo de cada versão de cada arquivo. Se uma chave de API foi commitada
por engano e depois removida num commit seguinte, ela **continua existindo**
no commit antigo — qualquer pessoa com acesso ao repositório (ou ao
histórico público, se for um repo público) pode voltar no tempo e ver o
valor exposto, mesmo que o arquivo atual esteja limpo.

**Como confirmar isso na prática**:

```bash
git log -p --all -- caminho/do/arquivo
```

Esse comando mostra o histórico completo de mudanças (`-p` = "patch", exibe
as diferenças linha a linha) de um arquivo específico, incluindo commits
antigos — é assim que se audita se algo sensível já existiu ali algum dia.

**O que fazer se encontrar uma credencial no histórico**: a remoção
definitiva do histórico exige ferramentas específicas (como
`git filter-repo`, mais segura que o antigo `git filter-branch`), que
reescrevem o histórico inteiro do repositório — uma operação séria, que
exige cuidado e, geralmente, avisar qualquer outra pessoa que já tenha
clonado o repositório. Isso foge do escopo deste treinamento (uso solo, sem
colaboração), mas o passo mais importante continua sendo o mesmo do Módulo
13: **revogar a credencial**. Uma vez revogada, o valor exposto no histórico
não serve mais pra nada, mesmo que continue lá.

---

## 14.3 — Desfazer com segurança: `revert` vs `reset`

Dois comandos que parecem fazer a mesma coisa ("desfazer algo"), mas com
diferenças importantes de segurança:

| Comando | O que faz | Risco |
|---|---|---|
| `git revert <commit>` | Cria um **novo commit** que desfaz as mudanças de um commit anterior — o histórico original continua intacto | Baixo — seguro mesmo depois de já ter dado `push` |
| `git reset <commit>` | **Reescreve o histórico**, fazendo parecer que os commits depois daquele ponto nunca existiram | Alto se já foi dado `push` — pode causar conflitos sérios para qualquer outra cópia do repositório |

**Regra prática**: se o commit problemático **já foi enviado ao GitHub**
(`git push`), prefira `git revert` — ele desfaz o efeito sem apagar a
história, o que é mais seguro. `git reset` é aceitável só em commits que
**ainda não saíram da sua máquina**.

---

## Missão — Investigando quando um problema foi introduzido

### Situação

Imagine que um bug apareceu no site do treinamento, mas você não sabe em
qual dos últimos commits ele foi introduzido — só sabe que, em algum ponto
recente, funcionava.

### Prompt bom

> "Preciso descobrir em qual commit um bug específico foi introduzido. O
> site funcionava há alguns commits atrás, mas não sei exatamente qual
> mudança quebrou. Como uso `git bisect` pra encontrar isso de forma
> sistemática, em vez de testar commit por commit manualmente?"

`git bisect` automatiza uma busca binária pelo histórico: você marca um
commit "bom" (onde funcionava) e um "ruim" (onde não funciona), e o Git vai
te apresentando commits no meio do caminho pra você testar — reduzindo
drasticamente quantos commits você precisa checar manualmente.

### O que fazer na prática

1. Antes de sair testando commit por commit, considere se `git bisect` seria
   mais rápido — especialmente se o histórico tiver muitos commits desde a
   última vez que funcionava.
2. Ao encontrar um commit problemático já enviado ao GitHub, use
   `git revert`, não `git reset`.
3. Se algum dia precisar auditar se uma credencial já existiu no histórico
   de um arquivo, use `git log -p --all -- caminho/do/arquivo`.

### Checkpoint — tente sozinho primeiro

Rode `git log --oneline` no seu repositório do treinamento e veja quantos
commits você já tem. Você reconhece, só pelos nomes dos commits, o que cada
um mudou? Se não, isso é um sinal de que vale caprichar mais nas mensagens de
commit daqui pra frente — elas são a documentação mais barata que existe.

### O que você deveria ter aprendido

- O histórico do Git preserva tudo, inclusive o que foi "apagado" depois —
  por isso remover uma credencial do arquivo atual não basta.
- `git log -p --all -- arquivo` audita o histórico completo de um arquivo
  específico.
- `git revert` é seguro depois de um `push`; `git reset` só é seguro antes.
- `git bisect` encontra um commit problemático por busca binária, mais
  rápido que testar um por um manualmente.

**Próximo módulo**: Módulo 15 — CI/CD e Deploy (consolidando tudo que já
vimos sobre GitHub Actions, agora como disciplina própria).
