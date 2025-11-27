import { Funcionario } from '../models/associations.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'oficina_secret';

export default {
  async listar(req, res) {
    res.json(await Funcionario.findAll({ attributes: ['id', 'nome'] }));
  },
  async criar(req, res) {
    const { nome, senha } = req.body;
    const hash = await bcrypt.hash(senha, 8);
    const funcionario = await Funcionario.create({ nome, senha: hash });
    res.json({ id: funcionario.id, nome: funcionario.nome });
  },
  async login(req, res) {
    const { nome, senha } = req.body;
    const funcionario = await Funcionario.findOne({ where: { nome } });
    if (!funcionario) return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    const ok = await bcrypt.compare(senha, funcionario.senha);
    if (!ok) return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    const token = jwt.sign({ id: funcionario.id, nome: funcionario.nome }, SECRET, { expiresIn: '1h' });
    res.json({ token, nome: funcionario.nome, id: funcionario.id });
  }
};
