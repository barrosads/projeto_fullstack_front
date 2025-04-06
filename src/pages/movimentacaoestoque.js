import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './fornecedor.css';

const CadastroMovimentacaoEstoque = () => {
  const [formData, setFormData] = useState({
    tipo: 'entrada', // Tipo pode ser 'entrada' ou 'saida'
    quantidade: '',
    produto_id: '',
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Carregar a lista de produtos do estoque
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('/api/produtos'); // Ajuste a URL conforme necessário
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

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
      const response = await axios.post('/api/estoque/movimentacao', formData);
      alert('Movimentação registrada com sucesso!');
      console.log(response.data); // Exibe a resposta da API
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error.response ? error.response.data : error.message);
      alert(`Erro ao registrar movimentação: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h1 className="titulomovi">Registrar Movimentação de Estoque</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Tipo de Movimentação:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        <div className="campo">
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Produto:</label>
          <select
            name="produto_id"
            value={formData.produto_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="botoes">
          <button type="submit">Registrar Movimentação</button>
          <Link className="linkform" to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
};

export default CadastroMovimentacaoEstoque;
