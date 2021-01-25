import { Patrimonio } from "./patrimonio.model";
import { RendaVariavelModel } from "./renda-variavel.model";

export interface ConsolidadoRendaVariavelModel {
    patrimonioTotal: Patrimonio,
    renda: Array<RendaVariavelModel>
}