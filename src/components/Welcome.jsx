import React from 'react';

export default function Welcome({ setActiveScreen }) {
  return (
    <div className="container text-center py-5">
      <h1 className="display-5 fw-bold">Bem-vindo à Gestão Acadêmica</h1>
      <p className="lead text-muted">
        Utilize o menu acima para gerenciar o cadastro do quadro de docentes da instituição.
      </p>
      <div className="mt-4">
        <button className="btn btn-primary btn-lg me-3" onClick={() => setActiveScreen('list')}>
          Ver Docentes Cadastrados
        </button>
        <button className="btn btn-success btn-lg" onClick={() => setActiveScreen('form')}>
          Cadastrar Novo Docente
        </button>
      </div>
    </div>
  );
}