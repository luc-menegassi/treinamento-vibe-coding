// GITHUB_PAGES=true é setado só pelo workflow de deploy (ver
// .github/workflows/deploy.yml) — localmente (`npm run dev`), o site
// continua rodando normal, sem basePath, sem exigir a variável.
const isGithubPages = process.env.GITHUB_PAGES === "true";

// Nome do repositório no GitHub. Só é usado se o Pages for publicado
// como "project page" (usuario.github.io/treinamento-vibe-coding).
const repoName = "treinamento-vibe-coding";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera HTML/CSS/JS estáticos em ./out no lugar de rodar um servidor —
  // é isso que o GitHub Pages consegue servir.
  output: "export",

  // Sem isso, rotas como /modulo/modulo-00-ambiente retornam 404 no
  // Pages (ele espera /modulo/modulo-00-ambiente/index.html).
  trailingSlash: true,

  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",

  // A otimização de imagem do Next exige servidor — sem servidor
  // (export estático), precisa ficar desativada.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
