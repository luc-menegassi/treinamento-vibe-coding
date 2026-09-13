# Mapa de Conhecimento — Treinamento de Vibe Coding

Baseado em: repositórios PyForge e Linux Avançado no Dia a Dia, 5 documentos de
correção, 1 documento de revisão de conteúdo, 2 conversas completas (PyForge
deploy + Linux deploy/revisão).

---

## A — O que os documentos já estabelecem (evidência real, pronta pra virar aula)

Coisas que já aconteceram, com prompt, resultado e (às vezes) erro documentado.

### A1. Decisão técnica com análise comparativa antes de agir
**Caso real**: antes de migrar o PyForge para GitHub Pages, você perguntou "analisa
o nível de trabalho de converter para MkDocs" e depois "tem solução melhor?" — o
Claude devolveu tabelas comparando Next.js export / Docusaurus / MkDocs por
esforço, antes de qualquer código ser escrito.
**Prática ensinável**: pedir análise de trade-off *antes* de pedir implementação,
especialmente em decisões caras de reverter (stack, arquitetura, migração).

### A2. Conteúdo indo para o arquivo errado
**Caso real**: ao copiar dois arquivos de um `.md` de entrega, o conteúdo do
`next.config.mjs` (JS) acabou colado dentro do `deploy.yml` (YAML), quebrando o
build sem erro de sintaxe óbvio à primeira vista.
**Prática ensinável**: conferir o *conteúdo* de um arquivo antes de commitar, não
só o caminho onde ele foi salvo.

### A3. Debug em camadas (um sintoma, várias causas empilhadas)
**Caso real**: "build falhando" no GitHub Pages teve 3 causas sequenciais — Source
errado nas configs → Source não persistiu → YAML corrompido (ver A2). Cada uma só
apareceu depois da anterior ser resolvida.
**Prática ensinável**: não assumir que resolveu depois de uma correção; confirmar
o resultado antes de seguir pro próximo suspeito.

### A4. `build` pega erros que `dev` não pega
**Caso real**: dois bugs (pasta duplicada dentro de `_Desenvolvimentos/` sendo
type-checada; `export const meta` do MDX sem declaração de tipo) só apareceram no
`next build` do CI — nunca em `next dev` local, porque o dev não faz checagem de
tipos completa.
**Prática ensinável**: rodar o build de produção localmente antes do primeiro
deploy, não confiar só no `dev`.

### A5. Otimização com métrica, não com impressão
**Caso real**: troca do Streamdown por `react-markdown` no curso de Linux, com
números antes/depois (JS total ~2,5MB → 786KB; bundle da home 355KB → ~130KB
gzip).
**Prática ensinável**: ao pedir uma otimização, pedir também a medição antes/depois
— não aceitar "deve ter melhorado" como resposta.

### A6. Drift entre a "memória" do Claude e o repositório real
**Caso real**: a Base de Conhecimento do Projeto (arquivo consolidado) ainda
mostrava a Aula 5/Módulo 1 com o playground pré-preenchido, mesmo depois de uma
correção anterior — a correção nunca tinha sido de fato commitada, só existia no
snapshot.
**Prática ensinável**: quando o Claude diz "isso já foi corrigido antes", conferir
o estado real do repositório, não confiar só na memória da conversa/projeto.

### A7. Erro que se repete por falta de checagem sistemática
**Caso real**: o mesmo bug (playground pré-preenchido) apareceu em mais 4 aulas
além da que motivou a primeira correção — o padrão "corrigir só onde reclamaram"
deixou passar instâncias idênticas em outros lugares.
**Prática ensinável**: ao corrigir um bug de padrão (não pontual), pedir uma
varredura no projeto inteiro, não só no arquivo que gerou a reclamação.

### A8. Bug sutil de distro/ambiente que "parece certo"
**Caso real**: revisão do curso de Linux achou comandos Debian/Ubuntu
(`adduser`, `/var/log/syslog`) num curso que ensina especificamente Fedora — código
plausível, mas que falha silenciosamente no ambiente real do aluno.
**Prática ensinável**: fixar o ambiente-alvo (distro, versão, OS) num lugar
central do projeto, e pedir revisão específica contra esse ambiente.

