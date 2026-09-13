import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import bash from "highlight.js/lib/languages/bash";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import { getModuloPorSlug, listarModulos } from "@/lib/modulos";

// Necessário para o `output: "export"` funcionar — o Next precisa saber,
// em tempo de build, todas as combinações de [slug] que existem, já que
// não há servidor rodando depois de publicado para resolver isso dinamicamente.
export function generateStaticParams() {
  return listarModulos().map((modulo) => ({ slug: modulo.slug }));
}

// Só registramos as linguagens que o conteúdo dos módulos realmente usa,
// em vez de carregar o pacote "common" do highlight.js inteiro.
const highlightLanguages = {
  bash,
  sh: bash,
  shell: bash,
  yaml,
  yml: yaml,
  json,
  ts: typescript,
  tsx: typescript,
  js: typescript,
  jsx: typescript,
};

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modulo = getModuloPorSlug(slug);

  if (!modulo) {
    notFound();
  }

  return (
    <div>
      <Link href="/" className="modulo-voltar">
        ← todos os módulos
      </Link>
      <article className="markdown-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            [rehypeHighlight, { languages: highlightLanguages, ignoreMissing: true }],
          ]}
        >
          {modulo.content}
        </Markdown>
      </article>
    </div>
  );
}