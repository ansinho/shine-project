const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const anuncio = await connection('tb_anuncios')
      .join('tb_usuarios', 'tb_usuarios.id', '=', 'tb_anuncios.id_usuario')
      .select([
        'tb_anuncios.*',
        'tb_usuarios.nome',
        'tb_usuarios.cidade',
        'tb_usuarios.estado',
        'tb_usuarios.whatsapp'
      ]);

    return response.json(anuncio);
  },

  async create(request, response) {
    const { nome_jogo, plataforma, descricao, imagem, jogo_troca } = request.body;
    const id_usuario = request.headers.authorization;

    const [id] = await connection('tb_anuncios').insert({
      nome_jogo,
      plataforma,
      descricao,
      imagem,
      jogo_troca,
      id_usuario
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const id_usuario = request.headers.authorization;

    const anuncio = await connection('tb_anuncios')
      .where('id', id)
      .select('id_usuario')
      .first();

    if (anuncio.id_usuario != id_usuario) {
      return response.status(401).json({ error: 'Operação não permitida.' });
    }
    else {
      await connection('tb_anuncios').where('id', id).delete();

      return response.status(204).json({ message: 'Anuncio deletado com sucesso.' });
    }
  }
}