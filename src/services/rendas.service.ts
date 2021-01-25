import { getManager } from "typeorm";
import { ConsolidadoRendasModel } from "../model/consolidado-rendas.model";
import { Patrimonio } from "../model/patrimonio.model";
import { RendaModel } from "../model/renda.model";

export class RendasService {

    public async consolidadoRendas(): Promise<any> {

        let renda: Array<RendaModel> =
            await getManager().query(`select coalesce(SUM(psm."totalDoPapel"), 0) as "patrimonio", 'SELIC' as "tipoRenda" from papel_selic_model psm union select coalesce(SUM(pvm."totalDoPapel"), 0) as "patrimonio", 'ACAO' as "tipoRenda"  from papel_variavel_model pvm`);

            renda.forEach(item => {
            item.corReferencia = '#' + Math.random().toString(16).substr(-6);
        })

        const patrimonio: Patrimonio = await getManager().query(`select sum(rendas.patrimonio) as patrimonio from (select SUM(psm."totalDoPapel") as "patrimonio" from papel_selic_model psm union select SUM(pvm."totalDoPapel") as "patrimonio" from papel_variavel_model pvm) as rendas`);

        const consolidadoRendas: ConsolidadoRendasModel = {
            patrimonioTotal: patrimonio,
            renda: renda
        }

        return Promise.resolve(consolidadoRendas);
    }

}