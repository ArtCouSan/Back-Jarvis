import express from "express";
import { PapelFixaController } from "../../controllers/papel-fixa.controller";

const papelFixaController = new PapelFixaController();

const router = express.Router();

router.post('/', papelFixaController.savePapel);

router.post('/:id', papelFixaController.addOrRemovePapel);

router.delete('/:id', papelFixaController.deletePapel);

router.put('/:id', papelFixaController.atualizarPapel);

export const routeFixaVariavel = router;