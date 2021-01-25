import { Request, Response } from "express";
import { RendasService } from "../services/rendas.service";

const rendasService = new RendasService();

export class RendasController {

    public consolidado = (req: Request, res: Response) => {
        rendasService.consolidadoRendas()
            .then(result => {
                res.status(201).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
    }

}