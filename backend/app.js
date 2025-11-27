import express from 'express';
import cors from 'cors';
import { sequelize } from './models/associations.js';
import funcionariosRouter from './routes/funcionarios.js';
import clientesRouter from './routes/clientes.js';
import veiculosRouter from './routes/veiculos.js';
import pecasRouter from './routes/pecas.js';
import ordensRouter from './routes/ordens.js';
import estoqueRouter from './routes/estoque.js';
import relatoriosRouter from './routes/relatorios.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/funcionarios', funcionariosRouter);
app.use('/clientes', clientesRouter);
app.use('/veiculos', veiculosRouter);
app.use('/pecas', pecasRouter);
app.use('/ordens', ordensRouter);
app.use('/', estoqueRouter);
app.use('/relatorio', relatoriosRouter);
app.use('/alertas', relatoriosRouter);

sequelize.sync({ force: true }).then(() => {
  app.listen(3001, () => console.log('Backend rodando na porta 3001'));
});
