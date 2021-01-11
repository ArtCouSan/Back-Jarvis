import express from "express";
import { PapelVariavelController } from "../../controllers/papel-variavel.controller";

const papelVariavelController = new PapelVariavelController();

const router = express.Router();

router.post('/', papelVariavelController.savePapel);

router.post('/:id', papelVariavelController.addOrRemovePapel);

router.delete('/:id', papelVariavelController.deletePapel);

router.put('/:id', papelVariavelController.atualizarPapel);

router.get('/consolidado', (req, res) => {
    res.send("Öi");
});

router.get('/consolidado/fiis', papelVariavelController.consolidadoFiis);

router.get('/consolidado/acoes', (req, res) => {
    res.send("Öi");
});

export const routeRendaVariavel = router;