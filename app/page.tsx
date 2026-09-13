import Link from "next/link";
import { listarModulos } from "@/lib/modulos";

export default function HomePage() {
  const modulos = listarModulos();

  return (
    <div>
      <p className="intro-lede">
        Um treinamento prático de como desenvolver software com o Claude como
        assistente principal — ancorado em casos reais, não em teoria
        abstrata.
      </p>

      <ul className="modulos-lista">
        {modulos.map((modulo) => {
          const numero = modulo.slug.match(/modulo-(\d+)/)?.[1] ?? "";
          return (
            <li key={modulo.slug}>
              <Link href={`/modulo/${modulo.slug}`} className="modulo-link">
                <span className="modulo-numero">{numero}</span>
                <span className="modulo-titulo">{modulo.titulo}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}