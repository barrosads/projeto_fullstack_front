import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListagemMovimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar as movimentações do estoque
    const fetchMovimentacoes = async () => {
      try {
        const response = await axios.get('/api/estoquemovimentacao');
        setMovimentacoes(response.data); // Armazena os dados da resposta
      } catch (error) {
        setError('Erro ao carregar as movimentações.');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovimentacoes();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Movimentações de Estoque</h1>
      {movimentacoes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Produto</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((movimentacao) => (
              <tr key={movimentacao.id}>
                <td>{movimentacao.id}</td>
                <td>{movimentacao.tipo}</td>
                <td>{movimentacao.quantidade}</td>
                <td>{movimentacao.produto.nome}</td>
                <td>{new Date(movimentacao.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Não há movimentações registradas.</div>
      )}
    </div>
  );
};

export default ListagemMovimentacoes;
