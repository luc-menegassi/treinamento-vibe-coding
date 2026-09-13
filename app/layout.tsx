import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treinamento de Vibe Coding",
  description:
    "Treinamento prático de como desenvolver software usando Claude como assistente principal, ancorado em casos reais.",
};

// Roda antes da página desenhar na tela, aplicando o tema salvo no
// localStorage. Sem isso, o site sempre abriria no tema claro por uma
// fração de segundo antes de trocar para o escuro, caso essa fosse a
// preferência salva.
const themeScript = `
(function () {
  try {
    var salvo = localStorage.getItem("theme");
    var tema = salvo === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", tema);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="site-title">
              Vibe Coding
            </Link>
            <nav className="site-nav">
              <Link href="/">Módulos</Link>
              <Link href="/cheatsheet/">Cheatsheet</Link>
              <Link href="/glossario/">Glossário</Link>
              <ThemeToggle />
            </nav>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <a
              href="https://github.com/luc-menegassi/treinamento-vibe-coding"
              target="_blank"
              rel="noreferrer"
            >
              Ver repositório no GitHub
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}