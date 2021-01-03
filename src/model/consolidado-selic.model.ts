import { GraficosSelicModel } from "./graficos-selic.model";
import { PapelSelicModel } from "./papel-selic.model";

export interface ConsolidadoSelicModel {
    papeis: Array<PapelSelicModel>,
    grafico: GraficosSelicModel,
    patrimonio: number
}