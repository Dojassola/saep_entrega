import { Peca, HistoricoMovimentacao, Funcionario } from '../models/associations.js';

export default {
  async entrada(req, res) {
    const { id } = req.params;
    const { quantidade, funcionarioId } = req.body;
    const peca = await Peca.findByPk(id);
    if (!peca) return res.status(404).send();
    peca.estoque += Number(quantidade);
    await peca.save();
    await HistoricoMovimentacao.create({
      tipo: 'entrada', quantidade, data: new Date(), FuncionarioId: funcionarioId, PecaId: id
    });
    res.json({ ok: true });
  },
  async historico(req, res) {
    res.json(await HistoricoMovimentacao.findAll({ include: [Funcionario, Peca] }));
  }
};
