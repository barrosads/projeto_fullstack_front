import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './fornecedor.css';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/clientes', formData);
      alert('Cliente cadastrado com sucesso!');
      console.log(response.data); // Exibe a resposta da API
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error.response ? error.response.data : error.message);
      alert(`Erro ao cadastrar cliente: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h1 className="tituloform">Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="botoes">
          <button type="submit">Cadastrar Cliente</button>
          <Link className="linkform" to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
