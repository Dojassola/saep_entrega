import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Funcionario = sequelize.define('Funcionario', {
  nome: DataTypes.STRING,
  senha: DataTypes.STRING
});

export default Funcionario;
