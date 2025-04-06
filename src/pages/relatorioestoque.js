import React, { useEffect, useState } from "react";
import axios from "axios";

const EstoqueMovimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [produtos, setProdutos] = useState({});
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movRes = await axios.get("http://localhost:5000/api/movimentacoes");
        const prodRes = await axios.get("http://localhost:5000/api/produtos");

        const produtosMap = prodRes.data.reduce((map, prod) => {
          map[prod.id] = prod.nome;
          return map;
        }, {});

        setMovimentacoes(movRes.data);
        setProdutos(produtosMap);
      } catch (error) {
        setErro("Erro ao carregar os dados.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Movimentaçõesddd de Estoque</h2>
      {erro ? (
        <p>{erro}</p>
      ) : (
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
            {movimentacoes.length === 0 ? (
              <tr>
                <td colSpan="4">Nenhuma movimentação encontrada.</td>
              </tr>
            ) : (
              movimentacoes.map((mov) => (
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{produtos[mov.produto_id] || "Desconhecido"}</td>
                  <td>{mov.quantidade}</td>
                  <td>{new Date(mov.createdAt).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstoqueMovimentacoes;
