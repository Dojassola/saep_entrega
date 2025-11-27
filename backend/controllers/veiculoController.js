import { Veiculo, Cliente } from '../models/associations.js';

export default {
  async listar(req, res) {
    res.json(await Veiculo.findAll({ include: Cliente }));
  },
  async criar(req, res) {
    res.json(await Veiculo.create(req.body));
  }
};
