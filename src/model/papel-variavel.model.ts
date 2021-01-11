import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class PapelVariavelModel {

    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoPapel: string;

    @Column()
    ticket: string;

    @Column()
    nome: string;

    @Column()
    valorAtual: number;

    @Column()
    variacaoDia: number;

    @Column()
    qntPapeis: number;

    @Column()
    totalDoPapel: number;

    @Column()
    papelCorDeReferencia: string;

    @Column()
    dataCompra: Date;

    @Column()
    valorJusto: number;

    @Column()
    porcentagemLucro: number;

    @Column()
    margemDeQtn: number;

    @Column()
    margemDeQtnDesejado: number;

    @Column()
    setor: string;

    @Column()
    status: boolean;

}
