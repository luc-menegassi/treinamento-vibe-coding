# Módulo 7 — Contexto e Exploração do Projeto

## 7.1 — Por que este módulo existe

Este é o primeiro módulo da Trilha 2 (Construir). Diferente dos Módulos 0-6,
ele não nasce de um caso real que já aconteceu — é conteúdo construído
deliberadamente, porque a metodologia em si vale a pena, mesmo sem um
incidente documentado por trás. Isso foi uma decisão consciente (ver o mapa
de conhecimento do treinamento): os módulos de Construir e Engenharia são
mais teóricos que os de Controlar, e tudo bem — o jeito de compensar isso é
praticar em **projetos reais que você já tem** (PyForge, curso de Linux, ou
até este próprio site), não em exercícios inventados do zero.

O princípio central deste módulo:

> Antes de pedir código, entenda o projeto.

Isso parece óbvio, mas na prática é fácil pular direto para "implementa
isso pra mim" — especialmente quando o Claude está sempre disposto a tentar,
mesmo sem entender o contexto completo. O risco: código gerado que ignora
convenções já existentes, duplica lógica que já existe em outro arquivo, ou
quebra uma relação entre componentes que não estava visível no pedido.

---

## 7.2 — O que pedir antes de qualquer implementação

Quando você (ou o Claude) ainda não conhece um projeto a fundo, vale pedir
uma exploração — sem nenhuma mudança de código — cobrindo:

- **Arquitetura**: como o projeto está organizado em alto nível (pastas,
  camadas, padrão de projeto se houver).
- **Arquivos relevantes**: quais arquivos provavelmente serão tocados por
  uma mudança futura, mesmo antes de saber qual mudança será.
- **Dependências**: quais bibliotecas externas o projeto usa, e pra quê.
- **Entry points**: por onde a aplicação "começa" (o arquivo que inicia tudo).
- **Convenções**: padrões de nomenclatura, organização, estilo já
  estabelecidos no projeto (ver Módulo 2 — isso é uma extensão direta
  daquela lição).
- **Relações entre componentes**: o que depende do quê.
- **Dúvidas**: pontos que o Claude não conseguiu inferir só lendo o código.
- **Riscos**: partes do projeto que parecem frágeis, mal documentadas, ou
  fáceis de quebrar sem perceber.

E o mais importante, explícito no próprio pedido:

> "Não altere nada ainda."

Essa frase existe para separar claramente duas fases que, sem ela, tendem a
se misturar: entender e agir.

---

## Missão — Explorando um projeto real sem tocar em nada

### Situação

Escolha um projeto real que você já tem (PyForge ou o curso de Linux são
boas opções, porque já existem há tempo e têm histórico de mudanças) e peça
ao Claude uma exploração completa, sem nenhuma implementação.

### Prompt ruim

> "Olha o projeto e me diz o que dá pra melhorar"

Isso já pula pra uma direção (melhorias) sem estabelecer entendimento
primeiro — o Claude pode responder com sugestões plausíveis, mas construídas
em cima de uma leitura superficial.

### Prompt bom

> "Antes de qualquer mudança, quero que você explore este projeto e me
> explique: a arquitetura geral, os arquivos mais relevantes, as principais
> dependências, o ponto de entrada da aplicação, convenções de nomenclatura
> que você percebeu, como os componentes se relacionam, qualquer dúvida que
> você tenha sobre decisões que não ficaram claras, e riscos que você
> percebe na estrutura atual. Não altere nada ainda — só quero entender o
> projeto com você antes de decidir o que fazer."

### O que fazer na prática

1. Escolha um projeto real (não precisa ser grande — até este próprio site
   do treinamento serve, se quiser praticar em algo pequeno primeiro).
2. Use o prompt acima, adaptando pro projeto escolhido.
3. Leia a resposta inteira antes de pedir qualquer implementação — mesmo que
   uma ideia de melhoria pule aos olhos.
4. Anote (mentalmente ou por escrito) o que você já sabia versus o que o
   Claude trouxe de novo. Isso calibra sua própria leitura do projeto.

### Checkpoint — tente sozinho primeiro

Antes de pedir a exploração ao Claude, tente responder por conta própria,
sobre o mesmo projeto: qual você acha que é o arquivo mais importante do
projeto, e por quê? Compare sua resposta com a exploração do Claude depois —
você notou algo que ele não mencionou, ou vice-versa?

### O que você deveria ter aprendido

- Separar a fase de "entender" da fase de "implementar" evita que o Claude
  construa em cima de um entendimento raso do projeto.
- Pedir explicitamente "não altere nada ainda" cria um espaço seguro pra
  explorar sem risco de mudança indesejada.
- Comparar sua própria leitura do projeto com a exploração do Claude é uma
  forma de calibrar sua compreensão — não só delegar completamente.

---

## 7.3 — Quando esse passo pode ser pulado

Nem toda tarefa exige uma exploração completa antes. Se você já pediu uma
exploração recente do mesmo projeto (e nada mudou desde então), ou se a
tarefa é pequena e isolada (corrigir um texto, ajustar uma cor), repetir a
exploração inteira seria desperdício de tempo — o critério é parecido com o
do Módulo 1 (quando vale pausar antes de agir): quanto maior e mais
desconhecido o projeto, mais vale explorar antes.

---

## O que você deveria ter aprendido (módulo completo)

- O princípio "entenda antes de pedir código" e as oito categorias de
  informação que valem ser pedidas numa exploração (arquitetura, arquivos,
  dependências, entry points, convenções, relações, dúvidas, riscos).
- Praticar esse princípio em um projeto real já existente, não só em teoria.
- Reconhecer quando a exploração completa é necessária versus quando pode
  ser dispensada.

**Próximo módulo**: Módulo 8 — Especificação (transformar um pedido vago em
uma especificação completa, antes de pedir implementação).
