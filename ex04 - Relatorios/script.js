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

// =====================================================================
// Exercício 4 - Relatórios com filter, map, reduce, sort e forEach
// =====================================================================
const saida = document.getElementById("resultadoRelatorio");
let relatorioAtual = null;   // guarda o último relatório para atualizar dinamicamente

const semDados = () => alunos.length === 0;

// Listar aprovados -> filter + map
const relAprovados = () => {
    const aprovados = alunos.filter((a) => a.isAprovado());
    if (aprovados.length === 0) return "<p>Nenhum aluno aprovado.</p>";
    const itens = aprovados.map((a) => `<li>${a.nome} - ${a.curso} - Nota ${a.notaFinal}</li>`).join("");
    return `<h3>Aprovados (${aprovados.length})</h3><ul>${itens}</ul>`;
};

// Média das notas -> reduce
const relMediaNotas = () => {
    const soma = alunos.reduce((acc, a) => acc + a.notaFinal, 0);
    return `<h3>Média das notas finais</h3><p>${(soma / alunos.length).toFixed(2)}</p>`;
};

// Média das idades -> map + reduce
const relMediaIdades = () => {
    const soma = alunos.map((a) => a.idade).reduce((acc, idade) => acc + idade, 0);
    return `<h3>Média das idades</h3><p>${(soma / alunos.length).toFixed(1)} anos</p>`;
};

// Ordem alfabética -> map + sort ([...] para não alterar o array original)
const relOrdemAlfabetica = () => {
    const nomes = alunos.map((a) => a.nome).sort((x, y) => x.localeCompare(y, "pt-BR"));
    return `<h3>Alunos em ordem alfabética</h3><ol>${nomes.map((n) => `<li>${n}</li>`).join("")}</ol>`;
};

// Quantidade por curso -> reduce + forEach
const relPorCurso = () => {
    const contagem = alunos.reduce((acc, a) => {
        acc[a.curso] = (acc[a.curso] || 0) + 1;
        return acc;
    }, { JavaScript: 0, Python: 0, Java: 0 });

    let linhas = "";
    Object.entries(contagem).forEach(([curso, qtd]) => {
        linhas += `<tr><td>${curso}</td><td>${qtd}</td></tr>`;
    });
    return `<h3>Quantidade de alunos por curso</h3>
          <table border="1"><tr><th>Curso</th><th>Quantidade</th></tr>${linhas}</table>`;
};

const exibirRelatorio = (funcaoRelatorio) => {
    relatorioAtual = funcaoRelatorio;
    saida.innerHTML = semDados() ? "<p>Nenhum aluno cadastrado.</p>" : funcaoRelatorio();
};

document.getElementById("btnAprovados").addEventListener("click", function () { exibirRelatorio(relAprovados); });
document.getElementById("btnMediaNotas").addEventListener("click", function () { exibirRelatorio(relMediaNotas); });
document.getElementById("btnMediaIdades").addEventListener("click", function () { exibirRelatorio(relMediaIdades); });
document.getElementById("btnOrdemAlfabetica").addEventListener("click", function () { exibirRelatorio(relOrdemAlfabetica); });
document.getElementById("btnPorCurso").addEventListener("click", function () { exibirRelatorio(relPorCurso); });

// Atualização dinâmica: sempre que a tabela mudar (salvar/editar/excluir),
// o relatório aberto é recalculado automaticamente.
const observador = new MutationObserver(() => {
    if (relatorioAtual) exibirRelatorio(relatorioAtual);
});
observador.observe(tbody, { childList: true });
