import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Veiculo = sequelize.define('Veiculo', {
  placa: DataTypes.STRING,
  modelo: DataTypes.STRING,
  ano: DataTypes.INTEGER
});

export default Veiculo;