### A9. Conteúdo obsoleto sobrevivendo a uma expansão de escopo
**Caso real**: o Dia 20 do curso de Linux "encerrava" o curso com "parabéns, você
terminou" — resíduo de uma versão anterior de 20 dias, nunca atualizado quando o
curso virou 30 dias.
**Prática ensinável**: ao expandir um projeto, pedir explicitamente uma varredura
por referências a números/contagens/conclusões da versão antiga.

### A10. Confirmar o destino do Git antes de confiar no push
**Caso real**: "como sei que meu push vai pro repositório certo" — resolvido com
`git remote -v` e `git status` antes de subir, quando há mais de um projeto local.
**Prática ensinável**: hábito de checagem antes de `push` em ambientes com
múltiplos repositórios.

### A11. Entregas cirúrgicas com localização explícita
**Caso real**: praticamente todos os documentos de correção seguem o padrão
"aqui estão só os arquivos novos/alterados" + tabela "onde colocar cada um" — nunca
o snapshot completo pra mudanças pequenas.
**Prática ensinável**: pedir entregas incrementais, não o projeto inteiro
recolado, para reduzir risco de erro ao aplicar.

### A12. Separar infraestrutura de conteúdo, uma coisa de cada vez
**Caso real**: no curso de Linux, você fez explicitamente "resolve os bugs de
deploy primeiro, revisão de conteúdo depois" — evitando misturar as duas frentes
na mesma sessão.
**Prática ensinável**: sequenciar o trabalho por camada (infra → performance →
conteúdo), não tentar tudo de uma vez.

---

## B — Ideias presentes, mas que precisam ser desenvolvidas

Coisas que apareceram de forma indireta ou parcial, e que o treinamento precisa
transformar em conteúdo de verdade (ainda não são "aula pronta").

- **Ambiente Fedora + dnf**: você mencionou usar Fedora, mas nenhum documento
  ensina de fato os comandos equivalentes a apt/dnf, então isso precisa ser
  escrito do zero (não está nos documentos, só no seu contexto pessoal).
- **Cursor vs. chat do Claude**: você citou querer usar o Cursor, mas não há
  nenhum caso real documentado de uso dele — precisa ser criado como conteúdo
  novo, possivelmente ao vivo durante as primeiras "missões".
- **Como formular o prompt inicial de um projeto do zero**: os documentos mostram
  muito bem *correção* e *iteração*, mas não mostram o prompt que criou o PyForge
  ou o curso de Linux desde a primeira mensagem — não temos esse material ainda.
- **Convenção de nomenclatura e organização de pastas**: aparece implicitamente
  (`_Desenvolvimentos/`, `content/`, `lib/`) mas nunca é explicado como decisão —
  vale uma aula que generalize esse padrão.
- **Quando pedir "análise" vs. quando pedir "implementação" direto**: o caso A1 é
  ótimo, mas é um exemplo isolado — falta desenvolver o critério geral de quando
  vale a pena pausar pra comparar opções.
