// Exercício 3 - addEventListener + funções anônimas + arrow functions
let alunos = [];
let indiceEdicao = -1;

// Referências do DOM
const form = document.getElementById("formAluno");
const btnSalvar = document.getElementById("btnSalvar");
const btnLimpar = document.getElementById("btnLimpar");
const tbody = document.getElementById("tabelaAlunos");

// ---------- Arrow functions: manipulação dos dados ----------
const lerFormulario = () => ({
    nome: document.getElementById("nome").value.trim(),
    idade: document.getElementById("idade").value,
    curso: document.getElementById("curso").value,
    notaFinal: document.getElementById("notaFinal").value
});

const formularioValido = (d) => d.nome !== "" && d.idade !== "" && d.notaFinal !== "";

const adicionarAluno = (aluno) => alunos.push(aluno);
const atualizarAluno = (i, aluno) => { alunos[i] = aluno; };
const removerAluno = (i) => alunos.splice(i, 1);

const preencherFormulario = (a) => {
    document.getElementById("nome").value = a.nome;
    document.getElementById("idade").value = a.idade;
    document.getElementById("curso").value = a.curso;
    document.getElementById("notaFinal").value = a.notaFinal;
};

const limparFormulario = () => {
    form.reset();
    indiceEdicao = -1;
    btnSalvar.textContent = "Cadastrar";
};

const renderizarTabela = () => {
    tbody.innerHTML = "";
    alunos.forEach((a, i) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
      <td>${a.nome}</td>
      <td>${a.idade}</td>
      <td>${a.curso}</td>
      <td>${a.notaFinal} (${a.isAprovado() ? "Aprovado" : "Reprovado"})</td>
      <td>
        <button class="btnEditar" data-index="${i}">Editar</button>
        <button class="btnExcluir" data-index="${i}">Excluir</button>
      </td>`;
        tbody.appendChild(linha);
    });
};

// ---------- Funções anônimas: eventos de clique ----------
btnSalvar.addEventListener("click", function () {
    const d = lerFormulario();
    if (!formularioValido(d)) {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = new Aluno(d.nome, d.idade, d.curso, d.notaFinal);

    if (indiceEdicao === -1) {
        adicionarAluno(aluno);
        alert("Aluno cadastrado com sucesso!");
        console.log("Salvo:", aluno.toString());
    } else {
        atualizarAluno(indiceEdicao, aluno);
        alert("Aluno editado com sucesso!");
        console.log("Editado:", aluno.toString());
    }

    limparFormulario();
    renderizarTabela();
});

btnLimpar.addEventListener("click", function () {
    limparFormulario();
});

// Delegação de eventos: um único listener na tabela atende todos os botões
tbody.addEventListener("click", function (evento) {
    const botao = evento.target;
    const i = Number(botao.dataset.index);

    if (botao.classList.contains("btnEditar")) {
        preencherFormulario(alunos[i]);
        indiceEdicao = i;
        btnSalvar.textContent = "Salvar alteração";
    }

    if (botao.classList.contains("btnExcluir")) {
        if (confirm(`Deseja excluir o aluno ${alunos[i].nome}?`)) {
            const [removido] = removerAluno(i);
            alert("Aluno excluído com sucesso!");
            console.log("Excluído:", removido.toString());
            limparFormulario();
            renderizarTabela();
        }
    }
});
