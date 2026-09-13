export type TermoGlossario = {
  termo: string;
  origem: string;
  definicao: string;
};

// Cada termo é marcado com o módulo onde apareceu pela primeira vez —
// mesmo padrão de rastreabilidade usado no glossário do PyForge.
// Ordenação alfabética acontece na página, não aqui, pra facilitar
// adicionar novos termos sem se preocupar com a posição no arquivo.
export const GLOSSARIO: TermoGlossario[] = [
  {
    termo: "App Router",
    origem: "Módulo 6",
    definicao:
      "Sistema de rotas do Next.js baseado na estrutura de pastas dentro de app/ — cada pasta com um page.tsx vira uma URL.",
  },
  {
    termo: "Análise de trade-off",
    origem: "Módulo 1",
    definicao:
      "Pedir para o Claude comparar abordagens diferentes antes de pedir a implementação de uma delas, em vez de ir direto pra implementação.",
  },
  {
    termo: "basePath",
    origem: "Módulo 6",
    definicao:
      "Configuração que informa ao Next.js que o site não fica na raiz do domínio, mas dentro de uma subpasta (usuario.github.io/repositorio/) — necessário em todo GitHub Pages sem domínio próprio.",
  },
  {
    termo: "Branch",
    origem: "Módulo 0",
    definicao:
      "Uma linha paralela de desenvolvimento dentro do mesmo repositório Git.",
  },
  {
    termo: "Build",
    origem: "Módulo 3",
    definicao:
      "Processo que transforma o código-fonte em arquivos finais prontos (npm run build) — faz checagens mais rigorosas que o modo de desenvolvimento.",
  },
  {
    termo: "Bundle",
    origem: "Módulo 4",
    definicao:
      "Conjunto final de arquivos JavaScript que o navegador do usuário baixa para rodar o site.",
  },
  {
    termo: "Cheatsheet",
    origem: "Referência",
    definicao:
      "Página de consulta rápida com comandos prontos, organizados por ferramenta — sem explicação longa de conceito.",
  },
  {
    termo: "CI/CD",
    origem: "Módulo 6",
    definicao:
      "Integração Contínua / Entrega Contínua — automatizar testes e publicação de um projeto sempre que o código muda.",
  },
  {
    termo: "Commit",
    origem: "Módulo 0",
    definicao:
      "Uma 'fotografia' das mudanças no código num momento específico, com uma mensagem descrevendo o que mudou. Feito localmente.",
  },
  {
    termo: "Contexto",
    origem: "Módulo 4",
    definicao:
      "As informações disponíveis para o Claude numa conversa — mensagens anteriores, arquivos anexados, ou uma Base de Conhecimento configurada. Pode ficar desatualizado em relação ao repositório real.",
  },
  {
    termo: "credential.helper",
    origem: "Módulo 0",
    definicao:
      "Configuração do Git que decide como e onde ele guarda credenciais depois do primeiro login bem-sucedido, evitando pedir de novo a cada push.",
  },
  {
    termo: "dnf",
    origem: "Módulo 0",
    definicao:
      "Gerenciador de pacotes do Fedora — instala, atualiza e remove programas via linha de comando. Equivalente ao apt no Ubuntu/Debian.",
  },
  {
    termo: "Dev (modo desenvolvimento)",
    origem: "Módulo 3",
    definicao:
      "Modo usado durante o desenvolvimento local (npm run dev) — atualiza a página automaticamente a cada mudança, mas não faz todas as checagens do build de produção.",
  },
  {
    termo: "Export estático",
    origem: "Módulo 6",
    definicao:
      'Configuração do Next.js (output: "export") que gera o site inteiro como HTML/CSS/JS prontos, sem servidor — necessário para publicar no GitHub Pages.',
  },
  {
    termo: ".gitignore",
    origem: "Módulo 0",
    definicao:
      "Arquivo que lista pastas e arquivos que o Git deve ignorar — nunca incluir num commit, como node_modules/ ou pastas de build.",
  },
  {
    termo: "GitHub Actions",
    origem: "Módulo 6",
    definicao:
      "Serviço do GitHub que executa processos automatizados (workflows), rodando numa máquina virtual temporária a cada evento configurado, como um push.",
  },
  {
    termo: "GitHub Pages",
    origem: "Módulo 6",
    definicao:
      "Serviço gratuito do GitHub para hospedar sites estáticos diretamente a partir de um repositório.",
  },
  {
    termo: "JSX / TSX",
    origem: "Módulo 6",
    definicao:
      "Sintaxe que mistura HTML dentro de JavaScript/TypeScript, usada pelo React para descrever a interface.",
  },
  {
    termo: "Markdown",
    origem: "Módulo 0",
    definicao:
      "Forma simples de formatar texto usando símbolos (# para título, ** para negrito), sem precisar de HTML.",
  },
  {
    termo: "MDX",
    origem: "Módulo 6",
    definicao:
      "Markdown com a capacidade de incluir componentes React dentro do texto — usado no PyForge, mas não neste treinamento (o conteúdo é só texto/tabela/código).",
  },
  {
    termo: "next.config.mjs",
    origem: "Módulo 6",
    definicao:
      "Arquivo de configuração do Next.js — define coisas como export estático, basePath e otimização de imagens.",
  },
  {
    termo: "Next.js",
    origem: "Módulo 6",
    definicao:
      "Framework construído sobre o React, usado para criar sites e aplicações web — mesmo framework do PyForge e deste site.",
  },
  {
    termo: "Node.js",
    origem: "Módulo 0",
    definicao:
      "Motor que permite rodar código JavaScript fora do navegador, direto no computador — necessário para npm install e npm run dev existirem.",
  },
  {
    termo: ".nojekyll",
    origem: "Módulo 6",
    definicao:
      "Arquivo vazio que avisa o GitHub Pages para não processar o site com Jekyll, que ignoraria pastas começando com _ (como _next/).",
  },
  {
    termo: "npm",
    origem: "Módulo 0",
    definicao:
      "Node Package Manager — gerenciador de pacotes do mundo JavaScript/Node, instala bibliotecas e roda scripts do package.json.",
  },
  {
    termo: "package.json",
    origem: "Módulo 6",
    definicao:
      "Arquivo que descreve o projeto: nome, bibliotecas usadas (dependencies) e comandos disponíveis (scripts).",
  },
  {
    termo: "package-lock.json",
    origem: "Módulo 6",
    definicao:
      "Arquivo gerado automaticamente pelo npm install, que trava as versões exatas de cada biblioteca — garante instalações idênticas em qualquer máquina.",
  },
  {
    termo: "Personal Access Token (PAT)",
    origem: "Módulo 0",
    definicao:
      "Senha especial gerada no GitHub, usada para autenticar operações de linha de comando desde que senha comum parou de funcionar para isso.",
  },
  {
    termo: "Prompt",
    origem: "Módulo 0",
    definicao: "A mensagem/instrução enviada ao Claude, pedindo uma tarefa.",
  },
  {
    termo: "Push",
    origem: "Módulo 0",
    definicao:
      "Envia os commits locais para o repositório remoto — o único comando dos básicos de Git que realmente sobe algo pra internet.",
  },
  {
    termo: "React",
    origem: "Módulo 6",
    definicao:
      "Biblioteca do JavaScript para construir interfaces organizadas em componentes reutilizáveis. Next.js é construído em cima dela.",
  },
  {
    termo: "Remote",
    origem: "Módulo 0",
    definicao:
      "O 'endereço' de um repositório na nuvem ao qual o repositório local está conectado. Confira com git remote -v.",
  },
  {
    termo: "Repositório (repo)",
    origem: "Módulo 0",
    definicao:
      "Uma pasta de projeto controlada pelo Git — contém o código e todo o histórico de mudanças.",
  },
  {
    termo: "SSH_ASKPASS",
    origem: "Módulo 0",
    definicao:
      "Variável de ambiente que diz a ferramentas como o Git para pedir credenciais via uma janela gráfica separada, em vez do próprio terminal — pode causar falhas silenciosas de autenticação.",
  },
  {
    termo: "Terminal",
    origem: "Módulo 0",
    definicao:
      "Programa onde se digitam comandos de texto para o computador executar, em vez de clicar em ícones.",
  },
  {
    termo: "TypeScript",
    origem: "Módulo 6",
    definicao:
      "Versão do JavaScript com sistema de tipos — permite avisos de erro antes mesmo de rodar o código.",
  },
  {
    termo: "tsconfig.json",
    origem: "Módulo 6",
    definicao: "Arquivo de configuração que define como o TypeScript deve checar e compilar o código do projeto.",
  },
  {
    termo: "Vibe Coding",
    origem: "Módulo 0",
    definicao:
      "Desenvolver software delegando a maior parte da escrita de código para uma IA, guiando o processo através de prompts e revisão.",
  },
  {
    termo: "Workflow",
    origem: "Módulo 6",
    definicao:
      "Arquivo .yml dentro de .github/workflows/ que descreve os passos que o GitHub Actions deve executar.",
  },
];