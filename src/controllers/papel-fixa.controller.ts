import { Request, Response } from "express";
import { FixaAddOrRemovePapelDto } from "../dto/fixa-add-remove.papel.dto";
import { FixaAlterarPapelDTO } from "../dto/fixa-alterar.papel.dto";
import { FixaCadastrarPapelDTO } from "../dto/fixa-cadastrar.papel.dto";
import { FixaDeletarPapelDTO } from "../dto/fixa-deletar.papel.dto";
import { PapelFixaService } from "../services/papel-fixa.service";

const papelFixaService = new PapelFixaService();

export class PapelFixaController {

    public savePapel = (req: Request, res: Response) => {
        const papelDTO = req.body as FixaCadastrarPapelDTO;
        papelFixaService.savePapel(papelDTO)
        .then(result => {
            res.status(201).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    public addOrRemovePapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as FixaAddOrRemovePapelDto;
        papelFixaService.addOrRemove(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    public deletePapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as FixaDeletarPapelDTO;
        papelFixaService.deletePapel(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });
    }
    
    atualizarPapel = async (req: Request, res: Response) => {
        const papelDTO = req.body as FixaAlterarPapelDTO;
        papelFixaService.alterarPapel(req.params.id, papelDTO)
        .then(result => {
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json(error);
        });   
    }

}

