import express from "express";
import { PapelVariavelController } from "../../controllers/papel-variavel.controller";

const papelVariavelController = new PapelVariavelController();

const router = express.Router();

router.post('/', papelVariavelController.savePapel);

router.post('/:id', papelVariavelController.addOrRemovePapel);

router.post('/deletar/:id', papelVariavelController.deletePapel);

router.put('/:id', papelVariavelController.atualizarPapel);

router.get('/consolidado', papelVariavelController.consolidado);

router.get('/consolidado/fiis', papelVariavelController.consolidadoFiis);

router.get('/consolidado/acoes', papelVariavelController.consolidadoAcoes);

export const routeRendaVariavel = router;