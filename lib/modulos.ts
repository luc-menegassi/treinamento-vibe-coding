import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Modulo = {
  slug: string;
  titulo: string;
  content: string;
};

// Extrai o título a partir da primeira linha "# Título" do markdown,
// para não precisar duplicar o título em um lugar separado (front-matter).
function extrairTitulo(conteudo: string, slugFallback: string): string {
  const primeiraLinha = conteudo
    .split("\n")
    .find((linha) => linha.trim().startsWith("# "));
  if (!primeiraLinha) return slugFallback;
  return primeiraLinha.replace(/^#\s+/, "").trim();
}

// Lista todos os módulos, ordenados pelo nome do arquivo (por isso o
// prefixo "modulo-00-", "modulo-01-" etc. no nome de cada arquivo importa:
// é o que garante a ordem correta de exibição).
export function listarModulos(): Modulo[] {
  const arquivos = fs
    .readdirSync(CONTENT_DIR)
    .filter((nome) => nome.endsWith(".md"))
    .sort();

  return arquivos.map((nomeArquivo) => {
    const slug = nomeArquivo.replace(/\.md$/, "");
    const caminhoCompleto = path.join(CONTENT_DIR, nomeArquivo);
    const conteudo = fs.readFileSync(caminhoCompleto, "utf-8");
    return {
      slug,
      titulo: extrairTitulo(conteudo, slug),
      content: conteudo,
    };
  });
}

// Busca um único módulo pelo slug (nome do arquivo sem ".md") — usado
// pela página de rota dinâmica /modulo/[slug].
export function getModuloPorSlug(slug: string): Modulo | null {
  const caminhoCompleto = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(caminhoCompleto)) return null;

  const conteudo = fs.readFileSync(caminhoCompleto, "utf-8");
  return {
    slug,
    titulo: extrairTitulo(conteudo, slug),
    content: conteudo,
  };
}