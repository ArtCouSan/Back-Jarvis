import { getRepository } from "typeorm";
import { FixaAddOrRemovePapelDto } from "../dto/fixa-add-remove.papel.dto";
import { FixaAlterarPapelDTO } from "../dto/fixa-alterar.papel.dto";
import { FixaCadastrarPapelDTO } from "../dto/fixa-cadastrar.papel.dto";
import { FixaDeletarPapelDTO } from "../dto/fixa-deletar.papel.dto";
import { PapelFixaHistoricoModel } from "../model/papel-fixa-historico.model";
import { PapelSelicModel } from "../model/papel-selic.model";

export class PapelFixaService {

    public async savePapel(papelDTO: FixaCadastrarPapelDTO): Promise<PapelSelicModel> {

        let papel = new PapelSelicModel();
        let historicoPapel = new PapelFixaHistoricoModel();

        papel.tipoPapel = papelDTO.tipoPapel;
        papel.ticket = papelDTO.ticket;
        papel.nome = papelDTO.nome;
        papel.valorAtual = papelDTO.valorAtual;
        papel.variacaoDia = 0;
        papel.qntPapeis = papelDTO.qntPapeis;
        papel.totalDoPapel = papelDTO.totalDoPapel;
        papel.papelCorDeReferencia = papelDTO.papelCorDeReferencia;
        papel.dataCompra = new Date();
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

                    } else {

                        resultPapelFixa.qntPapeis = resultPapelFixa.qntPapeis - papelDTO.qtn;

                    }

                    historicoPapel.idPapel = id;
                    historicoPapel.isAdd = papelDTO.isAdd;
                    historicoPapel.qntPapeis = papelDTO.qtn;
                    historicoPapel.valorAtual = papelDTO.valor;
                    historicoPapel.data = new Date();

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
                    resultPapelFixa.variacaoDia = 0;
                    resultPapelFixa.qntPapeis = papelDTO.qntPapeis ? papelDTO.qntPapeis : resultPapelFixa.qntPapeis;
                    resultPapelFixa.papelCorDeReferencia = papelDTO.papelCorDeReferencia ? papelDTO.papelCorDeReferencia : resultPapelFixa.papelCorDeReferencia;
                    resultPapelFixa.dataCompra = new Date();
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

}

