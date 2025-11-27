import { Peca } from '../models/associations.js';

export default {
  async listar(req, res) {
    res.json(await Peca.findAll());
  },
  async criar(req, res) {
    res.json(await Peca.create(req.body));
  }
};
