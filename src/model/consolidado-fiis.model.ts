import { GraficosFiisModel } from "./graficos-fiis.model";
import { PapelVariavelModel } from "./papel-variavel.model";

export interface ConsolidadoFiisModel {
    papeis: Array<PapelVariavelModel>,
    grafico: GraficosFiisModel,
    patrimonio: number
}