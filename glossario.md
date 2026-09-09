# Glossário Técnico

Página de consulta — não é um módulo sequencial. Volte aqui sempre que
esquecer o que um termo significa. Os termos estão organizados por área, não
em ordem alfabética, porque faz mais sentido aprender em grupo (ex: os termos
de Git fazem mais sentido juntos que espalhados).

---

## Ambiente e sistema operacional

**Terminal**
Programa onde você digita comandos de texto para o computador executar, em
vez de clicar em ícones. É a ferramenta principal usada nos Módulos 0, 3 e 5.

**`dnf`**
Gerenciador de pacotes do Fedora — o programa que instala, atualiza e remove
outros programas via linha de comando (`sudo dnf install <nome>`). O
equivalente no Ubuntu/Debian é o `apt`.

**Node.js**
Um "motor" que permite rodar código JavaScript fora do navegador — direto no
seu computador, via terminal. É o que possibilita `npm install` e `npm run
dev` existirem. Sem o Node.js instalado, nenhum projeto React/Next.js roda
localmente.

**npm**
"Node Package Manager" — o gerenciador de pacotes do mundo JavaScript/Node.
Instala bibliotecas (como o `react-markdown` usado no site do treinamento) e
roda scripts definidos no `package.json`.

---

## Git e GitHub

**Git**
Um sistema de controle de versão — grava o histórico de mudanças de um
projeto ao longo do tempo, permitindo voltar a versões anteriores e
entender quem mudou o quê. Roda localmente no seu computador.

**GitHub**
Um serviço online que hospeda repositórios Git na nuvem, permitindo
compartilhar código, colaborar e publicar sites (via GitHub Pages).

**Repositório (repo)**
Uma pasta de projeto sendo controlada pelo Git — contém o código e todo o
histórico de mudanças (na pasta oculta `.git/`).

**Commit**
Uma "fotografia" das mudanças no código num momento específico, com uma
mensagem descrevendo o que mudou. Feito localmente com `git commit`.

**Push**
Envia os commits feitos localmente para o repositório remoto (GitHub). É o
único comando dos básicos que realmente sobe algo para a internet.

**Remote**
O "endereço" de um repositório na nuvem, ao qual seu repositório local está
conectado. Confira com `git remote -v`.

**Branch**
Uma linha paralela de desenvolvimento dentro do mesmo repositório. Este
treinamento, até agora, trabalha só na branch principal (`main`).

**Personal Access Token (PAT)**
Uma senha especial, gerada no GitHub, usada para autenticar operações de
linha de comando (`push`, `pull`, `clone`) desde que o GitHub parou de aceitar
senha comum para isso. Ver Módulo 0, seção 0.8, para o caso real de uso.

**`credential.helper`**
Configuração do Git que decide como e onde ele guarda suas credenciais
(usuário/token) depois do primeiro login bem-sucedido, para não pedir de novo
a cada `push`. O treinamento usa a opção `store`.

**`.gitignore`**
Um arquivo de texto que lista pastas e arquivos que o Git deve **ignorar** —
nunca incluir num commit. Essencial para não versionar coisas como
`node_modules/` (que pode ter milhares de arquivos baixados automaticamente)
ou pastas de build (`.next/`, `out/`).

---

## GitHub Actions e deploy

**CI/CD**
"Integração Contínua / Entrega Contínua" — a prática de automatizar testes e
publicação de um projeto sempre que o código muda, em vez de fazer isso
manualmente. O `deploy.yml` do treinamento é um exemplo de CD (entrega
contínua): a cada `push` na `main`, o site é publicado sozinho.

**GitHub Actions**
O serviço do GitHub que executa esses processos automatizados
(`.github/workflows/*.yml`), rodando numa máquina virtual temporária a cada
evento configurado (como um `push`).

**Workflow**
Um arquivo `.yml` dentro de `.github/workflows/` que descreve os passos que o
GitHub Actions deve executar (instalar dependências, buildar, publicar).

**GitHub Pages**
Serviço gratuito do GitHub para hospedar sites estáticos (HTML/CSS/JS puro)
diretamente a partir de um repositório.

**`.nojekyll`**
Um arquivo vazio que avisa ao GitHub Pages para não processar o site com
Jekyll (seu sistema padrão de geração de sites) — necessário porque o Jekyll
ignora, por padrão, pastas que começam com `_`, o que quebraria a pasta
`_next/` gerada pelo Next.js.

---

