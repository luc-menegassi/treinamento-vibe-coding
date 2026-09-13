# Módulo 0 — Ambiente e Terminal

Antes de qualquer prompt ao Claude, você precisa de um ambiente onde o código
gerado possa rodar, ser versionado e publicado. Este módulo não tem "missão"
no formato de problema-a-resolver — é a base física de tudo que vem depois.

**Ambiente-alvo deste treinamento**: Fedora Linux, VS Code + Cursor, Git,
Node.js, GitHub.

---

## 0.1 — Por que este módulo existe

No PyForge e no curso de Linux, todo o desenvolvimento até hoje foi feito só
pedindo ao Claude — sem nunca rodar `npm install` ou ver o projeto localmente.
Isso funciona até certo ponto, mas cria um teto: quando o Claude erra ou o
build quebra, não há como diagnosticar nada sem terminal, sem Git, sem saber
o que está rodando de fato.

Este módulo existe para tirar esse teto.

---

## 0.2 — Terminal básico no Fedora

Fedora usa `dnf` como gerenciador de pacotes (diferente de Ubuntu/Debian, que
usa `apt`). Comandos equivalentes:

| Tarefa | Fedora (`dnf`) | Ubuntu/Debian (`apt`) — só para referência |
|---|---|---|
| Instalar um pacote | `sudo dnf install <pacote>` | `sudo apt install <pacote>` |
| Atualizar tudo | `sudo dnf upgrade` | `sudo apt upgrade` |
| Buscar um pacote | `dnf search <termo>` | `apt search <termo>` |
| Remover um pacote | `sudo dnf remove <pacote>` | `sudo apt remove <pacote>` |

Comandos de navegação que você vai usar o tempo todo:

```bash
pwd          # mostra em qual pasta você está
ls           # lista arquivos da pasta atual
ls -la       # lista incluindo arquivos ocultos, com detalhes
cd nome-pasta   # entra numa pasta
cd ..        # sobe um nível
mkdir nome   # cria uma pasta
```

**Checkpoint**: abra o terminal agora e rode `pwd`, depois `ls`. Confirme que
você reconhece a pasta em que está.

---

## 0.3 — Instalando Node.js

Todo projeto React/Next.js (como o PyForge) e Vite (como o curso de Linux)
precisa do Node.js instalado — é ele que roda o build, gerencia os pacotes
(`npm`) e serve o projeto localmente.

```bash
sudo dnf install nodejs npm
```

Confirme a instalação:

```bash
node --version
npm --version
```

Se aparecer um número de versão em cada comando (ex: `v20.11.0`), está pronto.

<details>
<summary>Por que isso importa</summary>

Sem o Node.js instalado, `npm install` e `npm run dev` — os dois comandos mais
comuns que o Claude vai te instruir a rodar — simplesmente não existem no seu
sistema. É o primeiro coisa a verificar se algum comando "não for reconhecido".
</details>

---

## 0.4 — Git: o mínimo necessário para começar

Git precisa estar instalado e configurado **antes** do primeiro commit,
porque é ele que registra quem fez a mudança.

```bash
sudo dnf install git
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Os cinco comandos que você vai usar em praticamente todo módulo daqui pra
frente:

| Comando | O que faz |
|---|---|
| `git init` | transforma a pasta atual num repositório Git (só uma vez, no início) |
| `git status` | mostra o que mudou desde o último commit |
| `git add .` | marca todos os arquivos modificados para o próximo commit (não sobe nada ainda) |
| `git commit -m "mensagem"` | grava as mudanças marcadas, localmente |
| `git push` | envia os commits locais para o repositório remoto (GitHub) |

**Diferença importante**: `git add` e `git commit` são só locais. Nada sai do
seu computador até o `git push`.

### Clonando um repositório existente

Se o projeto já existe no GitHub (como o PyForge ou o curso de Linux) e você
quer trabalhar nele localmente:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

**Checkpoint (tente sozinho antes de perguntar ao Claude)**: crie uma pasta
nova, rode `git init`, crie um arquivo de texto qualquer (`echo "teste" >
arquivo.txt`), e faça o primeiro commit sozinho, sem pedir ajuda. Se travar em
algum passo, **anote onde travou** antes de perguntar — isso já é a primeira
prática de reduzir dependência: tentar, identificar o ponto exato do
problema, e só então pedir ajuda cirúrgica (em vez de "não funcionou, me
ajuda").

---

## 0.5 — VS Code

VS Code é o editor onde você vai ver, editar e organizar os arquivos que o
Claude gera.

```bash
sudo dnf install code
```

(Se o pacote não for encontrado, o Fedora pode exigir adicionar o repositório
oficial da Microsoft primeiro — se isso acontecer, é um bom primeiro exercício
de prompt: peça ao Claude "como adiciono o repositório do VS Code no Fedora"
e siga as instruções.)

Terminal integrado do VS Code: `Ctrl+\`` (crase) abre um terminal dentro do
próprio editor — você não precisa alternar entre janelas.

