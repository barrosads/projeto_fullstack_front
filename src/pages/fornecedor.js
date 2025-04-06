import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './fornecedor.css';
const CadastroFornecedor = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/fornecedores', formData);
      alert('Fornecedor cadastrado com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error.response ? error.response.data : error.message);
      alert(`Erro ao cadastrar fornecedor: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
    <h1 className="tituloform">Cadastrar Fornecedor</h1>
      <label>Nome:
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </label>
      <label>CNPJ:
        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required />
      </label>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>Telefone:
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </label>
      <button type="submit">Cadastrar Fornecedor</button>
      <Link className="linkform" to="/">Voltar</Link>
    </form>
    </div>
  );
};

export default CadastroFornecedor;

