export interface PapelSelicModel {
    id?: number,
    tipoPapel: string,
    ticket: string,
    nome: string,
    valorAtual: number,
    variacaoDia: number,
    qntPapeis: number,
    totalDoPapel: number,
    papelCorDeReferencia: string,
    dataCompra: Date
}