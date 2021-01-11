import { Request, Response } from "express";
import { VariavelAddOrRemovePapelDto } from "../dto/variavel-add-remove.papel.dto";
import { VariavelAlterarPapelDTO } from "../dto/variavel-alterar.papel.dto";
import { VariavelCadastrarPapelDTO } from "../dto/variavel-cadastrar.papel.dto";
import { VariavelDeletarPapelDTO } from "../dto/variavel-deletar.papel.dto";
import { PapelVariavelService } from "../services/papel-variavel.service";

const papelVariavelService = new PapelVariavelService();

export class PapelVariavelController {

    public savePapel = (req: Request, res: Response) => {
        const papelDTO = req.body as VariavelCadastrarPapelDTO;
        papelVariavelService.savePapel(papelDTO)
        .then(result => {
            res.status(201).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    public addOrRemovePapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as VariavelAddOrRemovePapelDto;
        papelVariavelService.addOrRemove(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    public deletePapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as VariavelDeletarPapelDTO;
        papelVariavelService.deletePapel(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    public atualizarPapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as VariavelAlterarPapelDTO;
        papelVariavelService.alterarPapel(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });   
    }

    public consolidadoFiis = async (req: Request, res: Response) => {
        papelVariavelService.consolidadoFiis()
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });   
    }

}

