import { OrdemServico, Cliente, Veiculo, Peca, OrdemServicoPeca, HistoricoMovimentacao, Funcionario } from '../models/associations.js';

export default {
  async listar(req, res) {
    res.json(await OrdemServico.findAll({ include: [Cliente, Veiculo, Peca, Funcionario] }));
  },
  async criar(req, res) {
    const { descricao, ClienteId, VeiculoId, FuncionarioId } = req.body;
    const ordem = await OrdemServico.create({ descricao, status: 'aberta', ClienteId, VeiculoId, FuncionarioId });
    res.json(ordem);
  },
  async lancarPeca(req, res) {
    const { id } = req.params;
    const { pecaId, quantidade, funcionarioId } = req.body;
    const ordem = await OrdemServico.findByPk(id);
    const peca = await Peca.findByPk(pecaId);
    if (!ordem || !peca) return res.status(404).send();
    if (peca.estoque < quantidade) return res.status(400).json({ erro: 'Estoque insuficiente' });
    await ordem.addPeca(peca, { through: { quantidade } });
    peca.estoque -= quantidade;
    await peca.save();
    await HistoricoMovimentacao.create({
      tipo: 'saida', quantidade, data: new Date(), FuncionarioId: funcionarioId, PecaId: pecaId
    });
    if (peca.estoque <= peca.estoqueMinimo) {
      res.json({ alerta: `${peca.nome} está acabando!`, peca });
    } else {
      res.json({ ok: true });
    }
  }
};
