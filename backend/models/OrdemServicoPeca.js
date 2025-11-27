import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const OrdemServicoPeca = sequelize.define('OrdemServicoPeca', {
  quantidade: DataTypes.INTEGER
});

export default OrdemServicoPeca;
