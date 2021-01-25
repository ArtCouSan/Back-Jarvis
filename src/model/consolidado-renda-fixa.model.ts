import { Patrimonio } from "./patrimonio.model";
import { RendaFixaModel } from "./renda-fixa.model";

export interface ConsolidadoRendaFixaModel {
    patrimonioTotal: Patrimonio,
    renda: Array<RendaFixaModel>
}