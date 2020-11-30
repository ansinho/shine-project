import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';

import './styles.css';

import api from '../../service/api'

import logoImg from '../../images/joystick.svg';
import logoWapp from '../../images/whatsapp.svg';

function SearchGame() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    api.get('anuncios').then(response => {
      setAnuncios(response.data);
    });
  }, []);

  return (
    <div id="container-search">
      <header>
        <div className="header">
          <div className="logo">
            <img src={logoImg} className="imgLogo" alt="Shine" />
            <h2>shine</h2>

          </div>

          <div>
            <Link className="btn-back" to="/"><FiArrowLeft size={25} className="arrow"></FiArrowLeft>Voltar</Link>
          </div>
        </div>
      </header>

      <main>
        <div className="header-main">
          <h1>Busque jogos e entre<br /> em contato para realizar troca</h1>
          <div className="form-option">
            <input type="text" placeholder="Busque pelo nome do jogo" />
            <button><FiSearch size={18} color="#fff"></FiSearch></button>
          </div>
        </div>

        <ul>
          {anuncios.map(anuncio => (
            <li key={anuncio.id}>
              <div className="header-anuncio">
                <div className="name-game">
                  <h1>{anuncio.nome_jogo}</h1>
                  <p>{anuncio.plataforma}</p>
                </div>
                <div className="info-game">
                  <h1>{anuncio.nome}</h1>
                  <span>
                    <p>{anuncio.cidade} - </p> <p>{anuncio.estado}</p>
                  </span>
                </div>
              </div>
              <div className="box-img">
                <img src={anuncio.imagem} alt="jogo" />
              </div>
              <span><strong>Descrição</strong></span>
              <p>{anuncio.descricao}</p>
              <span><strong>Jogos requisitados:</strong></span>
              <p>{anuncio.jogo_troca}</p>
              <a href={`https://api.whatsapp.com/send/?phone=55${anuncio.whatsapp}&text&app_absent=0`}> <img src={logoWapp} /> Entrar em contato</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default SearchGame;