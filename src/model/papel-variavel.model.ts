export interface PapelVariavelModel {
    id?: number,
    tipoPapel: string,
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
    papelCorDeReferencia: string,
    setor: string,
    dataCompra: Date
}