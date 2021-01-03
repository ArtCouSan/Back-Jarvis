import { RendaVariavelModel } from "./renda-variavel.model";

export interface ConsolidadoRendaVariavelModel {
    patrimonioTotal: number,
    renda: Array<RendaVariavelModel>
}