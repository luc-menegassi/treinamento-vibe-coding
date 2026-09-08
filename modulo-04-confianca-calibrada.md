# Módulo 4 — Confiança Calibrada

## 4.1 — Por que este módulo existe

O Claude é útil precisamente porque você pode confiar nele na maior parte do
tempo. Mas existem situações específicas e recorrentes em que essa confiança
precisa ser **calibrada** — não porque o Claude "mentiu", mas porque ele
trabalha com informação que pode estar desatualizada, incompleta, ou porque
uma correção pontual não cobre todos os lugares onde o mesmo problema existe.

Este módulo reúne quatro situações reais assim, cada uma com um sinal de
alerta específico para você reconhecer.

---

## Missão 5 — "A IA lembra de algo que você já mudou (ou que nunca mudou de verdade)"

### Situação

Você pede ao Claude para corrigir um bug. Ele responde "isso já foi
corrigido antes" — mas o bug ainda está lá, ao vivo, no site publicado.

### O caso real

A "Base de Conhecimento do Projeto" (um arquivo `.md` consolidado, usado
como contexto persistente entre conversas sobre o PyForge) ainda mostrava a
Aula 5 do Módulo 1 com o exercício de playground pré-preenchido — mesmo
depois de uma sessão anterior ter, aparentemente, corrigido isso.

A causa real: a correção **nunca tinha sido de fato commitada** no
repositório. O snapshot da Base de Conhecimento estava certo o tempo todo; o
que faltou foi aplicar a mudança de verdade no GitHub.

### Por que isso acontece

Ferramentas de contexto persistente (bases de conhecimento, resumos de
projeto, memória entre conversas) são **fotografias de um momento** — não uma
conexão ao vivo com o seu repositório real. Se uma correção prometida nunca
foi de fato aplicada e commitada, o contexto persistente pode continuar
"lembrando" de um estado que nunca existiu de verdade fora da conversa.

### Sinal de alerta

Sempre que o Claude disser "isso já foi corrigido antes" ou "isso já existe
no projeto" e você não tiver certeza absoluta de que aplicou aquela mudança
— **é hora de conferir o repositório real**, não de confiar na memória da
conversa.

### Prompt bom

> "Você disse que isso já foi corrigido antes, mas estou vendo o bug ao vivo
> no site publicado. Pode ser que a correção nunca tenha sido commitada de
> verdade? Vou conferir o arquivo real no GitHub e te aviso."

### O que fazer na prática

