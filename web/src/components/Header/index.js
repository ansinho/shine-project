import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../images/joystick.svg';

function Header(props) {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }
  
  return (
    <header>
      <div className="header">
        <div className="logo">
          <img src={logoImg} className="imgLogo" alt="Shine" />
          <h2>shine</h2>

        </div>

        <div className="header-options">
          <Link className="btn-new" to={props.linkPage}>{props.title}</Link>
          <button type="button" onClick={handleLogout}>
            <FiPower size={24} color="#FF0066" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;