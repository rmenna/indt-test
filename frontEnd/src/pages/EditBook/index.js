import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './index.css';

export default function NewBook() {
  const {
    location: { state },
  } = useHistory();

  const history = useHistory();

  const [name, setName] = useState('');
  const [autor, setAutor] = useState('');
  const [id, setId] = useState('');
  const [isbn, setIsbn] = useState('');

  useEffect(() => {
    const { id, name, autor, isbn } = state;
    setId(id);
    setName(name);
    setAutor(autor);
    setIsbn(isbn);
  }, [state]);

  async function handleCreateBook(e) {
    e.preventDefault();

    const book = { id, name, autor, isbn };

    await api.put('/book', book);

    alert('Livro Atualizdo com sucessos!!');
    history.push('/homeAdministrador');
  }

  return (
    <div className="form-container">
      <header>
        <h1>Editar dados do livro</h1>

        <Link to="/homeAdministrador">
          <FiArrowLeft size={16} color="#99ccff" />
          Voltar
        </Link>
      </header>

      <form onSubmit={handleCreateBook}>
        <input value={id} onChange={(e) => setAutor(e.target.value)} hidden />
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
