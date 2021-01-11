export interface VariavelAlterarPapelDTO {
    ticket: string,
    nome: string,
    valorAtual: number,
    variacaoDia: number,
    valorJusto: number,
    qntPapeis: number,
    margemDeQtn: number,
    margemDeQtnDesejado: number,
    papelCorDeReferencia: string
}