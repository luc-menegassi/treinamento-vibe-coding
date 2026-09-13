import { GLOSSARIO } from "@/lib/glossario";

export default function GlossarioPage() {
  const termosOrdenados = [...GLOSSARIO].sort((a, b) =>
    a.termo.localeCompare(b.termo, "pt-BR", { sensitivity: "base" })
  );

  return (
    <div>
      <p className="referencia-eyebrow">Referência</p>
      <h1 className="referencia-titulo">Glossário Técnico</h1>
      <p className="intro-lede">
        Consulta rápida de conceitos usados ao longo do treinamento. Cresce a
        cada módulo publicado — cada termo indica em qual módulo ele apareceu
        pela primeira vez.
      </p>

      <dl className="termo-lista">
        {termosOrdenados.map((item) => (
          <div className="termo-item" key={item.termo}>
            <dt className="termo-cabecalho">
              <span className="termo-nome">{item.termo}</span>
              <span className="termo-tag">{item.origem}</span>
            </dt>
            <dd className="termo-def">{item.definicao}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}