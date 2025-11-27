import express from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = express.Router();

router.get('/cliente/:id', relatorioController.porCliente);
router.get('/veiculo/:id', relatorioController.porVeiculo);
router.get('/revisoes', relatorioController.alertasRevisao);

export default router;
