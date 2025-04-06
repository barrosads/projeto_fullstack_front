import { useEffect, useState } from "react";

const EstoqueMovimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/estoquemovimentacao");
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        const data = await response.json();

        const produtosResponse = await fetch("/api/produtos");
        if (!produtosResponse.ok) {
          throw new Error("Erro ao carregar os produtos");
        }
        const produtos = await produtosResponse.json();

        const movimentacoesComProdutos = data.map((mov) => {
          const produto = produtos.find((p) => p.id === mov.produto_id);
          return { ...mov, produtoNome: produto ? produto.nome : "Desconhecido" };
        });

        setMovimentacoes(movimentacoesComProdutos);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/estoquemovimentacao/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar a movimentação");
      }
      setMovimentacoes(movimentacoes.filter((mov) => mov.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Movimentações de Estoque</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{mov.produtoNome}</td>
                <td>{mov.tipo}</td>
                <td>{mov.quantidade}</td>
                <td>{new Date(mov.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(mov.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstoqueMovimentacoes;
