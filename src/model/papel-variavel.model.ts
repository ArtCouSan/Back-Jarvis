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

    @Column("decimal", { precision: 10, scale: 2 })
    valorAtual: number;

    @Column()
    variacaoDia: string;

    @Column()
    qntPapeis: number;

    @Column("decimal", { precision: 10, scale: 2 })
    totalDoPapel: number;

    @Column()
    papelCorDeReferencia: string;

    @Column()
    dataCompra: string;

    @Column("decimal", { precision: 10, scale: 2 })
    valorJusto: number;

    @Column("decimal", { precision: 10, scale: 2 })
    porcentagemLucro: number;

    @Column("decimal", { precision: 10, scale: 2 })
    margemDeQtn: number;

    @Column("decimal", { precision: 10, scale: 2 })
    margemDeQtnDesejado: number;

    @Column()
    setor: string;

    @Column()
    status: boolean;

}
