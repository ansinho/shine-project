import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header/index';

import api from '../../service/api';

import './styles.css';

function Annoucement() {
  const [nome_jogo, setJogo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [jogo_troca, setJogoTroca] = useState('');

  const history = useHistory();

  const id = localStorage.getItem('id');

  async function handleNewAnuncio(e) {
    e.preventDefault();

    const data = {
      nome_jogo,
      plataforma,
      descricao,
      imagem,
      jogo_troca,
    };

    try {
      await api.post('anuncios', data, {
        headers: {
          Authorization: id,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('erro ao cadastrar anuncio, tente novamente.')
    }
  }

  return (
    <div className="new-container">
      <Header title="Meus anúcios" linkPage="/profile" />
      <div className="content">
        <h1>Cadastrar um novo jogo</h1>

        <form onSubmit={handleNewAnuncio}>
          <div className="input-group">
            <input
              required
              placeholder="Título"
              value={nome_jogo}
              onChange={e => setJogo(e.target.value)}
            />
            <input
              required
              className="input-plataforma"
              placeholder="plataforma"
              value={plataforma}
              onChange={e => setPlataforma(e.target.value)}
            />
          </div>

          <textarea
            required
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />

          <div className="input-image">
            <p>Adicionar foto</p>
            <input
              required
              placeholder="Cole aqui o endereço da imagem"
              value={imagem}
              onChange={e => setImagem(e.target.value)}
            />
          </div>

          <textarea
            required
            placeholder="Jogos requisitados para troca"
            value={jogo_troca}
            onChange={e => setJogoTroca(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}

export default Annoucement;