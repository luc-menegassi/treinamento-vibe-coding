export type ItemCheatsheet = {
  codigo: string;
  descricao: string;
};

export type CategoriaCheatsheet = {
  categoria: string;
  itens: ItemCheatsheet[];
};

export const CHEATSHEET: CategoriaCheatsheet[] = [
  {
    categoria: "Terminal / Fedora",
    itens: [
      { codigo: "pwd", descricao: "Mostra em qual pasta você está." },
      { codigo: "ls -la", descricao: "Lista arquivos, incluindo ocultos, com detalhes." },
      { codigo: "cd nome-pasta", descricao: "Entra numa pasta." },
      { codigo: "mkdir nome", descricao: "Cria uma pasta." },
      { codigo: "sudo dnf install <pacote>", descricao: "Instala um pacote no Fedora." },
      { codigo: "dnf search <termo>", descricao: "Busca um pacote." },
    ],
  },
  {
    categoria: "Git — básico",
    itens: [
      { codigo: "git init", descricao: "Transforma a pasta atual num repositório Git." },
      { codigo: "git status", descricao: "Mostra o que mudou desde o último commit." },
      { codigo: "git add .", descricao: "Marca todos os arquivos modificados para o próximo commit." },
      { codigo: 'git commit -m "mensagem"', descricao: "Grava as mudanças marcadas, localmente." },
      { codigo: "git push", descricao: "Envia os commits locais para o repositório remoto." },
      { codigo: "git clone <url>", descricao: "Clona um repositório existente do GitHub." },
    ],
  },
  {
    categoria: "Git — diagnóstico",
    itens: [
      { codigo: "git remote -v", descricao: "Mostra para qual repositório a pasta atual aponta." },
      {
        codigo: "git log origin/main..HEAD --oneline",
        descricao: "Lista commits locais ainda não enviados.",
      },
      {
        codigo: "git config --list --show-origin | grep credential",
        descricao: "Mostra todas as configs de credencial, com o arquivo de origem de cada uma.",
      },
    ],
  },
  {
    categoria: "Git — autenticação",
    itens: [
      {
        codigo: "git config --global credential.helper store",
        descricao: "Guarda a credencial após o próximo login bem-sucedido (ver ressalva de segurança no Módulo 0).",
      },
      {
        codigo: "env | grep -i -E 'git|github|askpass'",
        descricao: "Lista variáveis de ambiente que podem interceptar a autenticação.",
      },
      {
        codigo: "env -u SSH_ASKPASS git push",
        descricao: "Roda o push sem essa variável — útil quando a autenticação falha sem pedir senha.",
      },
    ],
  },
  {
    categoria: "npm / Node.js",
    itens: [
      { codigo: "node --version", descricao: "Confirma que o Node.js está instalado." },
      { codigo: "npm install", descricao: "Instala as dependências listadas no package.json." },
      { codigo: "npm run dev", descricao: "Roda o projeto em modo desenvolvimento (localhost:3000)." },
      { codigo: "npm run build", descricao: "Gera o build de produção — sempre testar antes do deploy." },
    ],
  },
  {
    categoria: "Next.js / GitHub Pages",
    itens: [
      {
        codigo: "GITHUB_PAGES=true npm run build",
        descricao: "Simula o build exatamente como o GitHub Actions vai rodar.",
      },
    ],
  },
];