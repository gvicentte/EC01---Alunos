// Exercício 2 - CRUD refatorado para usar instâncias da classe Aluno
let alunos = [];
let indiceEdicao = -1;

function salvarAluno() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("notaFinal").value;

    if (nome === "" || idade === "" || notaFinal === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = new Aluno(nome, idade, curso, notaFinal);   // instância da classe

    if (indiceEdicao === -1) {
        alunos.push(aluno);
    } else {
        alunos[indiceEdicao] = aluno;
        indiceEdicao = -1;
        document.getElementById("btnSalvar").textContent = "Cadastrar";
    }

    console.log(aluno.toString());
    limparFormulario();
    renderizarTabela();
}

function renderizarTabela() {
    const tbody = document.getElementById("tabelaAlunos");
    tbody.innerHTML = "";

    for (let i = 0; i < alunos.length; i++) {
        const a = alunos[i];
        const linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + a.nome + "</td>" +
            "<td>" + a.idade + "</td>" +
            "<td>" + a.curso + "</td>" +
            "<td>" + a.notaFinal + " (" + (a.isAprovado() ? "Aprovado" : "Reprovado") + ")</td>" +
            "<td>" +
            "<button onclick='editarAluno(" + i + ")'>Editar</button> " +
            "<button onclick='excluirAluno(" + i + ")'>Excluir</button>" +
            "</td>";
        tbody.appendChild(linha);
    }
}

function editarAluno(i) {
    const a = alunos[i];
    document.getElementById("nome").value = a.nome;
    document.getElementById("idade").value = a.idade;
    document.getElementById("curso").value = a.curso;
    document.getElementById("notaFinal").value = a.notaFinal;
    indiceEdicao = i;
    document.getElementById("btnSalvar").textContent = "Salvar alteração";
}

function excluirAluno(i) {
    if (confirm("Deseja excluir o aluno " + alunos[i].nome + "?")) {
        alunos.splice(i, 1);
        renderizarTabela();
    }
}

function limparFormulario() {
    document.getElementById("formAluno").reset();
}
