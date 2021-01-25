import { GraficosFiisModel } from "./graficos-fiis.model";
import { PapelVariavelModel } from "./papel-variavel.model";
import { Patrimonio } from "./patrimonio.model";

export interface ConsolidadoFiisModel {
    papeis: Array<PapelVariavelModel>,
    grafico: GraficosFiisModel,
    patrimonio: Patrimonio
}