import cheerio from 'cheerio';
import request from 'request';
import { getManager, getRepository } from "typeorm";
import { FixaAddOrRemovePapelDto } from "../dto/fixa-add-remove.papel.dto";
import { FixaAlterarPapelDTO } from "../dto/fixa-alterar.papel.dto";
import { FixaCadastrarPapelDTO } from "../dto/fixa-cadastrar.papel.dto";
import { FixaDeletarPapelDTO } from "../dto/fixa-deletar.papel.dto";
import { ConsolidadoRendaVariavelModel } from "../model/consolidado-renda-variavel.model";
import { ConsolidadoSelicModel } from "../model/consolidado-selic.model";
import { PapelFixaHistoricoModel } from "../model/papel-fixa-historico.model";
import { PapelSelicModel } from "../model/papel-selic.model";
import { Patrimonio } from "../model/patrimonio.model";
import { RendaFixaModel } from '../model/renda-fixa.model';

export class PapelFixaService {

    public async savePapel(papelDTO: FixaCadastrarPapelDTO): Promise<PapelSelicModel> {

        let papel = new PapelSelicModel();
        let historicoPapel = new PapelFixaHistoricoModel();

        papel.tipoPapel = papelDTO.tipoPapel;
        papel.ticket = papelDTO.ticket;
        papel.nome = papelDTO.nome;
        papel.valorAtual = papelDTO.valorAtual;
        papel.qntPapeis = papelDTO.qntPapeis;
        papel.totalDoPapel = papelDTO.totalDoPapel;
        papel.papelCorDeReferencia = papelDTO.papelCorDeReferencia;
        papel.dataCompra = new Date().toISOString();
        papel.status = true;

        const responsePapelFixa = await getRepository(PapelSelicModel).save(papel);

        historicoPapel.idPapel = responsePapelFixa.id;
        historicoPapel.isAdd = true;
        historicoPapel.qntPapeis = responsePapelFixa.qntPapeis;
        historicoPapel.valorAtual = responsePapelFixa.valorAtual;
        historicoPapel.data = responsePapelFixa.dataCompra;

        await getRepository(PapelFixaHistoricoModel).save(historicoPapel);

        return responsePapelFixa;

    }

    public async addOrRemove(id: number, papelDTO: FixaAddOrRemovePapelDto): Promise<any> {

        let historicoPapel = new PapelFixaHistoricoModel();

        getRepository(PapelSelicModel).findOne(id)
            .then(resultPapelFixa => {

                if (resultPapelFixa) {

                    if (papelDTO.isAdd) {

                        resultPapelFixa.qntPapeis = resultPapelFixa.qntPapeis + papelDTO.qtn;
                        resultPapelFixa.totalDoPapel = resultPapelFixa.qntPapeis * resultPapelFixa.valorAtual;

                    } else {

                        resultPapelFixa.qntPapeis = resultPapelFixa.qntPapeis - papelDTO.qtn;
                        resultPapelFixa.totalDoPapel = resultPapelFixa.qntPapeis * resultPapelFixa.valorAtual;

                    }

                    historicoPapel.idPapel = id;
                    historicoPapel.isAdd = papelDTO.isAdd;
                    historicoPapel.qntPapeis = papelDTO.qtn;
                    historicoPapel.valorAtual = papelDTO.valor;
                    historicoPapel.data = papelDTO.data;

                    getRepository(PapelFixaHistoricoModel).save(historicoPapel);

                    return getRepository(PapelSelicModel).save(resultPapelFixa);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async deletePapel(id: number, papelDTO: FixaDeletarPapelDTO): Promise<any> {

        getRepository(PapelSelicModel).findOne(id)
            .then(resultPapelFixa => {

                if (resultPapelFixa) {

                    resultPapelFixa.status = papelDTO.isDeletar ? false : true;

                    return getRepository(PapelSelicModel).save(resultPapelFixa);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async alterarPapel(id: number, papelDTO: FixaAlterarPapelDTO): Promise<any> {

        getRepository(PapelSelicModel).findOne(id)
            .then(resultPapelFixa => {

                if (resultPapelFixa) {

                    resultPapelFixa.ticket = papelDTO.ticket ? papelDTO.ticket : resultPapelFixa.ticket;
                    resultPapelFixa.nome = papelDTO.nome ? papelDTO.nome : resultPapelFixa.nome;
                    resultPapelFixa.valorAtual = papelDTO.valorAtual ? papelDTO.valorAtual : resultPapelFixa.valorAtual;
                    resultPapelFixa.qntPapeis = papelDTO.qntPapeis ? papelDTO.qntPapeis : resultPapelFixa.qntPapeis;
                    resultPapelFixa.papelCorDeReferencia = papelDTO.papelCorDeReferencia ? papelDTO.papelCorDeReferencia : resultPapelFixa.papelCorDeReferencia;
                    resultPapelFixa.dataCompra = new Date().toISOString();
                    resultPapelFixa.status = true;

                    return getRepository(PapelSelicModel).save(resultPapelFixa);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async consolidadoSelic(): Promise<any> {

        const listaPapeis: Array<PapelSelicModel> = await getRepository(PapelSelicModel).createQueryBuilder("papel").getMany();

        const patrimonio: Patrimonio = await getManager().query(`select sum(psm."valorAtual") as "value" from papel_selic_model psm group by psm."tipoPapel" ;`);

        const consolidadoSelic: ConsolidadoSelicModel = {
            grafico: {},
            papeis: listaPapeis,
            patrimonio: patrimonio
        }

        return Promise.resolve(consolidadoSelic);
    }

    public async consolidado(): Promise<any> {

        const patrimonio: Patrimonio = await getManager().query(`select sum(psm."totalDoPapel") as "value" from papel_selic_model psm group by psm."tipoPapel" ;`);

        let lista: Array<RendaFixaModel> =
            await getManager().query(`select sum(psm."totalDoPapel") as "patrimonio", psm."tipoPapel" as "tipoRenda" from papel_selic_model psm  group by "tipoRenda"`);


        const consolidado: ConsolidadoRendaVariavelModel = {
            patrimonioTotal: patrimonio,
            renda: lista
        }

        return Promise.resolve(consolidado);
    }
}

