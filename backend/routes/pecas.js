import express from 'express';
import pecaController from '../controllers/pecaController.js';
import estoqueController from '../controllers/estoqueController.js';

const router = express.Router();

router.get('/', pecaController.listar);
router.post('/', pecaController.criar);
router.post('/:id/entrada', estoqueController.entrada);

export default router;
