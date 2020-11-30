const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const usuarios = await connection('tb_usuarios').select('*');
    
    return response.json(usuarios);
  },


  async create(request, response) {
    const { nome, email, cidade, estado, whatsapp } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('tb_usuarios').insert({
      id,
      nome,
      email,
      cidade,
      estado,
      whatsapp,
    })

    return response.json({id});
  }
};