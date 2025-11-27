import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  telefone: DataTypes.STRING
});

export default Cliente;
