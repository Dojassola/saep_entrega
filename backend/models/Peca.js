import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Peca = sequelize.define('Peca', {
  nome: DataTypes.STRING,
  estoque: DataTypes.INTEGER,
  estoqueMinimo: DataTypes.INTEGER
});

export default Peca;
