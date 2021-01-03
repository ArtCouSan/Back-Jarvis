import { GraficoQuantidadePapelModel } from "./grafico-quantidade-papel.model";
import { GraficoSetorModel } from "./grafico-setor.model";

export interface GraficosFiisModel {
    graficoSetor: Array<GraficoSetorModel>,
    graficoQtnPapel: Array<GraficoQuantidadePapelModel>
}