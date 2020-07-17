import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';

export default function Logon() {
  const [user, setUser] = useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem('user', user);
    console.log(user);
    // if (user === 'Administrador') {
    history.push('/homeAdministrador');
    // } else {
    //   history.push('/homeVisitante');
    // }
  }

  function handleChange(e) {
    e.preventDefault();
    setUser(e.target.value);
  }

  return (
    <div className="logon-container">
      <section className="formLogon">
        <form onSubmit={handleSubmit}>
          <h1>Selecione seu Usuário</h1>
          <select onChange={handleChange} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>
              Select your option
            </option>
            <option value="Administrador">Administrador</option>
            <option value="Visitante">Visitante</option>
          </select>

          <button type="submit">Entrar</button>
        </form>
      </section>
    </div>
  );
}
