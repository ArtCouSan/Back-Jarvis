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

    @Column("decimal", { precision: 10, scale: 2 })
    valorAtual: number;

    @Column()
    qntPapeis: number;

    @Column("decimal", { precision: 10, scale: 2 })
    totalDoPapel: number;

    @Column()
    papelCorDeReferencia: string;

    @Column()
    dataCompra: string;

    @Column()
    status: boolean;
}