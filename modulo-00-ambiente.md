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

## O que você deveria ter aprendido

- Instalar e verificar Node.js e Git no Fedora usando `dnf`.
- Os cinco comandos essenciais de Git e a diferença entre `commit` (local) e
  `push` (remoto).
- Quando usar o chat do Claude versus o Cursor, dependendo do tipo de tarefa.
- Criar, clonar e subir para um repositório do zero, sem depender do Claude
  para os comandos básicos.

**Próximo módulo**: Módulo 1 — Antes de programar, decida (quando vale a pena
pedir uma análise de trade-off antes de pedir implementação).
