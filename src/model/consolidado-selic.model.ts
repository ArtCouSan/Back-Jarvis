import { GraficosSelicModel } from "./graficos-selic.model";
import { PapelSelicModel } from "./papel-selic.model";
import { Patrimonio } from "./patrimonio.model";

export interface ConsolidadoSelicModel {
    papeis: Array<PapelSelicModel>,
    grafico: GraficosSelicModel,
    patrimonio: Patrimonio
}