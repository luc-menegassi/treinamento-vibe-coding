# Módulo 8 — Especificação

## 8.1 — Por que este módulo existe

Continuação direta do Módulo 7: depois de entender o projeto, o próximo
passo não é "pedir a implementação" — é **especificar** o que você quer, de
um jeito completo o suficiente pra o Claude não precisar adivinhar as partes
que você não disse.

O princípio central:

> Prompt ≠ especificação.

Um prompt curto ("quero um cadastro de clientes") é uma **intenção**, não
uma especificação. Ele deixa dezenas de decisões implícitas — que tipo de
dado cada cliente tem, o que acontece se um campo obrigatório ficar vazio,
se pode haver dois clientes com o mesmo nome, quem pode ver/editar/excluir.
Quando essas decisões não são explicitadas, o Claude tem que escolher por
conta própria — e a escolha dele pode não ser a que você tinha em mente.

---

## 8.2 — As nove perguntas de uma especificação

Transformar uma intenção em especificação significa responder, mesmo que
brevemente, a estas perguntas antes de pedir implementação:

1. **Objetivo**: o que essa funcionalidade resolve, de verdade? Qual problema
   ela existe pra resolver?
2. **Usuários**: quem vai usar isso? Existe mais de um tipo de usuário com
   permissões diferentes?
3. **Fluxo**: qual é o caminho, passo a passo, que um usuário percorre?
4. **Regras**: quais restrições de negócio existem? (ex: "um cliente não
   pode ter dois cadastros com o mesmo e-mail")
5. **Dados**: quais informações são armazenadas, e com que formato/tipo?
6. **Erros**: o que acontece quando algo dá errado (campo vazio, dado
   inválido, ação não permitida)?
7. **Critérios de aceitação**: como você vai saber que está pronto e
   correto? (conecta direto com o Módulo 11 — Testes e Validação)
8. **Restrições**: existem limites técnicos, de tempo, de tecnologia que
   precisam ser respeitados?
9. **Fora de escopo**: o que essa tarefa **não** deveria fazer, mesmo que
   pareça relacionado? (Isso evita que o Claude "ajude demais", mudando
   coisas que não foram pedidas.)

Você não precisa de um documento formal enorme pra cada uma — muitas vezes
uma frase por item já é suficiente. O que importa é que a decisão tenha sido
**tomada por você**, não inventada pelo Claude no meio da implementação.

---

## Missão — Transformando um pedido vago em especificação

### Situação

Pegue uma ideia real de melhoria que você tenha para um dos seus projetos
(PyForge, curso de Linux, ou este treinamento) — algo que hoje você só
formularia como uma frase curta, do jeito que normalmente pede ao Claude.

### Prompt ruim (o ponto de partida — não é "errado" pedir assim, é incompleto)

> "Quero adicionar um sistema de comentários nas aulas do PyForge."

### Prompt bom (a mesma ideia, especificada)

> "Quero adicionar um sistema de comentários nas aulas do PyForge.
>
> - **Objetivo**: permitir que alunos deixem dúvidas ou observações em cada aula.
> - **Usuários**: qualquer visitante do site, sem necessidade de login (é um projeto educacional, não uma plataforma com contas).
> - **Fluxo**: o aluno escreve um comentário, clica em enviar, e ele aparece na lista, mais recente primeiro.
> - **Regras**: comentário vazio não pode ser enviado; sem edição ou exclusão por enquanto.
> - **Dados**: nome (opcional) + texto do comentário + data/hora.
> - **Erros**: se o texto estiver vazio, mostrar uma mensagem pedindo pra preencher, sem enviar nada.
> - **Critérios de aceitação**: um comentário enviado aparece imediatamente na lista, sem precisar recarregar a página.
> - **Restrições**: o site é estático (GitHub Pages) — não há banco de dados nem servidor, então os comentários não podem persistir entre visitas de pessoas diferentes por enquanto (isso é uma limitação conhecida, não um bug).
> - **Fora de escopo**: sem moderação, sem notificação por e-mail, sem resposta a comentários (thread) nesta primeira versão."

Repare que a especificação **não esconde a limitação técnica** (sem
persistência real) — ela é declarada como restrição conhecida. Isso evita
que o Claude implemente algo e você só descubra a limitação depois de já
pronto.

### O que fazer na prática

1. Escolha uma ideia real, mesmo pequena.
2. Escreva as nove respostas, mesmo que curtas — algumas podem ser "não se
   aplica" ou "não sei, preciso decidir".
3. Peça ao Claude pra revisar sua especificação antes de implementar: "Essa
   especificação está completa? Falta algo que você precisaria saber pra
   implementar isso sem ter que adivinhar?"
4. Só depois disso, peça a implementação.

### Checkpoint — tente sozinho primeiro

Pegue a mesma ideia vaga que você usaria normalmente pra pedir algo ao
Claude, e tente escrever as nove respostas **sozinho**, sem ajuda, antes de
qualquer prompt. Quantas você conseguiu responder de cabeça? Quais exigiram
parar e pensar — ou revelaram que você mesmo não tinha decidido ainda?

### O que você deveria ter aprendido

- Um prompt curto é uma intenção, não uma especificação — a diferença é o
  que fica implícito versus o que é decidido explicitamente.
- As nove perguntas (objetivo, usuários, fluxo, regras, dados, erros,
  critérios de aceitação, restrições, fora de escopo) cobrem a maior parte
  das decisões que, se não forem tomadas por você, serão inventadas pelo
  Claude.
- Declarar limitações técnicas conhecidas como restrições evita
  descobri-las só depois da implementação pronta.
- Pedir para o Claude revisar sua especificação, antes de implementar, é uma
  forma barata de pegar lacunas antes que virem código.

---

## 8.3 — Quando uma especificação completa é exagero

Assim como no Módulo 1 (nem toda decisão merece análise de trade-off), nem
todo pedido merece as nove perguntas por extenso. Ajustar um texto, corrigir
uma cor, ou consertar um bug pontual não precisam de especificação formal —
o critério é parecido: quanto mais a tarefa envolve **decisões de
comportamento** (o que acontece quando, quem pode fazer o quê), mais vale
especificar antes de pedir implementação.

**Próximo módulo**: Módulo 9 — Planejamento (depois de especificar, mas
antes de "implemente": quais arquivos serão afetados, em que ordem, com que
riscos).
