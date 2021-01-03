import { RendaFixaModel } from "./renda-fixa.model";

export interface ConsolidadoRendaFixaModel {
    patrimonioTotal: number,
    renda: Array<RendaFixaModel>
}