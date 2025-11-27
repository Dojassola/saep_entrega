import express from 'express';
import funcionarioController from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/', funcionarioController.listar);
router.post('/', funcionarioController.criar);
router.post('/login', funcionarioController.login);

export default router;
