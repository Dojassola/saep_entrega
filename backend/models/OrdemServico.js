import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const OrdemServico = sequelize.define('OrdemServico', {
  descricao: DataTypes.STRING,
  status: DataTypes.STRING, // aberta, finalizada
  FuncionarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Funcionarios', // Nome da tabela referenciada
      key: 'id' // Chave da tabela referenciada
    }
  }
});

export default OrdemServico;
