const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const AnunciosController = require('./controllers/AnunciosController');
const UsuarioController = require('./controllers/UsuarioController');
const PerfilController = require('./controllers/PerfilController');
const SessaoController = require('./controllers/SessaoController');

const routes = express.Router();

routes.post('/sessions', SessaoController.create);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.create);

routes.get('/perfil', PerfilController.index);

routes.get('/anuncios', AnunciosController.index);
routes.post('/anuncios', AnunciosController.create);
routes.delete('/anuncios/:id', AnunciosController.delete);


module.exports = routes;