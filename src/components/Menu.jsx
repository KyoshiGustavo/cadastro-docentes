import React from 'react';

export default function Menu({ setActiveScreen, activeScreen, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 px-3">
      <span className="navbar-brand font-weight-bold">Cadastro de Docentes</span>
      <div className="navbar-nav me-auto">
        <button 
          className={`btn nav-link text-white me-2 ${activeScreen === 'welcome' ? 'fw-bold text-decoration-underline' : ''}`}
          onClick={() => setActiveScreen('welcome')}
        >
          Início
        </button>
        <button 
          className={`btn nav-link text-white me-2 ${activeScreen === 'list' ? 'fw-bold text-decoration-underline' : ''}`}
          onClick={() => setActiveScreen('list')}
        >
          Listar
        </button>
        <button 
          className={`btn nav-link text-white me-2 ${activeScreen === 'form' ? 'fw-bold text-decoration-underline' : ''}`}
          onClick={() => setActiveScreen('form')}
        >
          Cadastrar
        </button>
      </div>
      <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
        Sair
      </button>
    </nav>
  );
}