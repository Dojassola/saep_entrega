import { Cliente } from '../models/associations.js';

export default {
  async listar(req, res) {
    res.json(await Cliente.findAll());
  },
  async criar(req, res) {
    res.json(await Cliente.create(req.body));
  }
};
