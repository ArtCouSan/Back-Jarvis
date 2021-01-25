import { GraficosAcoesModel } from "./graficos-acoes.model";
import { PapelVariavelModel } from "./papel-variavel.model";
import { Patrimonio } from "./patrimonio.model";

export interface ConsolidadoAcoesModel {
    papeis: Array<PapelVariavelModel>,
    grafico: GraficosAcoesModel,
    patrimonio: Patrimonio
}