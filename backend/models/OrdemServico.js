import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const OrdemServico = sequelize.define('OrdemServico', {
  descricao: DataTypes.STRING,
  status: DataTypes.STRING,
  FuncionarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Funcionarios',
      key: 'id'
    }
  }
});

export default OrdemServico;
