import sequelize from './index.js';
import Funcionario from './Funcionario.js';
import Cliente from './Cliente.js';
import Veiculo from './Veiculo.js';
import Peca from './Peca.js';
import OrdemServico from './OrdemServico.js';
import OrdemServicoPeca from './OrdemServicoPeca.js';
import HistoricoMovimentacao from './HistoricoMovimentacao.js';

Cliente.hasMany(Veiculo);
Veiculo.belongsTo(Cliente);

Cliente.hasMany(OrdemServico);
OrdemServico.belongsTo(Cliente);

Veiculo.hasMany(OrdemServico);
OrdemServico.belongsTo(Veiculo);

Funcionario.hasMany(HistoricoMovimentacao);
HistoricoMovimentacao.belongsTo(Funcionario);

Peca.hasMany(HistoricoMovimentacao);
HistoricoMovimentacao.belongsTo(Peca);

OrdemServico.belongsToMany(Peca, { through: OrdemServicoPeca });
Peca.belongsToMany(OrdemServico, { through: OrdemServicoPeca });

Funcionario.hasMany(OrdemServico);
OrdemServico.belongsTo(Funcionario);

export {
  sequelize,
  Funcionario,
  Cliente,
  Veiculo,
  Peca,
  OrdemServico,
  OrdemServicoPeca,
  HistoricoMovimentacao
};
