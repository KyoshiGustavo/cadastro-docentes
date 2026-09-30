import React, { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import DocenteForm from './components/DocenteForm';
import ListDocentes from './components/ListDocentes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('welcome');
  const [docenteToEdit, setDocenteToEdit] = useState(null);
  
  // Estado global com lista inicial de exemplo
  const [docentes, setDocentes] = useState([
    {
      id: 1,
      nome: 'Adriano Alvares',
      cpf: '123.456.789-00',
      formacao: 'Doutorado em Ciência da Computação',
      emailInst: 'Adriano.alvares@senaisp.edu.br',
      emailPart: 'adriano.alvares@gmail.com',
      celular: '(11) 98765-4321',
      endereco: 'Candido Padim',
      numero: '25',
      cidade: 'São Paulo',
      cep: '01000-000',
      uf: 'SP'
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveScreen('welcome');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDocenteToEdit(null);
  };

  // Create & Update
  const handleSaveDocente = (docente) => {
    if (docenteToEdit) {
      setDocentes(docentes.map(d => d.id === docente.id ? docente : d));
      setDocenteToEdit(null);
    } else {
      setDocentes([...docentes, docente]);
    }
    setActiveScreen('list');
  };

  // Prepara docente para alteração
  const handleEditDocente = (docente) => {
    setDocenteToEdit(docente);
    setActiveScreen('form');
  };

  // Delete usando .filter()
  const handleDeleteDocente = (id) => {
    if (window.confirm('Tem certeza que deseja remover este docente?')) {
      setDocentes(docentes.filter(d => d.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setDocenteToEdit(null);
    setActiveScreen('list');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Menu 
        setActiveScreen={(screen) => {
          if (screen !== 'form') setDocenteToEdit(null);
          setActiveScreen(screen);
        }} 
        activeScreen={activeScreen}
        onLogout={handleLogout}
      />

      <main>
        {activeScreen === 'welcome' && <Welcome setActiveScreen={setActiveScreen} />}
        
        {activeScreen === 'form' && (
          <DocenteForm 
            onSaveDocente={handleSaveDocente} 
            docenteToEdit={docenteToEdit} 
            cancelEdit={handleCancelEdit}
          />
        )}

        {activeScreen === 'list' && (
          <ListDocentes 
            docentes={docentes} 
            onEditDocente={handleEditDocente} 
            onDeleteDocente={handleDeleteDocente} 
            setActiveScreen={setActiveScreen}
          />
        )}
      </main>
    </div>
  );
}