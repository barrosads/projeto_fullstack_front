import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './produtos.css'

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    codigo_barras: '',
    descricao: '',
    quantidade_estoque: '',
    categoria: '',
    data_validade: '',
    imagem_url: '',
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
      const response = await axios.post('http://177.153.51.205:3000/produtos', formData);
      alert('Produto cadastrado com sucesso!');
      console.log(response.data); // Exibe a resposta da API
    } catch (error) {
      alert('Erro ao cadastrar produto!');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="tituloform">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Código de Barras:</label>
          <input
            type="text"
            name="codigo_barras"
            value={formData.codigo_barras}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="lado">
        <div>
          <label>Quantidade em Estoque:</label>
          <input
            type="number"
            name="quantidade_estoque"
            value={formData.quantidade_estoque}
            onChange={handleChange}
            required
          />

        </div>
        
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>
        </div>
    <div className="lado">
        <div>
          <label>Data de Validade:</label>
          <input
            type="date"
            name="data_validade"
            value={formData.data_validade}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Imagem URL:</label>
          <input
            type="text"
            name="imagem_url"
            value={formData.imagem_url}
            onChange={handleChange}
          />
        </div>
        </div>
        <button type="submit">Cadastrar Produto</button>
        <Link className="linkform" to="/">Voltar</Link>
      </form>
    </div>
  );
};

export default CadastroProduto;
