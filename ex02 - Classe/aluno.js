// Exercício 2 - Classe Aluno (atributos, construtor e métodos)
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    // true se nota >= 7
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // dados formatados
    toString() {
        return "Nome: " + this.nome +
            " | Idade: " + this.idade +
            " | Curso: " + this.curso +
            " | Nota: " + this.notaFinal.toFixed(1) +
            " | Situação: " + (this.isAprovado() ? "Aprovado" : "Reprovado");
    }
}
