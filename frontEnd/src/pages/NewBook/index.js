import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './index.css';

export default function NewBook() {
  const [name, setName] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');

  const history = useHistory();

  async function handleCreateBook(e) {
    e.preventDefault();

    const book = { name, autor, isbn };

    await api.post('/book', book);

    alert('Livro Cadastrado com sucessos!');
    history.push('/homeAdministrador');
  }

  return (
    <div className="form-container">
      <header>
        <h1>Cadastrar novo livro</h1>

        <Link to="/homeAdministrador">
          <FiArrowLeft size={16} color="#99ccff" />
          Voltar
        </Link>
      </header>

      <form onSubmit={handleCreateBook}>
        <input
          placeholder="Título do Livro"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Autor do Livro"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          placeholder="ISBN do Livro"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
