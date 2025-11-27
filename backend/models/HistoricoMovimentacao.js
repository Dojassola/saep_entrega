import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const HistoricoMovimentacao = sequelize.define('HistoricoMovimentacao', {
  tipo: DataTypes.STRING,
  quantidade: DataTypes.INTEGER,
  data: DataTypes.DATE
});

export default HistoricoMovimentacao;