- **O papel do CHANGELOG/roadmap.md**: aparece mencionado como hábito ("sincronizar
  com o padrão que vocês já usam"), mas nunca vimos o conteúdo desses arquivos —
  vale decidir se o treinamento adota prática parecida desde o Módulo 0.
- **Referência consultável fora da sequência de módulos**: ao montar a estrutura
  do site do treinamento (Módulo 6), surgiu a necessidade de duas páginas que não
  são "módulo" no sentido sequencial, mas material de consulta permanente — um
  **Glossário técnico** (conceitos: o que é Node.js, CI/CD, `basePath`, etc.) e um
  **Cheatsheet** (comandos prontos, por ferramenta: Git, terminal/Fedora, npm,
  diagnóstico de autenticação). O PyForge já tem um Cheatsheet equivalente — aqui
  o conteúdo vem de tudo já registrado nos Módulos 0 a 5, mais o caso real de
  autenticação Git vivido durante a produção deste treinamento.

---

## C — Lacunas reais (não aparecem nos documentos, precisam ser criadas do zero)

Coisas que qualquer treinamento de vibe coding completo precisa ter, e que nosso
material real simplesmente não cobre ainda.

- **Segurança básica**: nenhum caso trata de secrets, variáveis de ambiente,
  chaves de API expostas em commit — tema crítico e ausente.
- **O que fazer quando a IA "alucina"**: nenhum dos casos reais é uma alucinação
  clássica (API inexistente, biblioteca inventada) — os erros documentados são
  todos de descuido/config, não de invenção. Vale simular um caso.
- **Testes automatizados**: mencionado como "melhoria futura" no README do curso
  de Linux, mas nunca implementado nos casos reais — não temos exemplo prático.
- **Trabalho em equipe / pull requests / branches**: todo o fluxo documentado é
  solo, direto na `main`. Se o treinamento quiser abordar colaboração, precisa
  criar esse conteúdo do zero.
- **Critério para "parar de pedir ajuda e resolver sozinho"**: é o cerne do seu
  objetivo original ("reduzir dependência do Claude"), mas nenhum caso real
  documenta você resolvendo algo sem IA — o treinamento precisa criar exercícios
  específicos pra isso, não só estudar casos passados.
- **Custos e limites de uso da IA** (quando vale usar um prompt gigante vs. vários
  pequenos): não aparece nos documentos.

---

## Tabela-síntese: caso real → missão

| # | Conceito/Prática | Caso real (fonte) | Vira que tipo de missão |
|---|---|---|---|
| 1 | Git remoto errado | "como sei que o push foi pro repo certo" | Diagnóstico com `git remote -v` antes de um push forçado |
| 2 | Conteúdo no arquivo errado | JS do config foi pro YAML do workflow | "Ache o arquivo errado" — dado um build quebrado, achar a causa |
| 3 | Drift de memória vs. repositório | Base de Conhecimento desatualizada | "A IA lembra de algo que você já mudou" — reconciliar os dois |
| 4 | Bug de ambiente/distro | Comandos Debian num curso Fedora | Missão de QA fixando o ambiente-alvo primeiro |
| 5 | Otimização sem prova | Streamdown → react-markdown | "Prove que melhorou" — exigir medição antes/depois |
| 6 | Conteúdo obsoleto pós-expansão | Dia 20 "encerra" curso de 30 dias | "Ache o resíduo" — revisão pós-expansão de escopo |
| 7 | Debug em camadas | 3 causas sequenciais no deploy do Pages | "Descasque a cebola" — resolver uma causa por vez, confirmando cada uma |
| 8 | Build vs. dev | Erros só aparecem no `next build` | "O erro que só aparece na hora de publicar" |
| 9 | Correção que não generaliza | Bug do playground repetido em 4 aulas | "Não é só ali" — pedir varredura, não fix pontual |
| 10 | Decisão antes de implementar | Comparação Next.js/Docusaurus/MkDocs | "Antes de programar, decida" — análise de trade-off obrigatória |

---

## Observação sobre a proposta do ChatGPT

O framework de 7 categorias dele (conceitos, metodologia, ferramentas,
conhecimentos, boas práticas, armadilhas, estrutura pedagógica) é útil como
**checklist de cobertura** — posso usá-lo pra conferir se, depois de estruturar
os módulos a partir da tabela acima, sobrou algum buraco grande. Mas a espinha
dorsal do treinamento continua sendo os casos reais (seção A), não as categorias
abstratas — é isso que torna esse curso diferente de qualquer curso genérico de
"como usar IA para programar".

---

## Próximo passo sugerido

Com esse mapa, dá pra montar a **Etapa 2 (Arquitetura do treinamento)**: agrupar
as 10 linhas da tabela-síntese em módulos progressivos, decidir a ordem, e só
então (Etapa 4) escrever o conteúdo de cada missão em detalhe.

---

## Atualização — Identidade metodológica e roadmap completo

Depois que os Módulos 0-5 estavam prontos e o Módulo 6 (construção do site do
treinamento) já em andamento, uma revisão externa do treinamento propôs uma
identidade metodológica e um roadmap estendido. As partes adotadas, decididas
em conversa:

### O Loop do Vibe Coding

Identidade conceitual do treinamento a partir de agora — aparece na
introdução/README, contextualizando por que os módulos seguem essa sequência.
Os Módulos 0-5 (Controlar) já ensinam partes desse ciclo implicitamente; os
módulos futuros (Construir e Engenharia) o tornam explícito:

```
ENTENDER → DECIDIR → PLANEJAR → IMPLEMENTAR → TESTAR → REVISAR → COMMIT → PUBLICAR → (volta pro ENTENDER)
```

### Template de missão — mantido sem alteração

Uma revisão externa sugeriu substituir o template atual por quatro perguntas
fixas (Antes/Prompt/Evidência/Recuperação) em cada missão. Decisão: **não
adotar** — o template atual (Situação → Prompt ruim → Prompt bom → Prática →
Checkpoint → Aprendizado) já funciona bem nos Módulos 0-5, e trocar de
estrutura sem evidência concreta de que melhora a missão contrariaria a
própria lição do Módulo 1 (decidir com critério, não por impressão). Mantido
para os módulos futuros também, por consistência.

### Correção pendente no Módulo 0

O caso real de autenticação (seção 0.8) usa `credential.helper store` como
parte da solução. Uma revisão externa apontou, corretamente, que isso deveria
ser apresentado como "foi assim que resolvemos naquele momento", não como
prática recomendada — e mencionar SSH/GitHub CLI/credential manager como
alternativas mais seguras para projetos novos. Correção pendente de aplicação
no arquivo do módulo.

### Roadmap completo renumerado

O Módulo 6 (construção do site do treinamento) já existia como projeto em
andamento quando essa revisão externa propôs uma numeração própria — por isso
o roadmap abaixo foi renumerado para não colidir:

| # | Módulo | Competência |
|---|---|---|
| 0-5 | Ambiente, decisão antes de implementar, entregas, debug em camadas, confiança calibrada, diagnóstico de Git | **Controlar** |
| 6 | Construção do site do treinamento (projeto prático) | Controlar → Construir |
| 7 | Contexto e exploração do projeto (entender antes de pedir código) | Construir |
| 8 | Especificação (prompt ≠ especificação) | Construir |
| 9 | Planejamento (arquivos afetados, riscos, ordem, antes do "implemente") | Construir |
| 10 | Implementação com IA (conduzir sem perder o controle) | Construir |
| 11 | Testes e validação ("a IA dizer que funciona não é evidência") | Construir |
| 12 | Code Review com IA (IA gera → humano verifica → IA revisa → humano decide) | Construir |
| 13 | Segurança | Engenharia |
| 14 | Git como mecanismo de segurança | Engenharia |
| 15 | CI/CD e Deploy | Engenharia |
| 16 | Arquitetura e manutenção | Engenharia |

**Fora do escopo por completo** (não "deprioritizado", removido do roadmap):
Agentes, Contexto persistente/AGENTS.md, MCP, multi-agente, automação
avançada. Não é o objetivo declarado do treinamento ("otimizar o uso do
Claude", com redução de dependência como pano de fundo) — pode ser
reconsiderado no futuro apenas se um caso real justificar.

**Decisão sobre ancoragem em casos reais (Módulos 7-16)**: diferente dos
Módulos 0-5 (100% extraídos de casos reais do PyForge/curso de Linux), os
módulos de Construir e Engenharia serão conteúdo metodológico não
necessariamente ancorado em um caso real pré-existente — decisão consciente
("Opção B"), já que não há casos reais equivalentes disponíveis para toda essa
metodologia. Onde possível, o próprio desenvolvimento do site do treinamento
(Módulo 6 em diante) deve alimentar exemplos reais para esses módulos.

**Fora do escopo por enquanto**: Contexto persistente/AGENTS.md, MCP,
multi-agente, automação avançada — não descartados, só não priorizados; podem
voltar ao roadmap se um caso real justificar.
