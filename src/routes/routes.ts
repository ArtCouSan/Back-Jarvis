import express from "express";
import { routeRendaVariavel } from './financeiro/renda-variavel.routing';
import swaggerUi from 'swagger-ui-express';
import swagger from '../config/swagger.json';
const router = express.Router();

// Financeiro
router.use('/v1/financeiro/renda-variavel', routeRendaVariavel);

router.use('/v1/api-docs', swaggerUi.serve);
router.get('/v1/api-docs', swaggerUi.setup(swagger));

export const routes = router;