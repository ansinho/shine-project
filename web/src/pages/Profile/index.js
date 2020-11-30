import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'

import Header from '../../components/Header/index';

import api from '../../service/api';

import './styles.css';

function Profile() {
  const [anuncios, setAnuncios] = useState([]);

  const history = useHistory();

  const usuarioId = localStorage.getItem('id');
  const nome = localStorage.getItem('nome');

  useEffect(() => {
    api.get('perfil', {
      headers: {
        Authorization: usuarioId,
      }
    }).then(response => {
      setAnuncios(response.data);
    })
  }, [usuarioId]);

  async function handleDeleteAnuncio(id) {
    try {
      await api.delete(`anuncios/${id}`, {
        headers: {
          Authorization: usuarioId,
        }
      })

      setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  return (
    <div className="profile-container">
      <Header title="Anunciar um jogo" linkPage="new" />
      <main>
        <div className="content-main">
          <h1>Meus anúncios</h1>

          <ul>
            {anuncios.map(anuncio => (
              <li key={anuncio.id}>
                <div className="header-anuncio">
                  <div className="name-game">
                    <h1>{anuncio.nome_jogo}</h1>
                    <p>{anuncio.plataforma}</p>
                  </div>
                  <FiTrash2 onClick={() => handleDeleteAnuncio(anuncio.id)} size={30} color="#B7B3B5" className="btn-excluir" />
                </div>
                <div className="box-img">
                  <img src={anuncio.imagem} alt="jogo" />
                </div>
                <span><strong>Descrição</strong></span>
                <p>{anuncio.descricao}</p>
                <span><strong>Jogos requisitados:</strong></span>
                <p>{anuncio.jogo_troca}</p>
              </li>
            ))}
          </ul>

        </div>

      </main>
    </div>
  )
}

export default Profile;