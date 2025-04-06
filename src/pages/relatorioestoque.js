import React, { useEffect, useState } from "react";
import axios from "axios";

const EstoqueMovimentacao = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovimentacoes = async () => {
      try {
        const response = await axios.get("/api/estoquemovimentacao");
        const dadosCorrigidos = response.data.map(mov => ({
          ...mov,
          dataFormatada: mov.data ? new Date(mov.data).toLocaleDateString("pt-BR") : "Data inválida",
          produtoNome: mov.produto ? mov.produto.nome : "Produto desconhecido"
        }));
        setMovimentacoes(dadosCorrigidos);
      } catch (err) {
        console.error("Erro ao carregar os dados:", err);
        setError("Erro ao carregar os dados.");
      }
    };

    fetchMovimentacoes();
  }, []);

  return (
    <div>
      <h2>Movimentações de Estoque</h2>
      {error && <p>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.length > 0 ? (
            movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{mov.produtoNome}</td>
                <td>{mov.quantidade}</td>
                <td>{mov.dataFormatada}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhuma movimentação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EstoqueMovimentacao;
