import express from 'express';
import funcionarioController from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/', funcionarioController.listar);
router.post('/', funcionarioController.criar);

export default router;
