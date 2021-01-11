import { getManager, getRepository } from "typeorm";
import { VariavelAddOrRemovePapelDto } from "../dto/variavel-add-remove.papel.dto";
import { VariavelAlterarPapelDTO } from "../dto/variavel-alterar.papel.dto";
import { VariavelCadastrarPapelDTO } from "../dto/variavel-cadastrar.papel.dto";
import { VariavelDeletarPapelDTO } from "../dto/variavel-deletar.papel.dto";
import { PAPEL_VARIAVEL_TIPO_ENUM } from "../model/enums/papel-variavel-tipo.enum";
import { GraficoQuantidadePapelModel } from "../model/grafico-quantidade-papel.model";
import { PapelVariavelHistoricoModel } from "../model/papel-variavel-historico.model";
import { PapelVariavelModel } from "../model/papel-variavel.model";

export class PapelVariavelService {

    public async savePapel(papelDTO: VariavelCadastrarPapelDTO): Promise<PapelVariavelModel> {

        let papel = new PapelVariavelModel();
        let historicoPapel = new PapelVariavelHistoricoModel();

        papel.tipoPapel = papelDTO.tipoPapel;
        papel.ticket = papelDTO.ticket;
        papel.nome = papelDTO.nome;
        papel.valorAtual = papelDTO.valorAtual;
        papel.variacaoDia = 0;
        papel.qntPapeis = papelDTO.qntPapeis;
        papel.totalDoPapel = papelDTO.totalDoPapel;
        papel.papelCorDeReferencia = papelDTO.papelCorDeReferencia;
        papel.dataCompra = new Date();
        papel.valorJusto = papelDTO.valorJusto;
        papel.porcentagemLucro = 0;
        papel.margemDeQtn = papelDTO.margemDeQtn;
        papel.margemDeQtnDesejado = papelDTO.margemDeQtnDesejado;
        papel.setor = "";
        papel.status = true;

        const responsePapelVariavel = await getRepository(PapelVariavelModel).save(papel);

        historicoPapel.idPapel = responsePapelVariavel.id;
        historicoPapel.isAdd = true;
        historicoPapel.qntPapeis = responsePapelVariavel.qntPapeis;
        historicoPapel.valorAtual = responsePapelVariavel.valorAtual;
        historicoPapel.data = responsePapelVariavel.dataCompra;

        await getRepository(PapelVariavelHistoricoModel).save(historicoPapel);

        return responsePapelVariavel;

    }

    public async addOrRemove(id: number, papelDTO: VariavelAddOrRemovePapelDto): Promise<any> {

        let historicoPapel = new PapelVariavelHistoricoModel();

        getRepository(PapelVariavelModel).findOne(id)
            .then(resultPapelVariavel => {

                if (resultPapelVariavel) {

                    if (papelDTO.isAdd) {

                        resultPapelVariavel.qntPapeis = resultPapelVariavel.qntPapeis + papelDTO.qtn;

                    } else {

                        resultPapelVariavel.qntPapeis = resultPapelVariavel.qntPapeis - papelDTO.qtn;

                    }

                    historicoPapel.idPapel = id;
                    historicoPapel.isAdd = papelDTO.isAdd;
                    historicoPapel.qntPapeis = papelDTO.qtn;
                    historicoPapel.valorAtual = papelDTO.valor;
                    historicoPapel.data = new Date();

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

                    resultPapelVariavel.ticket = papelDTO.ticket ? papelDTO.ticket : resultPapelVariavel.ticket;
                    resultPapelVariavel.nome = papelDTO.nome ? papelDTO.nome : resultPapelVariavel.nome;
                    resultPapelVariavel.valorAtual = papelDTO.valorAtual ? papelDTO.valorAtual : resultPapelVariavel.valorAtual;
                    resultPapelVariavel.variacaoDia = 0;
                    resultPapelVariavel.qntPapeis = papelDTO.qntPapeis ? papelDTO.qntPapeis : resultPapelVariavel.qntPapeis;
                    resultPapelVariavel.papelCorDeReferencia = papelDTO.papelCorDeReferencia ? papelDTO.papelCorDeReferencia : resultPapelVariavel.papelCorDeReferencia;
                    resultPapelVariavel.dataCompra = new Date();
                    resultPapelVariavel.valorJusto = papelDTO.valorJusto ? papelDTO.valorJusto : resultPapelVariavel.valorJusto;
                    resultPapelVariavel.porcentagemLucro = 0;
                    resultPapelVariavel.margemDeQtn = papelDTO.margemDeQtn ? papelDTO.margemDeQtn : resultPapelVariavel.margemDeQtn;
                    resultPapelVariavel.margemDeQtnDesejado = papelDTO.margemDeQtnDesejado ? papelDTO.margemDeQtnDesejado : resultPapelVariavel.margemDeQtnDesejado;
                    resultPapelVariavel.setor = "";
                    resultPapelVariavel.status = true;

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

    }

}

