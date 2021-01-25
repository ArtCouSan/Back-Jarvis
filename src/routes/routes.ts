import express from "express";
import swaggerUi from 'swagger-ui-express';
import swagger from '../config/swagger.json';
import { routeFixaVariavel } from './financeiro/renda-fixa.routing';
import { routeRendaVariavel } from './financeiro/renda-variavel.routing';
import { routeRendas } from "./financeiro/rendas.routing";
const router = express.Router();

// Financeiro
router.use('/v1/financeiro/renda/variavel', routeRendaVariavel);
router.use('/v1/financeiro/renda/fixa', routeFixaVariavel);
router.use('/v1/financeiro/renda/geral', routeRendas);

router.use('/v1/api-docs', swaggerUi.serve);
router.get('/v1/api-docs', swaggerUi.setup(swagger));

export const routes = router;