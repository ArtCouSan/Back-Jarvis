import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class PapelSelicModel {

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
    status: boolean;
}