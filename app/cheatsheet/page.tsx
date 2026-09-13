import Link from "next/link";
import { CHEATSHEET } from "@/lib/cheatsheet";

export default function CheatsheetPage() {
  return (
    <div>
      <p className="referencia-eyebrow">Referência</p>
      <h1 className="referencia-titulo">Cheatsheet</h1>
      <p className="intro-lede">
        Comandos prontos, organizados por ferramenta — sem explicação longa de
        conceito (isso está no{" "}
        <Link href="/glossario/">Glossário</Link>). Cresce a cada módulo publicado.
      </p>

      {CHEATSHEET.map((bloco) => (
        <section key={bloco.categoria} className="cheat-categoria">
          <h2 className="cheat-categoria-titulo">{bloco.categoria}</h2>
          <ul className="cheat-lista">
            {bloco.itens.map((item) => (
              <li className="cheat-item" key={item.codigo}>
                <code className="cheat-codigo">{item.codigo}</code>
                <span className="cheat-desc">{item.descricao}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}