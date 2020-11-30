import React, { useState } from 'react';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Modal from '../../components/Modal/index';

import './index.css';

import logoImg from '../../images/joystick.svg';

function Landing() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div id="container">
      <div className="content">
        <header>
          <div className="logo">
            <img src={logoImg} className="imgLogo" alt="Shine" />
            <h2>shine</h2>
          </div>

          <div className="cadastro">
            <FiLogIn size={26}></FiLogIn>
            <a href="#" onClick={() => setShowModal(true)} >anunciar jogos</a>
            {showModal ? (
              <Modal onClose={() => {setShowModal(false)}}/>
              ) : null}
          </div>

        </header>

        <main>
          <h1>Sua vez de jogar!</h1>
          <p>Troque seus jogos e experimente uma nova aventura</p>
        </main>

        <div className="search-button">
          <span><FiSearch size={35}></FiSearch></span><Link to="/search"><button type="button">Pesquisar jogos</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;