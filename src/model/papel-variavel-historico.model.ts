import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class PapelVariavelHistoricoModel {

    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idPapel: number;

    @Column("decimal", { precision: 10, scale: 2 })
    valorAtual: number;

    @Column()
    qntPapeis: number;

    @Column()
    data: string;

    @Column()
    isAdd: boolean;

}