1. Quando o Claude referenciar um estado passado do projeto ("isso já
   existe", "já corrigimos isso"), trate como uma hipótese, não um fato.
2. Confira o arquivo real (no GitHub, ou no site publicado) antes de aceitar
   a afirmação.
3. Se a memória/contexto estava certo e o repositório é que está
   desatualizado, você já sabe a causa: a correção anterior não foi
   commitada — vá direto pra aplicar de verdade dessa vez.

### Checkpoint — tente sozinho primeiro

Da próxima vez que o Claude mencionar algo que "já existe" no seu projeto,
antes de perguntar de volta, vá até o arquivo real e confira com seus
próprios olhos. Só volte pro chat se a dúvida persistir.

---

## Missão 6 — "Prove que melhorou"

### Situação

Você pede uma otimização de performance. O Claude aplica a mudança e diz que
"deve ter melhorado bastante". Você aceita isso como resposta final?

### O caso real

A troca da biblioteca de markdown (Streamdown → react-markdown) no curso de
Linux veio acompanhada de números concretos, antes e depois:

| | Antes (Streamdown) | Depois (react-markdown) |
|---|---|---|
| JS total no build | ~2,5MB+ | 786KB |
| Carregado ao abrir a Home | 355KB gzip | ~130KB gzip |
| Dist total no disco | vários MB | 908KB |

Esses números vieram de rodar o build de produção duas vezes (antes e depois
da troca) e comparar o tamanho real dos arquivos gerados — não de uma
estimativa ou de uma impressão geral.

### Sinal de alerta

Qualquer resposta do tipo "isso deve ter melhorado", "ficou mais rápido",
"reduzi o tamanho" **sem um número antes/depois** é uma afirmação não
verificada. Pode estar certa, mas você não tem como saber quanto, nem se a
mudança valeu o esforço.

### Prompt ruim

> "Otimiza o carregamento da página"

(implicitamente aceita qualquer resultado, sem pedir medição)

### Prompt bom

> "Otimiza o carregamento da página, e me mostra o tamanho do bundle antes e
> depois da mudança, pra eu confirmar que realmente melhorou."

### O que fazer na prática

1. Ao pedir qualquer otimização (performance, tamanho de bundle, tempo de
   carregamento), peça explicitamente uma métrica de "antes" e "depois".
2. Se o Claude não tiver como medir automaticamente, peça o comando que você
   mesmo pode rodar para conferir (ex: rodar o build e olhar o tamanho dos
   arquivos gerados).
3. Só considere a tarefa concluída quando tiver o número, não a impressão.

### Checkpoint — tente sozinho primeiro

Se você já aplicou alguma otimização no passado sem medir, tente rodar você
mesmo o build de produção agora e ver os tamanhos gerados. Você consegue
interpretar os números sem perguntar ao Claude o que significam?

---

## Missão 7 — "Ache o resíduo"

### Situação

Você expandiu um projeto — o curso de Linux cresceu de 20 para 30 dias. Tudo
parece funcionar. Mas existe conteúdo antigo, escrito para a versão anterior,
que ninguém pediu explicitamente para revisar.

### O caso real

O Dia 20 do curso de Linux terminava com "parabéns, você concluiu o curso" —
resíduo de quando o curso tinha só 20 dias. Ninguém reparou porque o curso
"continuava funcionando" tecnicamente: o Dia 21 existia, o conteúdo estava
lá, só a mensagem de encerramento é que estava no lugar errado. A prova de
que era resíduo, e não intencional: o próprio Dia 30 já tratava o Dia 20 como
uma aula normal de "Performance Tuning" na tabela de competências —
inconsistência interna que só apareceu numa revisão dedicada.

### Sinal de alerta

Sempre que um projeto passa por uma **expansão de escopo** (mais dias, mais
módulos, mais páginas, mais funcionalidades), existe risco de sobra da
versão anterior — números, contagens, mensagens de conclusão, textos que
faziam sentido no tamanho antigo e ficaram esquecidos.

### Prompt bom

> "Acabei de expandir esse projeto de [tamanho antigo] para [tamanho novo].
> Faz uma varredura procurando especificamente por referências ao tamanho
> antigo — números, contagens, mensagens de conclusão que possam ter sobrado
> da versão anterior."

Note que esse prompt é mais específico que "revisa o projeto" — ele direciona
a busca para o tipo exato de resíduo que costuma sobrar em expansões.

### O que fazer na prática

1. Toda vez que um projeto crescer em escopo, trate isso como gatilho para
   uma varredura dedicada — não assuma que só o conteúdo novo precisa de
   atenção.
2. Peça a varredura citando explicitamente os números antigo e novo (20→30,
   por exemplo), não só "revisa tudo".
3. Preste atenção em conclusões, resumos, e contagens — são os lugares mais
   comuns de sobra.

### Checkpoint — tente sozinho primeiro

Se você tem algum projeto que já cresceu de tamanho, procure por conta
própria por menções ao tamanho antigo (buscando o número antigo como texto,
por exemplo) antes de pedir ao Claude para fazer essa varredura.

---

## Missão 8 — "Não é só ali"

### Situação

Você reporta um bug específico numa aula. O Claude corrige aquela aula. Você
segue em frente — mas será que o mesmo bug não está escondido em outros
lugares que ninguém checou?

### O caso real

O bug era: o exercício de "testando na prática" vinha com o código de exemplo
já completo, em vez de um espaço vazio pro aluno praticar. Você reportou isso
numa aula específica (Módulo 3, Aula 1). Ao corrigir, o Claude fez uma
varredura no projeto inteiro e achou o mesmo padrão em **mais 3 lugares**
(Módulo 2 Aula 4, Módulo 3 Aulas 2 e 3) — nenhum dos quais tinha sido
reportado.

Pior: uma correção **anterior** de um bug idêntico (Aula 5 do Módulo 1) tinha
sido registrada como feita na memória do projeto, mas nunca foi de fato
commitada — só foi descoberta porque essa nova varredura desconfiou de tudo,
inclusive do que já achava estar resolvido (ver também Missão 5).

### Sinal de alerta

Quando um bug reportado tem características de **padrão** (não é um erro
isolado de digitação, mas um tipo de decisão que se repete: "esqueceram de
esvaziar o código inicial", "esqueceram de atualizar uma referência"), a
correção pontual só resolve o sintoma que você viu — não a causa.

### Prompt ruim

> "Corrige esse bug na Aula 1 do Módulo 3"

(implicitamente aceita que só aquele lugar tem o problema)

### Prompt bom

> "Corrige esse bug na Aula 1 do Módulo 3, e depois faz uma varredura no
> projeto inteiro procurando o mesmo padrão em outros lugares — isso parece
> ser um erro de padrão, não pontual."

### O que fazer na prática

1. Antes de aceitar uma correção como "concluída", pergunte-se: esse tipo de
   erro é uma decisão que pode ter sido repetida em outros lugares
   parecidos?
2. Se sim, peça explicitamente a varredura, citando o padrão exato a
   procurar.
3. Depois de aplicar correções em lote, confira pelo menos uma amostra
   manualmente — não assuma que "a varredura encontrou tudo" sem checar.

### Checkpoint — tente sozinho primeiro

Da próxima vez que corrigir um bug, antes de considerar terminado, pense por
conta própria: "esse mesmo tipo de erro pode estar em outro lugar do
projeto?" Só depois peça a varredura ao Claude.

---

## O que você deveria ter aprendido (módulo completo)

- **Drift de memória**: quando o Claude referencia um estado passado do
  projeto, confira o repositório real antes de aceitar como fato.
- **Otimização sem prova**: exija números de "antes/depois" para qualquer
  alegação de melhoria de performance.
- **Resíduo pós-expansão**: toda expansão de escopo é um gatilho para
  varredura dedicada por sobras da versão anterior.
- **Correção que não generaliza**: bugs de padrão (não pontuais) merecem
  varredura no projeto inteiro, não só correção onde foram reportados.

Essas quatro situações têm um fio condutor comum: **a resposta do Claude é
tão boa quanto a pergunta que ele recebeu, e tão confiável quanto o que você
confirma por fora da conversa.**

**Próximo módulo**: Módulo 5 — Diagnóstico Avançado de Git (confirmar o
destino de um push antes de confiar nele, quando você trabalha com mais de
um repositório).
