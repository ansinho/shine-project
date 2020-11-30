import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import api from '../../service/api';

import './style.css';

const Modal = ({ onClose = () => { } }) => {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('id', id);
      localStorage.setItem('nome', response.data.nome);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login! Por favor, verifique se o campo foi preenchido ou se seu código está correto.');
    }
  }

  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      nome,
      cidade,
      estado,
      whatsapp,
      email,
    };

    try {
      const response = await api.post('usuarios', data);

      alert(`Seu código de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div id="modal">
      <div className="container">
        <span onClick={onClose}><FiX size={32} color="#000"></FiX></span>
        <div className="content-form">
          <Tabs>
            <TabList>
              <Tab>Entrar</Tab>
              <Tab>Cadastre-se</Tab>
            </TabList>

            <TabPanel>
              <form onSubmit={handleLogin}>
                <h1>Entre na sua conta!</h1>

                <div className="input-form">
                  <input
                    placeholder="Insira o seu código"
                    value={id}
                    onChange={e => setId(e.target.value)}
                  />
                  <p>Caso não possua um código, utilize <strong>criar conta</strong> para gerar.</p>
                  <p>Se perdeu seu código,<a href="#">clique aqui</a> para recupera-lo.</p>
                </div>
                <button type="submit">Entrar</button>
              </form>
            </TabPanel>

            <TabPanel>
              <form onSubmit={handleRegister}>
                <h1>Crie sua conta!</h1>

                <div className="input-form">
                  <input
                    type="text"
                    required
                    placeholder="nome e sobrenome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />

                  <div className="input-group">
                    <input
                      required
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input
                      required
                      type="text"
                      placeholder="whatsapp"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      required
                      type="text"
                      placeholder="cidade"
                      value={cidade}
                      onChange={e => setCidade(e.target.value)}
                    />
                    <input
                      required
                      type="text"
                      placeholder="estado"
                      value={estado}
                      onChange={e => setEstado(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btn-cad">
                  <button type="submit">Cadastrar</button>
                </div>
              </form>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Modal;