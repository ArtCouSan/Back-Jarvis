import { GraficoQuantidadePapelModel } from "./grafico-quantidade-papel.model";
import { GraficoSetorModel } from "./grafico-setor.model";

export interface GraficosAcoesModel {
    graficoSetor: Array<GraficoSetorModel>,
    graficoQtnPapel: Array<GraficoQuantidadePapelModel>
}