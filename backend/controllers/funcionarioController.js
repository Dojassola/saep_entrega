import { Funcionario } from '../models/associations.js';

export default {
  async listar(req, res) {
    res.json(await Funcionario.findAll());
  },
  async criar(req, res) {
    res.json(await Funcionario.create(req.body));
  }
};