---

## 0.6 — Cursor: quando usar em vez do chat

Cursor é um editor (fork do VS Code) com IA integrada diretamente no fluxo de
edição. A diferença de fluxo entre ele e o chat aqui é importante:

| | Chat do Claude (aqui) | Cursor |
|---|---|---|
| Onde o código aparece | Você copia e cola manualmente | Editado direto no arquivo, com diff visual |
| Contexto do projeto | Precisa ser colado/anexado | Lê os arquivos abertos automaticamente |
| Melhor para | Decisões, planejamento, análise de trade-off, revisão de conteúdo | Edições rápidas, refatoração, correções pontuais já com o arquivo aberto |

**Regra prática para este treinamento**: use o chat para as decisões
("devo migrar para X ou Y?", "por que este erro acontece?"), e o Cursor para
aplicar a mudança já decidida direto no arquivo. Isso evita o erro documentado
no PyForge (A2 do mapa de conhecimento) — conteúdo indo pro arquivo errado ao
copiar/colar manualmente.

Instalação: baixe direto do site oficial do Cursor (não está nos repositórios
do `dnf`) e siga o instalador `.AppImage` ou o pacote fornecido.

---

## 0.7 — Fechando o módulo: primeiro repositório do treinamento

Esta é a única parte deste módulo que já é "prática de vibe coding" de
verdade — o resto foi só configuração de ambiente.

1. Crie um repositório novo no GitHub (nome sugerido: `treinamento-vibe-coding`).
2. Clone localmente:
   ```bash
   git clone https://github.com/seu-usuario/treinamento-vibe-coding.git
   cd treinamento-vibe-coding
   ```
3. Crie um arquivo `README.md` com uma linha qualquer.
4. Suba:
   ```bash
   git add .
   git commit -m "primeiro commit do treinamento"
   git push
   ```
5. Confirme no GitHub (pelo navegador) que o `README.md` apareceu.

Isso fecha o ciclo completo — ambiente configurado, Git funcionando,
repositório criado — que os Módulos 1 em diante vão usar para, aos poucos,
construir o próprio site deste treinamento.

---

## 0.8 — Missão real: quando o `push` simplesmente não autentica

Esta seção não é hipotética — é o registro de um problema real que aconteceu
durante a produção deste próprio treinamento, na hora de subir os primeiros
módulos pro GitHub. Vale a pena estudar com calma porque combina três coisas
que você vai encontrar de novo, em combinações diferentes, pelo resto da sua
vida como programador: **autenticação**, **segurança de credenciais**, e
**debug em camadas** (o mesmo espírito do Módulo 3, só que aplicado ao
ambiente, não ao código).

### Situação

Depois de configurar tudo (Git instalado, `user.name`/`user.email`
definidos), veio a hora de dar o primeiro `git push` de verdade, subindo os
módulos do treinamento pro repositório remoto. O comando falhou:

```
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/...'
```

### Causa raiz nº 1 — GitHub não aceita mais usuário/senha

Desde 2021, o GitHub não aceita mais autenticação por senha comum em
operações de linha de comando (`push`, `pull`, `clone` via HTTPS). É
obrigatório usar um **Personal Access Token (PAT)** no lugar da senha, ou
configurar autenticação via **SSH**.

**Como gerar um token**: GitHub → foto de perfil → Settings → Developer
settings → Personal access tokens → Tokens (classic) → Generate new token
(classic). Marque a permissão `repo` (acesso completo a repositórios), e
escolha um prazo de expiração — para um projeto de estudo, vale escolher um
prazo mais longo, pra não precisar regenerar toda hora.

