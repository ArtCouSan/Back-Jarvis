export interface VariavelCadastrarPapelDTO {
    ticket: string,
    nome: string,
    valorAtual: number,
    valorJusto: number,
    qntPapeis: number,
    margemDeQtn: number,
    margemDeQtnDesejado: number,
    totalDoPapel: number,
    papelCorDeReferencia: string,
    tipoPapel: string
}