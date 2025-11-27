import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Funcionario = sequelize.define('Funcionario', {
  nome: DataTypes.STRING
});

export default Funcionario;