### Um desvio no caminho — erro de sintaxe do `git config`

No meio do processo, surgiu esta tentativa:

```bash
git config --global luc-menegassi "Luciano"
```

```
error: key does not contain a section: luc-menegassi
```

O comando estava incompleto: `git config --global` espera uma chave no
formato `secao.chave` (como `user.name`), não um nome solto. O comando certo
já tinha sido usado no início deste módulo:

```bash
git config --global user.name "Luciano"
```

**Lição**: um erro de sintaxe do Git costuma vir com uma mensagem que
explica exatamente o que falta (`key does not contain a section` = "faltou
a seção da chave") — vale ler a mensagem de erro completa antes de assumir
que é um problema maior do que realmente é.

### Causa raiz nº 2 — um erro de segurança real, ao vivo

Depois de gerar o token, a primeira tentativa de usá-lo foi colando o valor
completo **direto no chat com o Claude**, pedindo ajuda. Isso é uma falha de
segurança real, não hipotética: **qualquer token, senha ou chave de API deixa
de ser confiável no instante em que é digitado em qualquer lugar que não seja
o prompt interativo da própria ferramenta que está pedindo** — um terminal,
um campo de senha. Isso inclui chats, arquivos de anotação, mensagens, e
principalmente qualquer coisa que fique salva (como o histórico desta
conversa).

**A ação correta, tomada nesse caso real**: revogar o token imediatamente no
GitHub (Settings → Developer settings → Personal access tokens → Delete) e
gerar um novo. Um token exposto deve ser tratado como comprometido mesmo que
não haja evidência de uso indevido — a suposição segura é sempre "alguém
mais pode ter visto isso".

> ⚠️ **Regra permanente para todo este treinamento**: nunca cole tokens,
> senhas ou chaves de API no chat, em nenhuma situação, mesmo pedindo ajuda
> para debugar. Se uma ferramenta pede uma credencial, ela deve ser digitada
> **somente** no prompt interativo dela — nunca escrita por extenso dentro
> de um comando, nunca compartilhada para diagnóstico.

### Causa raiz nº 3 — autenticação falhando *sem nem perguntar*

Depois de gerar o token novo (com a permissão `repo` corretamente marcada) e
configurar `git config --global credential.helper store` (para não precisar
colar o token a cada push), o `git push` continuou falhando — só que dessa
vez de um jeito mais estranho: **o terminal nem chegava a perguntar usuário
e senha**, ia direto pro erro.

Isso é um sintoma de debug em camadas (Módulo 3): um erro pode continuar
aparecendo depois de uma correção real, porque a causa mudou. A investigação
seguiu um checklist de eliminação, cada item descartando uma hipótese:

| Hipótese testada | Comando | Resultado |
|---|---|---|
| Existe um helper de sistema (`libsecret`) competindo com o `store`? | `cat /etc/gitconfig \| grep credential` | Não — nada configurado |
| Existe uma credencial antiga salva, incorreta, em `~/.git-credentials`? | `ls -la ~/.git-credentials` | Arquivo existia, mas vazio (0 bytes) |
| Existe um `~/.netrc` com credencial antiga (usado pelo `curl`, por baixo do Git)? | `ls -la ~/.netrc` | Não existia |
| Existe uma reescrita de URL ou config local estranha no repositório? | `git config --list --show-origin \| grep -i url` | Não — só a URL correta |
| Existe alguma variável de ambiente interceptando a autenticação? | `env \| grep -i -E 'git\|github\|askpass'` | **Sim**: `SSH_ASKPASS=/usr/bin/ksshaskpass` |

A causa real: `SSH_ASKPASS` é uma variável que diz ao Git (e a outras
ferramentas) para pedir credenciais através de uma **janela gráfica
separada**, em vez de perguntar no próprio terminal. Quando o terminal usado
não tem uma forma confiável de abrir/mostrar essa janela, o programa
(`ksshaskpass`, nesse caso) falha silenciosamente, e o Git acaba enviando uma
credencial vazia para o GitHub — que rejeita na hora, sem nenhum prompt
visível no terminal.

### A correção

```bash
env -u SSH_ASKPASS git push
```

Esse comando roda o `git push` removendo a variável `SSH_ASKPASS` só para
essa execução (sem alterar nada permanentemente no sistema). Com isso, o
Git foi obrigado a perguntar usuário e senha **direto no terminal**:

```
Username for 'https://github.com': luc-menegassi
Password for 'https://luc-menegassi@github.com':
Everything up-to-date
```

Como o `credential.helper=store` já estava configurado, essa autenticação
bem-sucedida ficou salva — os próximos `git push` (já sem precisar do
`env -u SSH_ASKPASS`) passaram a funcionar normalmente, sem pedir nada de
novo.

> ⚠️ **Ressalva importante**: `credential.helper=store` resolveu o problema
> **naquele momento**, mas não é a forma mais segura de guardar credenciais —
> ele salva o token em texto puro num arquivo (`~/.git-credentials`). Para
> projetos novos, prefira uma destas alternativas mais seguras:
> - **SSH** (gerar um par de chaves e cadastrar a pública no GitHub — elimina
>   token por completo nas operações de Git);
> - **GitHub CLI** (`gh auth login`), que gerencia a autenticação de forma
>   mais segura, sem guardar o token em texto puro;
> - Um **gerenciador de credenciais nativo do sistema** (ex: `git-credential-manager`).
>
> O caso real documentado aqui usa `store` porque foi a solução mais rápida
> disponível naquele momento de debug — não porque seja a prática recomendada
> para todo projeto novo. Vale revisitar essa escolha quando o treinamento
> chegar no módulo de Segurança.

### Por que vale entender isso, mesmo funcionando agora

Se um dia esse mesmo sintoma voltar a acontecer (push falhando sem nem
perguntar credencial), o checklist da tabela acima é reaproveitável quase
literalmente — é uma sequência de eliminação de hipóteses, da mais comum
(helper de sistema) até a mais rara (variável de ambiente interceptando o
prompt), sempre confirmando uma de cada vez antes de seguir pra próxima.

### O que você deveria ter aprendido (Missão 0.8)

- GitHub exige token (PAT) ou SSH para autenticação por linha de comando —
  senha comum não funciona mais.
- `git config --global <chave> <valor>` exige uma chave no formato
  `secao.chave` — erros de sintaxe do Git costumam vir com uma mensagem que
  já explica o que falta.
- **Nunca** cole tokens, senhas ou chaves de API em um chat, mesmo pedindo
  ajuda para debugar — se isso acontecer, revogue a credencial imediatamente
  e gere uma nova, tratando-a como comprometida.
- Quando uma autenticação falha sem nem chegar a pedir credencial, o
  problema geralmente está fora do arquivo de configuração normal do Git —
  vale checar, em ordem: helpers de sistema, arquivos de credencial
  antigos/`.netrc`, configs locais do repositório, e variáveis de ambiente
  (`SSH_ASKPASS`/`GIT_ASKPASS` são suspeitas comuns).
- `env -u NOME_DA_VARIAVEL comando` roda um comando removendo uma variável de
  ambiente só para aquela execução — útil para testar hipóteses sem alterar
  nada permanentemente no sistema.
- `credential.helper=store` funciona, mas guarda o token em texto puro —
  para projetos novos, SSH ou GitHub CLI são alternativas mais seguras.

---

## O que você deveria ter aprendido

- Instalar e verificar Node.js e Git no Fedora usando `dnf`.
- Os cinco comandos essenciais de Git e a diferença entre `commit` (local) e
  `push` (remoto).
- Quando usar o chat do Claude versus o Cursor, dependendo do tipo de tarefa.
- Criar, clonar e subir para um repositório do zero, sem depender do Claude
  para os comandos básicos.
- Autenticar via token (PAT) em vez de senha, e nunca expor essa credencial
  fora do prompt interativo da ferramenta que a pede.
- Diagnosticar uma falha de autenticação "muda" (sem prompt) eliminando
  hipóteses em ordem — de configs de Git até variáveis de ambiente.

**Próximo módulo**: Módulo 1 — Antes de programar, decida (quando vale a pena
pedir uma análise de trade-off antes de pedir implementação).
