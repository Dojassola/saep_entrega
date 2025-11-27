import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const OrdemServico = sequelize.define('OrdemServico', {
  descricao: DataTypes.STRING,
  status: DataTypes.STRING // aberta, finalizada
});

export default OrdemServico;
