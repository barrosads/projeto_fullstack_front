import React, { useEffect, useState } from "react";

const MovimentacoesEstoque = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("/api/movimentacoes") // Substitua pelo seu endpoint real
      .then((res) => res.json())
      .then((data) => setMovimentacoes(data))
      .catch((err) => setErro("Erro ao carregar os dados."));
  }, []);

  const formatarData = (dataISO) => {
    if (!dataISO) return "Data inválida";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <div>
      <h2>Movimentações de Estoque</h2>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Produto ID</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{mov.tipo}</td>
                <td>{mov.quantidade}</td>
                <td>{mov.produto_id}</td>
                <td>{formatarData(mov.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovimentacoesEstoque;
