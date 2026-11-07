# EC01 - Alunos
## DevTech Academy – Gerenciamento de Alunos

Estudo de caso (EC01): sistema para **cadastrar, listar, editar e excluir** alunos e gerar **relatórios**, feito em HTML + JavaScript puro (sem CSS).

## Estrutura
| Pasta | Exercício | Conceitos |
|---|---|---|
| `ex01 - CRUD/` | CRUD com formulário e tabela | DOM, `onclick`, array de objetos |
| `ex02 - Classe/` | Classe `Aluno` | atributos, construtor, `isAprovado()`, `toString()` |
| `ex03 - Eventos/` | Eventos | `addEventListener`, funções anônimas, arrow functions, `alert`/`console.log` |
| `ex04 - Relatorios/` | Relatórios | `filter`, `map`, `reduce`, `sort`, `forEach` |

Cada exercício evolui o anterior, então a versão mais completa é o **ex04**.

## Como rodar com Docker
Opção 1 – docker compose (recomendado para desenvolvimento, com volume):
```bash
docker compose up -d
```
Opção 2 – build da imagem:
```bash
docker build -t devtech-academy .
docker run -d -p 8080:80 --name devtech devtech-academy
```
Acesse: http://localhost:8080

Parar: `docker compose down` (ou `docker stop devtech && docker rm devtech`).

## Versionamento no GitHub
```bash
git init
git add .
git commit -m "EC01 - Gerenciamento de alunos (ex01 a ex04) + Docker"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/devtech-academy.git
git push -u origin main
```
Dica: para mostrar a evolução, faça um commit por exercício.
