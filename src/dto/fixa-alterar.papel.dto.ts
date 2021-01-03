export interface FixaAlterarPapelDTO {
    id: number,
    ticket: string,
    nome: string,
    valorAtual: number,
    variacaoDia: number,
    qntPapeis: number,
    totalDoPapel: number,
    papelCorDeReferencia: string
}