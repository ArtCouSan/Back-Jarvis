import { getManager, getRepository } from "typeorm";
import { VariavelAddOrRemovePapelDto } from "../dto/variavel-add-remove.papel.dto";
import { VariavelAlterarPapelDTO } from "../dto/variavel-alterar.papel.dto";
import { VariavelCadastrarPapelDTO } from "../dto/variavel-cadastrar.papel.dto";
import { VariavelDeletarPapelDTO } from "../dto/variavel-deletar.papel.dto";
import { ConsolidadoAcoesModel } from "../model/consolidado-acoes.model";
import { ConsolidadoFiisModel } from "../model/consolidado-fiis.model";
import { ConsolidadoRendaVariavelModel } from "../model/consolidado-renda-variavel.model";
import { PAPEL_VARIAVEL_TIPO_ENUM } from "../model/enums/papel-variavel-tipo.enum";
import { GraficoQuantidadePapelModel } from "../model/grafico-quantidade-papel.model";
import { GraficoSetorModel } from "../model/grafico-setor.model";
import { GraficosAcoesModel } from "../model/graficos-acoes.model";
import { GraficosFiisModel } from "../model/graficos-fiis.model";
import { PapelVariavelHistoricoModel } from "../model/papel-variavel-historico.model";
import { PapelVariavelModel } from "../model/papel-variavel.model";
import { Patrimonio } from "../model/patrimonio.model";
import { RendaVariavelModel } from "../model/renda-variavel.model";
import cheerio from 'cheerio';
import request from 'request';
export class PapelVariavelService {

