import express from "express";
import { PapelFixaController } from "../../controllers/papel-fixa.controller";

const papelFixaController = new PapelFixaController();

const router = express.Router();

router.post('/', papelFixaController.savePapel);

router.post('/deletar/:id', papelFixaController.deletePapel);

router.post('/:id', papelFixaController.addOrRemovePapel);

router.put('/:id', papelFixaController.atualizarPapel);

router.get('/consolidado', papelFixaController.consolidado);

router.get('/consolidado/selic', papelFixaController.consolidadoSelic);

export const routeFixaVariavel = router;