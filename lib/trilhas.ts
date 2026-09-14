export type Trilha = {
  slug: string;
  nome: string;
  descricao: string;
  moduloMin: number;
  moduloMax: number;
};

// Faixas de número de módulo associadas a cada trilha do roadmap. As
// trilhas Construir e Engenharia ainda não têm arquivos em content/ — a
// faixa aqui reflete o roadmap planejado, não o que já foi escrito.
export const TRILHAS: Trilha[] = [
  {
    slug: "controlar",
    nome: "Controlar",
    descricao:
      "A IA pode ajudar, mas você precisa saber o que está acontecendo — ambiente, decisões antes de implementar, entregas, debug em camadas, confiança calibrada e diagnóstico de Git.",
    moduloMin: 0,
    moduloMax: 6,
  },
  {
    slug: "construir",
    nome: "Construir",
    descricao:
      "Entender o projeto, especificar antes de pedir código, planejar, implementar com IA sem perder o controle, testar com evidência e revisar em conjunto com a IA.",
    moduloMin: 7,
    moduloMax: 12,
  },
  {
    slug: "engenharia",
    nome: "Engenharia",
    descricao:
      "Segurança, Git como mecanismo de proteção, CI/CD e arquitetura — sustentar o que foi construído ao longo do tempo.",
    moduloMin: 13,
    moduloMax: 16,
  },
];