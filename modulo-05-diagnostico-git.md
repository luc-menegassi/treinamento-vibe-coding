# Módulo 5 — Diagnóstico Avançado de Git

## 5.1 — Por que este módulo existe

No Módulo 0 você aprendeu os cinco comandos essenciais do Git
(`init`, `status`, `add`, `commit`, `push`). Isso é suficiente enquanto você
trabalha em um único projeto, sempre na mesma pasta. Mas assim que você
começa a alternar entre dois ou mais repositórios locais (por exemplo, o
PyForge e este treinamento), surge uma pergunta nova, mais sutil: **como
tenho certeza de que meu `push` vai para o repositório certo?**

Este módulo ensina a diagnosticar isso antes de confiar num push, evitando o
tipo de erro que só é descoberto depois de já ter subido código para o lugar
errado.

---

## Missão 9 — "Pra onde isso está indo?"

### Situação

Você tem dois projetos em pastas diferentes no seu computador — este
treinamento e o PyForge, por exemplo. Depois de rodar `git add .` num deles,
você se pergunta: como sei que o próximo `push` vai mesmo para o repositório
certo?

### O caso real

A pergunta foi feita exatamente assim:

> "Como eu tenho dois desenvolvimentos em dois repositórios diferentes, dei o
> comando git add . Como saber que ele está subindo para o repositório
> certo?"

A resposta revelou uma confusão comum, que vale destacar antes de qualquer
comando: **`git add .` não sobe nada.** Ele só marca arquivos para o próximo
commit, dentro da pasta local onde você está. Quem realmente envia código
para um repositório remoto é o `git push`. Ou seja, a pergunta certa não é
"pra onde o `add` está indo", é "pra onde o `push` vai ir".

### Os três comandos de diagnóstico

**1. Confirme em qual pasta você está:**
```bash
pwd
```
Cada projeto deve estar em uma pasta local separada, com seu próprio
histórico Git — não é possível ter dois remotes diferentes "ativos" dentro
da mesma pasta.

**2. Veja para qual repositório essa pasta aponta:**
```bash
git remote -v
```
Isso mostra algo como:
```
origin  https://github.com/seu-usuario/PyForge.git (fetch)
origin  https://github.com/seu-usuario/PyForge.git (push)
```
Se aparecer uma URL diferente da esperada, é sinal de que você está numa
pasta clonada do repositório errado, ou que o remote foi configurado errado
em algum momento.

**3. Antes do push, revise o que está prestes a subir:**
```bash
git status
git log origin/main..HEAD --oneline
```
O primeiro mostra a branch atual e os arquivos modificados; o segundo lista
os commits que ainda não foram enviados — uma checagem rápida de que faz
sentido para aquele projeto específico.

### Um detalhe importante: a conta do GitHub não é o que decide o destino

Mesmo que as duas pastas estejam usando a mesma conta autenticada do GitHub,
isso **não interfere** em para onde o push vai. O que importa é o `origin`
configurado em cada pasta local — cada pasta `.git` tem seu próprio remote
independente, isolado da sua sessão de login.

### Prompt bom (caso você não tenha certeza)

> "Estou na pasta [X] e quero confirmar para qual repositório um push vai
> antes de rodar o comando. Que comandos eu rodo pra conferir isso com
> segurança?"

### O que fazer na prática

1. Antes de um `push` em qualquer projeto que você alterna com frequência,
   rode `pwd` seguido de `git remote -v`.
2. Confirme visualmente que a URL bate com o projeto que você pretende
   atualizar.
3. Rode `git status` e `git log origin/main..HEAD --oneline` para revisar o
   que está prestes a subir, antes de confirmar.

### Checkpoint — tente sozinho primeiro

Se você tem mais de um repositório local no seu computador, entre em cada
pasta agora e rode `git remote -v`, sem perguntar nada ao Claude antes. Você
reconhece as duas URLs? Alguma é diferente do que você esperava?

### Dica para reduzir esse risco no dia a dia

Configure o terminal para mostrar a branch/repositório atual no prompt
(muitos temas de terminal já fazem isso por padrão), ou torne `git remote -v`
um hábito automático antes de qualquer `push` em projetos que você alterna
com frequência — é a forma mais direta de confirmar visualmente antes de
confirmar de vez.

---

## O que você deveria ter aprendido

- `git add` e `git commit` são operações locais; só `git push` envia algo
  para um repositório remoto.
- `git remote -v` mostra para qual repositório a pasta atual está conectada
  — é o comando de diagnóstico principal quando você alterna entre projetos.
- A conta do GitHub autenticada na sua máquina não decide o destino do push;
  quem decide é o `origin` configurado em cada pasta local, individualmente.
- `git status` e `git log origin/main..HEAD --oneline` mostram o que está
  prestes a subir, antes de você confirmar.

**Próximo módulo**: Módulo 6 — Projeto Final da Trilha 1: construir e
publicar o site deste treinamento, aplicando tudo dos Módulos 0 a 5 em um
projeto real.
