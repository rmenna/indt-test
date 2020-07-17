import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiSearch } from 'react-icons/fi';

import api from '../../../services/api';

import './index.css';

export default function Home() {
  const [books, setBooks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [book, setBook] = useState('');
  const [bookSearch, setBookSearch] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.get('/books').then((response) => {
      setBooks(response.data);
    });
  }, [books.valid]);

  function carregarLivros() {
    api.get('/books').then((response) => {
      setBooks(response.data);
    });
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function handleChangeStatus(book) {
    await api.patch(`/book/valid/${book.id}`);
    carregarLivros();
  }

  async function handleSearch(e) {
    e.preventDefault();
    const response = await api.get(`/book/search?name=${bookSearch}`);
    setBooks(response.data);
  }

  return (
    <div className="home-container">
      <header>
        <span> Bem vindo, Visitante</span>
        <button type="button" onClick={handleLogout}>
          <FiPower size="18" color="#99ccff" />
        </button>
      </header>

      <h1>Livros Cadastrados</h1>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
          />
          <button type="submit">
            <FiSearch />
          </button>
        </form>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>Título:</strong>
            <p>{book.name}</p>

            <strong>Autor:</strong>
            <p>{book.autor}</p>

            <strong>ISBN:</strong>
            <p>{book.isbn}</p>

            <div>
              {book.valid === true ? <p>Disponível</p> : <p>Indisponível</p>}
              <input type="checkbox" onClick={() => handleChangeStatus(book)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
