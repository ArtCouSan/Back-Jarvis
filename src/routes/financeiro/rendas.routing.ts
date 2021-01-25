import express from "express";
import { RendasController } from "../../controllers/rendas.controller";

const rendasController = new RendasController();

const router = express.Router();

router.get('/consolidado', rendasController.consolidado);

export const routeRendas = router;