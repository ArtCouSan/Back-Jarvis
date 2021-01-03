import { GraficosAcoesModel } from "./graficos-acoes.model";
import { PapelVariavelModel } from "./papel-variavel.model";

export interface ConsolidadoAcoesModel {
    papeis: Array<PapelVariavelModel>,
    grafico: GraficosAcoesModel,
    patrimonio: number
}