    public async savePapel(papelDTO: VariavelCadastrarPapelDTO): Promise<any> {

        const url = papelDTO.tipoPapel == PAPEL_VARIAVEL_TIPO_ENUM.ACOES ? `https://statusinvest.com.br/acoes/${papelDTO.ticket.toLowerCase()}` : `https://statusinvest.com.br/fundos-imobiliarios/${papelDTO.ticket.toLowerCase()}`;

        let papel = new PapelVariavelModel();
        let historicoPapel = new PapelVariavelHistoricoModel();

        papel.tipoPapel = papelDTO.tipoPapel;
        papel.ticket = papelDTO.ticket;
        papel.nome = papelDTO.nome;
        papel.valorAtual = papelDTO.valorAtual;
        papel.qntPapeis = papelDTO.qntPapeis;

        await request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }
        }, async function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body);

                // Variacao do dia
                const variacaoAtual: string = $(".info.special").parent().find(".v-align-middle")[0].children[0].data;
                papel.variacaoDia = variacaoAtual.replace("%", "");

                const precoAtual: string = $(".info.special").parent().find(".value")[0].children[0].data;
                const precoAtualNumerico = Number(precoAtual.replace(",", "."));

                papel.porcentagemLucro = (((precoAtualNumerico * papelDTO.qntPapeis) / (papelDTO.valorAtual * papelDTO.qntPapeis)) - 1) * 100;

            } else {

                papel.variacaoDia = "0";
                papel.porcentagemLucro = 0;

            }


            papel.totalDoPapel = papelDTO.valorAtual * papelDTO.qntPapeis;
            papel.papelCorDeReferencia = papelDTO.papelCorDeReferencia;
            papel.dataCompra = papelDTO.dataCompra;
            papel.valorJusto = papelDTO.valorJusto;

            // TODO: montar consulta
            papel.margemDeQtn = 0;
            papel.margemDeQtnDesejado = papelDTO.margemDeQtnDesejado;
            papel.setor = papelDTO.setor;
            papel.status = true;

            const responsePapelVariavel = await getRepository(PapelVariavelModel).save(papel);

            historicoPapel.idPapel = responsePapelVariavel.id;
            historicoPapel.isAdd = true;
            historicoPapel.qntPapeis = responsePapelVariavel.qntPapeis;
            historicoPapel.valorAtual = responsePapelVariavel.valorAtual;
            historicoPapel.data = responsePapelVariavel.dataCompra;

            await getRepository(PapelVariavelHistoricoModel).save(historicoPapel);

            return responsePapelVariavel;

        });

    }

    public async addOrRemove(id: number, papelDTO: VariavelAddOrRemovePapelDto): Promise<any> {

        let historicoPapel = new PapelVariavelHistoricoModel();

        getRepository(PapelVariavelModel).findOne(id)
            .then(resultPapelVariavel => {

                if (resultPapelVariavel) {

                    if (papelDTO.isAdd) {

                        resultPapelVariavel.qntPapeis = resultPapelVariavel.qntPapeis + papelDTO.qtn;
                        resultPapelVariavel.totalDoPapel = resultPapelVariavel.qntPapeis * resultPapelVariavel.valorAtual;

                    } else {

                        resultPapelVariavel.qntPapeis = resultPapelVariavel.qntPapeis - papelDTO.qtn;
                        resultPapelVariavel.totalDoPapel = resultPapelVariavel.qntPapeis * resultPapelVariavel.valorAtual;

                    }

                    historicoPapel.idPapel = id;
                    historicoPapel.isAdd = papelDTO.isAdd;
                    historicoPapel.qntPapeis = papelDTO.qtn;
                    historicoPapel.valorAtual = papelDTO.valor;
                    historicoPapel.data = papelDTO.data;

                    getRepository(PapelVariavelHistoricoModel).save(historicoPapel);

                    return getRepository(PapelVariavelModel).save(resultPapelVariavel);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async deletePapel(id: number, papelDTO: VariavelDeletarPapelDTO): Promise<any> {

        getRepository(PapelVariavelModel).findOne(id)
            .then(resultPapelVariavel => {

                if (resultPapelVariavel) {

                    resultPapelVariavel.status = papelDTO.isDeletar ? false : true;

                    return getRepository(PapelVariavelModel).save(resultPapelVariavel);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async alterarPapel(id: number, papelDTO: VariavelAlterarPapelDTO): Promise<any> {

        getRepository(PapelVariavelModel).findOne(id)
            .then(resultPapelVariavel => {

                if (resultPapelVariavel) {

                    const url = resultPapelVariavel.tipoPapel == PAPEL_VARIAVEL_TIPO_ENUM.ACOES ? `https://statusinvest.com.br/acoes/${papelDTO.ticket.toLowerCase()}` : `https://statusinvest.com.br/fundos-imobiliarios/${papelDTO.ticket.toLowerCase()}`;

                    resultPapelVariavel.ticket = papelDTO.ticket ? papelDTO.ticket : resultPapelVariavel.ticket;
                    resultPapelVariavel.nome = papelDTO.nome ? papelDTO.nome : resultPapelVariavel.nome;
                    resultPapelVariavel.valorAtual = papelDTO.valorAtual ? papelDTO.valorAtual : resultPapelVariavel.valorAtual;
                    resultPapelVariavel.qntPapeis = papelDTO.qntPapeis ? papelDTO.qntPapeis : resultPapelVariavel.qntPapeis;
                    resultPapelVariavel.papelCorDeReferencia = papelDTO.papelCorDeReferencia ? papelDTO.papelCorDeReferencia : resultPapelVariavel.papelCorDeReferencia;
                    resultPapelVariavel.dataCompra = resultPapelVariavel.dataCompra;
                    resultPapelVariavel.valorJusto = papelDTO.valorJusto ? papelDTO.valorJusto : resultPapelVariavel.valorJusto;
                    resultPapelVariavel.margemDeQtn = papelDTO.margemDeQtn ? papelDTO.margemDeQtn : resultPapelVariavel.margemDeQtn;
                    resultPapelVariavel.margemDeQtnDesejado = papelDTO.margemDeQtnDesejado ? papelDTO.margemDeQtnDesejado : resultPapelVariavel.margemDeQtnDesejado;
                    resultPapelVariavel.setor = papelDTO.setor ? papelDTO.setor : resultPapelVariavel.setor;
                    resultPapelVariavel.status = true;

                    request({
                        url: url,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
                        }
                    }, function (error, response, body) {
                        if (!error) {
                            var $ = cheerio.load(body);

                            // Variacao do dia
                            const variacaoAtual: string = $(".info.special").parent().find(".v-align-middle")[0].children[0].data;
                            resultPapelVariavel.variacaoDia = variacaoAtual.replace("%", "");

                            const precoAtual: string = $(".info.special").parent().find(".value")[0].children[0].data;
                            const precoAtualNumerico = Number(precoAtual.replace(",", "."));

                            resultPapelVariavel.porcentagemLucro = (((precoAtualNumerico * papelDTO.qntPapeis) / (resultPapelVariavel.valorAtual * papelDTO.qntPapeis)) - 1) * 100;

                        } else {

                            resultPapelVariavel.variacaoDia = "0";
                            resultPapelVariavel.porcentagemLucro = 0;

                        }
                    });

                    resultPapelVariavel.totalDoPapel = resultPapelVariavel.valorAtual * papelDTO.qntPapeis;

                    return getRepository(PapelVariavelModel).save(resultPapelVariavel);

                } else {

                    return Promise.reject();

                }

            }).catch(error => {

                console.log(error);
                return Promise.reject();

            });

    }

    public async consolidadoFiis(): Promise<any> {

        const listaPapeis: Array<PapelVariavelModel> = await getRepository(PapelVariavelModel).createQueryBuilder("papel")
            .where("papel.tipoPapel = :tipoPapel", { tipoPapel: PAPEL_VARIAVEL_TIPO_ENUM.FIIS }).getMany();

        const listaQuantidadePapeis: Array<GraficoQuantidadePapelModel> =
            await getManager().query(`SELECT * FROM public.proc_grafico_quantidade_papel_model('${PAPEL_VARIAVEL_TIPO_ENUM.FIIS}');`);

        let listaSetorPapeis: Array<GraficoSetorModel> =
            await getManager().query(`SELECT * FROM public.proc_grafico_setor_papel_model('${PAPEL_VARIAVEL_TIPO_ENUM.FIIS}');`);

        listaSetorPapeis.forEach(item => {
            item.setorCorDeReferencia = '#' + Math.random().toString(16).substr(-6);
        })

        const patrimonio: Patrimonio = await getManager().query(`select sum(pvm."totalDoPapel") as "value" from papel_variavel_model pvm where pvm."tipoPapel" = '${PAPEL_VARIAVEL_TIPO_ENUM.FIIS}' group by pvm."tipoPapel";`);

        const graficoFiis: GraficosFiisModel = {
            graficoQtnPapel: listaQuantidadePapeis,
            graficoSetor: listaSetorPapeis
        }

        const consolidadoFiis: ConsolidadoFiisModel = {
            patrimonio: patrimonio,
            papeis: listaPapeis,
            grafico: graficoFiis
        }

        return Promise.resolve(consolidadoFiis);
    }

    public async consolidadoAcoes(): Promise<any> {

        const listaPapeis: Array<PapelVariavelModel> = await getRepository(PapelVariavelModel).createQueryBuilder("papel")
            .where("papel.tipoPapel = :tipoPapel", { tipoPapel: PAPEL_VARIAVEL_TIPO_ENUM.ACOES }).getMany();

        const listaQuantidadePapeis: Array<GraficoQuantidadePapelModel> =
            await getManager().query(`SELECT * FROM public.proc_grafico_quantidade_papel_model('${PAPEL_VARIAVEL_TIPO_ENUM.ACOES}');`);

        let listaSetorPapeis: Array<GraficoSetorModel> =
            await getManager().query(`SELECT * FROM public.proc_grafico_setor_papel_model('${PAPEL_VARIAVEL_TIPO_ENUM.ACOES}');`);

        listaSetorPapeis.forEach(item => {
            item.setorCorDeReferencia = '#' + Math.random().toString(16).substr(-6);
        })

        const patrimonio: Patrimonio = await getManager().query(`select sum(pvm."totalDoPapel") as "value" from papel_variavel_model pvm where pvm."tipoPapel" = '${PAPEL_VARIAVEL_TIPO_ENUM.ACOES}' group by pvm."tipoPapel";`);

        const graficoAcoes: GraficosAcoesModel = {
            graficoQtnPapel: listaQuantidadePapeis,
            graficoSetor: listaSetorPapeis
        }

        const consolidadoAcoes: ConsolidadoAcoesModel = {
            patrimonio: patrimonio,
            papeis: listaPapeis,
            grafico: graficoAcoes
        }

        return Promise.resolve(consolidadoAcoes);
    }

    public async consolidado(): Promise<any> {

        let lista: Array<RendaVariavelModel> =
            await getManager().query(`select sum(pvm."totalDoPapel") as "patrimonio", pvm."tipoPapel" as "tipoRenda" from papel_variavel_model pvm group by "tipoRenda"`);

        lista.forEach(item => {
            item.corReferencia = '#' + Math.random().toString(16).substr(-6);
        })

        const patrimonio: Patrimonio = await getManager().query(`select sum(pvm."totalDoPapel") as "value" from papel_variavel_model pvm`);

        const consolidado: ConsolidadoRendaVariavelModel = {
            patrimonioTotal: patrimonio,
            renda: lista
        }

        return Promise.resolve(consolidado);
    }

}

