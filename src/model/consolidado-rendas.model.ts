import { Patrimonio } from "./patrimonio.model";
import { RendaModel } from "./renda.model";

export interface ConsolidadoRendasModel {
    patrimonioTotal: Patrimonio,
    renda: Array<RendaModel>
}