import { OrdemServico, Cliente, Veiculo, Peca } from '../models/associations.js';

export default {
  async porCliente(req, res) {
    const { id } = req.params;
    const ordens = await OrdemServico.findAll({
      where: { ClienteId: id },
      include: [Veiculo, Peca]
    });
    res.json(ordens);
  },
  async porVeiculo(req, res) {
    const { id } = req.params;
    const ordens = await OrdemServico.findAll({
      where: { VeiculoId: id },
      include: [Cliente, Peca]
    });
    res.json(ordens);
  },
  async alertasRevisao(req, res) {
    const ordens = await OrdemServico.findAll({ where: { status: 'aberta' }, include: [Cliente, Veiculo] });
    res.json(ordens);
  }
};
