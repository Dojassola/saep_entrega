import express from 'express';
import estoqueController from '../controllers/estoqueController.js';

const router = express.Router();

router.get('/historico', estoqueController.historico);

export default router;
