export interface VariavelAlterarPapelDTO {
    id: number,
    ticket: string,
    nome: string,
    valorAtual: number,
    variacaoDia: number,
    valorJusto: number,
    qntPapeis: number,
    porcentagemLucro: number,
    margemDeQtn: number,
    margemDeQtnDesejado: number,
    totalDoPapel: number,
    papelCorDeReferencia: string
}