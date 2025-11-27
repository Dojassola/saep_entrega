import express from 'express';
import clienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);

export default router;
