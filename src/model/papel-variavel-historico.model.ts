import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class PapelVariavelHistoricoModel {

    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idPapel: number;

    @Column()
    valorAtual: number;

    @Column()
    qntPapeis: number;

    @Column()
    data: Date;

    @Column()
    isAdd: boolean;

}