## Next.js e o site do treinamento

**Next.js**
Um framework construído sobre o React, usado para criar sites e aplicações
web. É o mesmo framework usado no PyForge e agora no site deste treinamento.

**React**
Uma biblioteca do JavaScript para construir interfaces (telas) organizadas
em "componentes" reutilizáveis. Next.js é construído em cima do React.

**TypeScript**
Uma versão do JavaScript com um sistema de tipos — permite que o editor (e o
processo de build) avisem sobre erros antes mesmo de rodar o código, como
"você está tentando usar um texto onde deveria ser um número". Arquivos
`.ts` e `.tsx` usam TypeScript.

**JSX / TSX**
Uma sintaxe que mistura HTML dentro de JavaScript (ou TypeScript), usada
pelo React para descrever a interface. Arquivos `.tsx` (como
`app/page.tsx`) usam essa sintaxe.

**App Router**
O sistema de rotas do Next.js baseado na estrutura de pastas dentro de
`app/` — cada pasta com um `page.tsx` vira uma URL. A pasta
`app/modulo/[slug]/` (com colchetes) cria uma **rota dinâmica**, capaz de
gerar uma página para cada módulo automaticamente.

**Markdown (`.md`)**
Uma forma simples de formatar texto usando símbolos (`#` para título, `**`
para negrito, etc.), sem precisar de HTML. É o formato usado para escrever o
conteúdo dos módulos deste treinamento.

**MDX**
Markdown "turbinado" com a capacidade de incluir componentes React dentro do
texto — usado no PyForge (para o `PyPlayground`, `Quiz`, etc.). Este
treinamento **não usa MDX**, porque o conteúdo dos módulos é só texto,
tabela e código — Markdown puro já é suficiente, sem precisar da
complexidade extra de misturar componentes React no meio do conteúdo.

**Build**
O processo que transforma o código-fonte do projeto em arquivos finais
prontos para rodar (ou, no caso de export estático, em HTML/CSS/JS puro).
Rodado com `npm run build`. Ver Módulo 3 para a diferença entre `build` e
`dev`.

**Dev (modo desenvolvimento)**
O modo usado durante o desenvolvimento local (`npm run dev`), que atualiza a
página automaticamente a cada mudança salva, mas **não faz todas as
checagens** que o `build` de produção faz.

**Export estático (`output: "export"`)**
Configuração do Next.js que gera o site inteiro como arquivos HTML/CSS/JS
prontos, sem precisar de um servidor rodando — é isso que permite publicar
no GitHub Pages, que só serve arquivos estáticos.

**`basePath`**
Configuração que informa ao Next.js que o site não vai ficar na raiz do
domínio (`seusite.com/`), mas dentro de uma subpasta
(`usuario.github.io/nome-do-repositorio/`) — necessário em todo projeto do
GitHub Pages que não usa domínio próprio.

**`package.json`**
Arquivo que descreve o projeto: seu nome, as bibliotecas que ele usa
(`dependencies`), e os comandos disponíveis (`scripts`, como `dev` e
`build`).

**`package-lock.json`**
Arquivo gerado automaticamente pelo `npm install`, que trava as versões
exatas de cada biblioteca instalada — garante que todo mundo que roda
`npm install` no mesmo projeto recebe exatamente as mesmas versões.

**`tsconfig.json`**
Arquivo de configuração do TypeScript — define como o código deve ser
checado e compilado.

**Bundle**
O conjunto final de arquivos JavaScript que o navegador do usuário baixa
para rodar o site. Ver Módulo 4, Missão 6, para o caso real de otimização de
tamanho de bundle.

---

## Vibe Coding e Claude

**Vibe Coding**
Desenvolver software delegando a maior parte da escrita de código para uma
IA (como o Claude), guiando o processo através de prompts e revisão, em vez
de escrever cada linha manualmente.

**Prompt**
A mensagem/instrução que você envia para o Claude, pedindo alguma tarefa.

**Contexto**
As informações disponíveis para o Claude numa conversa — pode incluir
arquivos anexados, mensagens anteriores, ou uma "Base de Conhecimento do
Projeto" configurada. Ver Módulo 4, Missão 5, para os riscos de confiar
demais no contexto sem checar o repositório real.

**Análise de trade-off**
Pedir para o Claude comparar abordagens diferentes (ex: frameworks, formas
de armazenar dados) antes de pedir a implementação de uma delas — tema
central do Módulo 1.
