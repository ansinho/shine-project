const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const id_usuario = request.headers.authorization;

    const anuncios = await connection('tb_anuncios')
    .where('id_usuario', id_usuario)
    .select('*');

    return response.json(anuncios);
  }
}