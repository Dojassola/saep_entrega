import express from 'express';
import ordemController from '../controllers/ordemController.js';

const router = express.Router();

router.get('/', ordemController.listar);
router.post('/', ordemController.criar);
router.post('/:id/pecas', ordemController.lancarPeca);

export default router;
