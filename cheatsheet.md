# Cheatsheet

Página de consulta rápida — comandos prontos, organizados por ferramenta.
Não tem explicação longa de conceito aqui (isso está no Glossário); é só
"qual é o comando mesmo?".

---

## Terminal / Fedora (`dnf`)

```bash
pwd                      # mostra em qual pasta você está
ls                        # lista arquivos da pasta atual
ls -la                    # lista incluindo arquivos ocultos, com detalhes
cd nome-pasta             # entra numa pasta
cd ..                     # sobe um nível
mkdir nome                # cria uma pasta

sudo dnf install <pacote> # instala um pacote
sudo dnf upgrade          # atualiza tudo
dnf search <termo>        # busca um pacote
sudo dnf remove <pacote>  # remove um pacote
```

---

## Git — básico (Módulo 0)

```bash
git init                          # transforma a pasta atual num repositório Git
git status                        # mostra o que mudou desde o último commit
git add .                         # marca todos os arquivos modificados para o próximo commit
git commit -m "mensagem"          # grava as mudanças marcadas, localmente
git push                          # envia os commits locais para o repositório remoto

git clone <url>                   # clona um repositório existente do GitHub
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

## Git — diagnóstico (Módulo 5)

```bash
git remote -v                              # mostra para qual repositório a pasta aponta
git status                                 # branch atual + arquivos modificados
git log origin/main..HEAD --oneline        # commits locais ainda não enviados
```

---

## Git — autenticação e credenciais (Módulo 0, seção 0.8)

```bash
git config --global credential.helper store   # guarda a credencial após o próximo login bem-sucedido

# Diagnóstico de autenticação "muda" (falha sem nem pedir senha):
git config --global --list | grep credential          # helpers configurados globalmente
cat /etc/gitconfig | grep -A2 credential               # helper configurado a nível de sistema
ls -la ~/.git-credentials                               # existe credencial antiga salva?
ls -la ~/.netrc                                          # existe credencial alternativa (usada pelo curl)?
git config --list --show-origin | grep -i credential   # todas as configs de credencial, com origem
git config --list --show-origin | grep -i url          # existe reescrita de URL estranha?
env | grep -i -E 'git|github|askpass'                   # variáveis de ambiente suspeitas

# Se SSH_ASKPASS (ou similar) estiver interceptando o prompt:
env -u SSH_ASKPASS git push        # roda o push sem essa variável, só para essa execução
```

> ⚠️ Nunca cole o valor de um token/senha aqui ou em qualquer chat — só
> digite quando a própria ferramenta pedir, no prompt interativo dela.

---

## npm / Node.js

```bash
node --version         # confirma que o Node.js está instalado
npm --version           # confirma que o npm está instalado

npm install             # instala as dependências listadas no package.json
npm run dev              # roda o projeto em modo desenvolvimento (localhost:3000)
npm run build             # gera o build de produção (testar antes do deploy!)
```

---

## Next.js — build para GitHub Pages

```bash
GITHUB_PAGES=true npm run build   # simula o build exatamente como o CI vai rodar
```

---

## Referência cruzada

Não lembra o que um termo deste cheatsheet significa? Veja o
[Glossário Técnico](/glossario/).
