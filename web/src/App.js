import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import world from './assets/images/img3.png'; //world.png';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
require('dotenv').config();

function App() {
  const [devs, setDevs] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editDev, setEditDev] = useState({});

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []); //devs

  async function handleAddDev(data) {
    
    try {
      const response = await api.post('/devs', data);

      setDevs([...devs, response.data]);
      toast.success('Dev cadastrado com sucesso.');
    } catch {
      toast.error('Erro ao cadastrar dev.');
    }
  }

  async function handleRemoveDev(id) {
    try {
      await api.delete(`/devs/${id}`);

      setDevs(devs.filter(dev => dev._id !== id));

      toast('Dev removido com sucesso.');
    } catch {
      toast.error('Erro ao remover esse dev.');
    }
  }

  async function handleUpdateDev(dev) {
    //const { _id, githubUsername, techs } = dev;
    const { _id } = dev;

    try {
      const response = await api.put(`/devs/${_id}`, dev);

      setDevs([...devs, response.data]);
      //setDevs([...devs]);
      setActiveEdit(false);
      toast('Dev alterado com sucesso.');
    } catch {
      toast.error('Erro ao alterar esse dev.');
    }

  }

  async function handleEditDev(dev) {
    setActiveEdit(true);
    setEditDev(dev);
  }

  return (
    <div id="app">
      <aside>
        <div className="register-icon">
          <img src={world} alt={activeEdit ? 'Editar' : 'Cadastrar'} />
        </div>
        <strong>{activeEdit ? 'Editar' : 'Cadastrar'}</strong>
        <DevForm 
          onSubmit={activeEdit ? handleUpdateDev : handleAddDev} 
          editFields={editDev}
        />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              key={dev._id} 
              dev={dev} 
              onDelete={handleRemoveDev}
              onEdit={handleEditDev}
            />
          ))}
        </ul>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
