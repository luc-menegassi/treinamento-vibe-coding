# Módulo 12 — Code Review com IA

## 12.1 — Por que este módulo existe

Este é o último módulo da Trilha 2 (Construir), e fecha o ciclo que começou
no Módulo 7:

> IA gera → humano verifica → IA revisa → humano decide.

Repare que a IA aparece duas vezes nesse ciclo — uma gerando, outra
revisando o que ela mesma (ou você) gerou. Usar o Claude para revisar código
(inclusive código que o próprio Claude escreveu) é uma prática legítima e
útil — só não substitui a verificação humana, que continua sendo quem
decide no final.

---

## 12.2 — O que pedir numa revisão de código

Uma revisão de código com IA vale mais quando é pedida com critérios
específicos, não como um "dá uma olhada geral":

- **Correção**: o código faz o que a especificação (Módulo 8) pedia?
- **Consistência**: segue as convenções já estabelecidas no projeto (Módulo
  2, Módulo 7)?
- **Riscos**: existe algo que pode quebrar em um caso não previsto (entrada
  vazia, valor inesperado, condição de corrida)?
- **Segurança**: alguma credencial, chave ou dado sensível ficou exposto no
  código (prévia do que o Módulo 13 vai aprofundar)?
- **Alucinação**: alguma biblioteca, função ou API usada no código
  realmente existe, com a assinatura (parâmetros, retorno) que o código
  assume?

Esse último ponto merece destaque próprio.

---

## 12.3 — Detectando alucinação em código gerado

"Alucinação" é quando a IA produz algo que parece plausível, mas não existe
de verdade — uma biblioteca inventada, uma função que não existe naquela
API, um parâmetro que nunca existiu. Isso é particularmente traiçoeiro em
código, porque muitas vezes **parece certo** até você tentar rodar.

**Sinais de alerta**:
- Um nome de biblioteca ou pacote que você nunca ouviu falar, sem
  verificação de que ele realmente existe naquele gerenciador de pacotes
  (npm, pip, etc.).
- Uma função de uma biblioteca conhecida, mas usada com parâmetros que
  parecem "razoáveis" sem você ter certeza de que aquela função aceita
  exatamente esses parâmetros.
- Um comportamento assumido de uma API externa que nunca foi confirmado —
  só inferido pelo nome da função.

**Como verificar, na prática**:
1. Rodar (Módulo 3, Módulo 11) — se a biblioteca não existir, o `npm
   install`/`pip install` já vai falhar imediatamente.
2. Pedir ao Claude para citar a documentação ou confirmar, via busca, que
   aquela função/parâmetro existe de verdade — em vez de aceitar a
   afirmação sem checagem.
3. Desconfiar mais de código que usa uma biblioteca **nova pra você**, já
   que é justamente aí que você tem menos base própria pra notar algo
   estranho.

Nenhum dos casos reais documentados neste treinamento (PyForge, curso de
Linux) foi uma alucinação clássica — os erros reais que você viveu foram
todos de configuração/descuido, não de invenção. Isso não significa que
alucinação não aconteça — só que você ainda não teve esse caso específico.
Vale ficar atento mesmo assim, especialmente ao usar uma biblioteca nova.

---

## Missão — Revisando o sistema de comentários

### Situação

Fechando o exemplo que atravessou os Módulos 8 a 11 (sistema de comentários
no PyForge, já especificado, planejado, implementado e testado), falta o
último passo: pedir uma revisão formal antes de considerar tudo encerrado.

### Prompt bom

> "Antes de finalizar, revisa o código do `Comentarios.tsx` com estes
> critérios: (1) ele atende exatamente à especificação que escrevemos? (2)
> segue as convenções de nomenclatura e estilo do resto do projeto? (3)
> existe algum caso não previsto que pode quebrar (por exemplo, texto muito
> longo, caracteres especiais)? (4) alguma biblioteca ou função usada aqui
> é nova pro projeto — e se for, você tem certeza de que ela existe e
> funciona como o código assume?"

### O que fazer na prática

1. Peça a revisão com critérios explícitos, não "dá uma olhada".
2. Preste atenção especial em qualquer biblioteca ou API que apareça pela
   primeira vez no projeto — é onde vale mais a pena confirmar que existe de
   verdade.
3. Leia a revisão você mesmo — não delegue a decisão final sobre o que
   fazer com os apontamentos, mesmo que a maioria faça sentido.

### Checkpoint — tente sozinho primeiro

Antes de pedir a revisão ao Claude, releia você mesmo o código gerado nas
etapas anteriores (mesmo sem saber a linguagem profundamente) e tente notar:
algo se repete de um jeito estranho? Algum nome de função parece familiar de
algum outro contexto, mas usado de um jeito diferente aqui?

### O que você deveria ter aprendido

- Code review com IA fecha o ciclo: gerar, verificar, revisar, decidir — a
  decisão final continua sendo sua.
- Uma revisão pedida com critérios específicos (correção, consistência,
  riscos, segurança, alucinação) rende mais do que um pedido genérico.
- Alucinação em código é detectável rodando de verdade, ou pedindo
  confirmação explícita de que uma biblioteca/função existe — não aceitando
  a afirmação por padrão.
- Bibliotecas novas pro projeto merecem atenção redobrada, justamente
  porque você tem menos base própria pra notar algo estranho nelas.

---

**Trilha 2 (Construir) concluída.** Módulos 7 a 12 cobrem o ciclo completo:
entender, decidir, planejar, implementar, testar, revisar.

**Próximo módulo**: Módulo 13 — Segurança, primeiro módulo da Trilha 3
(Engenharia).
