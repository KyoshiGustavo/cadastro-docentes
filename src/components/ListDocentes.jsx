import React from 'react';

export default function ListDocentes({ docentes, onEditDocente, onDeleteDocente, setActiveScreen }) {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Docentes Cadastrados</h2>
        <button className="btn btn-success" onClick={() => setActiveScreen('form')}>
          + Novo Docente
        </button>
      </div>

      {docentes.length === 0 ? (
        <div className="alert alert-info text-center">Nenhum docente cadastrado até o momento.</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Formação</th>
                <th>Email Institucional</th>
                <th>Celular</th>
                <th>UF</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente) => (
                <tr key={docente.id}>
                  <td>{docente.nome}</td>
                  <td>{docente.formacao}</td>
                  <td>{docente.emailInst}</td>
                  <td>{docente.celular}</td>
                  <td>{docente.uf}</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-warning btn-sm me-2" 
                      onClick={() => onEditDocente(docente)}
                    >
                      Alterar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => onDeleteDocente(docente.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}