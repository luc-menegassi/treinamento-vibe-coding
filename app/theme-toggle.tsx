"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [tema, setTema] = useState<"light" | "dark">("light");

  // Lê o tema já aplicado na página (definido pelo script anti-flash no
  // layout) assim que o componente carrega no navegador.
  useEffect(() => {
    const atual = document.documentElement.getAttribute("data-theme");
    setTema(atual === "dark" ? "dark" : "light");
  }, []);

  function alternar() {
    const novo = tema === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    localStorage.setItem("theme", novo);
    setTema(novo);
  }

  return (
    <button
      onClick={alternar}
      className="theme-toggle"
      aria-label="Alternar tema claro/escuro"
    >
      {tema === "dark" ? "Modo claro" : "Modo escuro"}
    </button>
  );
}