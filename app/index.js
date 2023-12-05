const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'testando123';

const users = [];

app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
    const token = (req.header('Authorization') || '').split(' ')[1];  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });
    req.user = user;
    next();
  });
};

app.post('/signup', (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ mensagem: 'E-mail já existente' });

  const hashedPassword = bcrypt.hashSync(senha, 10);
  const newUser = {
    id: uuid.v4(),
    nome,
    email,
    senha: hashedPassword,
    telefone,
    data_criacao: new Date(),
    data_atualizacao: new Date(),
    ultimo_login: null
  };

  users.push(newUser);

  const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '30m' });

  res.status(201).json({
    id: newUser.id,
    nome: newUser.nome,
    email: newUser.email,
    telefone: newUser.telefone,
    data_criacao: newUser.data_criacao,
    data_atualizacao: newUser.data_atualizacao,
    ultimo_login: newUser.ultimo_login,
    token
  });
});

app.post('/signin', (req, res) => {
  const { email, senha } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '30m' });
  user.ultimo_login = new Date();

  res.json({
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    data_criacao: user.data_criacao,
    data_atualizacao: user.data_atualizacao,
    ultimo_login: user.ultimo_login,
    token
  });
});

app.get('/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

  res.json({
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    data_criacao: user.data_criacao,
    data_atualizacao: user.data_atualizacao,
    ultimo_login: user.ultimo_login
  });
});

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}