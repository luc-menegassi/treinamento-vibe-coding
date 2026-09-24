# Módulo 16 — Arquitetura e Manutenção

## 16.1 — Por que este módulo existe

Último módulo do roadmap. Todos os anteriores tratam de **construir** —
uma funcionalidade, um módulo, um deploy. Este trata de algo diferente:
**sustentar** o que já foi construído, à medida que o projeto cresce e o
tempo passa.

Isso não é teórico pra você — o próprio site deste treinamento já é um
exemplo vivo. `lib/modulos.ts`, `lib/glossario.ts` e `lib/cheatsheet.ts`
seguem o mesmo padrão de arquivo (ler dados, expor uma função de listagem)
porque isso foi uma escolha consistente, não acidental. E `lib/trilhas.ts`
já foi desenhado sabendo que Construir e Engenharia ainda não tinham
conteúdo — uma decisão de arquitetura pensando no crescimento futuro, feita
antes desse crescimento acontecer de verdade.

---

## 16.2 — Sinais de que a arquitetura precisa de atenção

- **Duplicação que se repete**: se você perceber que está copiando a mesma
  lógica em três lugares diferentes, é sinal de extrair isso pra um lugar
  só — mas só quando o padrão já apareceu de verdade (duas vezes é
  coincidência, três é padrão), não preventivamente.
- **Estrutura que não cabe mais**: quando `lib/trilhas.ts` precisar de uma
  quarta trilha, ou quando o roadmap crescer além do 16, a estrutura atual
  (faixas fixas de número) pode precisar de ajuste — não é urgente agora,
  mas vale ter em mente.
- **Convenção que parou de ser seguida**: se um módulo novo não seguir o
  padrão dos anteriores (por exemplo, esquecer o `# Título` na primeira
  linha, que o `lib/modulos.ts` depende pra extrair o nome), isso quebra
  silenciosamente — sem erro óbvio, só um comportamento levemente errado.

O critério pra decidir se vale mexer é o mesmo do Módulo 1 (análise antes de
agir) e do Módulo 2 (não tocar no que já funciona sem necessidade): mudar
arquitetura tem custo, então só vale quando o problema já apareceu de
verdade, não como prevenção especulativa.

---

## 16.3 — Checagem de consistência como hábito, não evento único

O PyForge já tinha isso como prática documentada: depois de qualquer
correção, "rodar a checagem de consistência de sempre" — conferir que todo
arquivo `.mdx` tem `meta`, que não há duplicatas entre Glossário e
Cheatsheet. Isso nunca foi formalizado pra este treinamento — é hora de
fazer isso, fechando o roadmap com um artefato realmente útil.

---

## Missão — Criando o checklist de manutenção do próprio treinamento

### Situação

Consolidar, num único lugar, as checagens que já apareceram espalhadas pelos
módulos anteriores — pra não depender de lembrar cada uma de cabeça toda vez.

### Prompt bom

> "Quero criar um checklist de manutenção pra este projeto, consolidando as
> checagens que já aprendemos ao longo do treinamento: conteúdo no arquivo
> certo (Módulo 2), build de produção antes de commitar (Módulo 3), links
> internos usando `Link` e não `<a>` (Módulo 6), consistência entre
> Glossário e Cheatsheet, e qualquer outra que você identifique olhando o
> projeto atual. Não precisa ser código — pode ser um documento de
> referência."

### O checklist resultante (aplicável a partir de agora)

- [ ] Todo novo módulo `.md` começa com `# Título` na primeira linha (senão
  o `lib/modulos.ts` não extrai o nome corretamente).
- [ ] `npm run build` (ou `GITHUB_PAGES=true npm run build`) rodado e
  aprovado antes de qualquer `git push`.
- [ ] Nenhum link interno novo usa `<a href="/...">` — sempre `Link` do
  `next/link`.
- [ ] Se um termo novo do Glossário faz sentido também virar um comando no
  Cheatsheet (ou vice-versa), verificar se já não existe duplicado.
- [ ] Se um módulo novo alterar a faixa de numeração de uma trilha,
  `lib/trilhas.ts` foi atualizado.
- [ ] Nenhuma credencial, token ou chave aparece em nenhum arquivo antes do
  commit (Módulo 13).

### O que fazer na prática

1. Guarde esse checklist como um arquivo de referência no próprio
   repositório (por exemplo, um `MANUTENCAO.md` na raiz, ou como mais uma
   página do site, seguindo o padrão do Glossário/Cheatsheet).
2. Revise e amplie esse checklist conforme novos casos reais aparecerem —
   ele não é definitivo, é um documento vivo.

### Checkpoint — tente sozinho primeiro

Antes de eu confirmar o checklist acima, tente adicionar pelo menos um item
que eu não incluí — algo que você, olhando pra trás nesse treinamento
inteiro, lembra que já causou um problema real e merece virar checagem
permanente.

### O que você deveria ter aprendido

- Arquitetura não é uma decisão única no início — é revisada conforme sinais
  reais aparecem (duplicação repetida, estrutura que não cabe mais,
  convenção quebrada).
- O custo de mudar arquitetura significa que vale agir só quando o problema
  já é real, não preventivamente.
- Um checklist de manutenção consolidado é mais confiável que lembrar de
  cada regra espalhada pelos módulos, de cabeça.

---

## Fechando o roadmap

Com este módulo, os 17 módulos planejados (0 a 16) estão completos — as três
trilhas (Controlar, Construir, Engenharia) cobrindo o Loop do Vibe Coding
inteiro: Entender → Decidir → Planejar → Implementar → Testar → Revisar →
Commit → Publicar, e de volta pro Entender.

Vale lembrar o que ficou deliberadamente fora (Agentes, MCP, automação
avançada) — não por serem menos importantes, mas porque não bateram com o
objetivo original deste treinamento (otimizar o uso do Claude, com redução
de dependência como pano de fundo). Se um caso real algum dia justificar,
esse roadmap pode crescer de novo — mas o objetivo atual está cumprido sem
eles.

O treinamento continua sendo um documento vivo: cada novo caso real seu
(neste site, no PyForge, no curso de Linux, ou em qualquer projeto futuro)
é candidato a virar uma nova missão, em qualquer um dos módulos existentes.
