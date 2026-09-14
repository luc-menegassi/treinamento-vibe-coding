import Link from "next/link";
import { listarModulos } from "@/lib/modulos";
import { TRILHAS } from "@/lib/trilhas";

export default function HomePage() {
  const modulos = listarModulos();

  return (
    <div>
      <p className="intro-lede">
        Um treinamento prático de como desenvolver software com o Claude como
        assistente principal — ancorado em casos reais, não em teoria
        abstrata.
      </p>

      {TRILHAS.map((trilha) => {
        const modulosDaTrilha = modulos.filter((modulo) => {
          const numero = Number(modulo.slug.match(/modulo-(\d+)/)?.[1]);
          return numero >= trilha.moduloMin && numero <= trilha.moduloMax;
        });

        const temConteudo = modulosDaTrilha.length > 0;

        return (
          <section key={trilha.slug} className="trilha-secao">
            <div className="trilha-cabecalho">
              <h2 className="trilha-nome">{trilha.nome}</h2>
              {!temConteudo && (
                <span className="trilha-em-breve">em breve</span>
              )}
            </div>
            <p className="trilha-descricao">{trilha.descricao}</p>

            {temConteudo && (
              <ul className="modulos-lista">
                {modulosDaTrilha.map((modulo) => {
                  const numero = modulo.slug.match(/modulo-(\d+)/)?.[1] ?? "";
                  return (
                    <li key={modulo.slug}>
                      <Link
                        href={`/modulo/${modulo.slug}`}
                        className="modulo-link"
                      >
                        <span className="modulo-numero">{numero}</span>
                        <span className="modulo-titulo">{modulo.titulo}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}