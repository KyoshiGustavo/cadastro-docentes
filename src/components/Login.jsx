import React from 'react';

export default function Login({ onLogin }) {
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center mb-4">Acesso ao Sistema</h3>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input type="text" className="form-control" defaultValue="admin" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" defaultValue="123456" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}