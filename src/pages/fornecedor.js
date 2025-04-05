import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default CadastroFornecedor;

