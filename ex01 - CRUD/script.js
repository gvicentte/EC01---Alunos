// Exercício 1 - CRUD com array de objetos em memória e eventos onclick
let alunos = [];          // "banco de dados" em memória
let indiceEdicao = -1;    // -1 = modo cadastro | >= 0 = modo edição

function salvarAluno() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("notaFinal").value;

    if (nome === "" || idade === "" || notaFinal === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = {
        nome: nome,
        idade: Number(idade),
        curso: curso,
        notaFinal: Number(notaFinal)
    };

    if (indiceEdicao === -1) {
        alunos.push(aluno);                 // CREATE
    } else {
        alunos[indiceEdicao] = aluno;       // UPDATE
        indiceEdicao = -1;
        document.getElementById("btnSalvar").textContent = "Cadastrar";
    }

    limparFormulario();
    renderizarTabela();
}

function renderizarTabela() {           // READ
    const tbody = document.getElementById("tabelaAlunos");
    tbody.innerHTML = "";

    for (let i = 0; i < alunos.length; i++) {
        const a = alunos[i];
        const linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + a.nome + "</td>" +
            "<td>" + a.idade + "</td>" +
            "<td>" + a.curso + "</td>" +
            "<td>" + a.notaFinal + "</td>" +
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

function excluirAluno(i) {              // DELETE
    if (confirm("Deseja excluir o aluno " + alunos[i].nome + "?")) {
        alunos.splice(i, 1);
        renderizarTabela();
    }
}

function limparFormulario() {
    document.getElementById("formAluno").reset();
}
