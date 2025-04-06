import { useEffect, useState } from "react";

export default function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/movimentacoes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        return response.json();
      })
      .then((data) => setMovements(data))
      .catch((err) => setError(err.message));
  }, []);

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
              <th>Quantidade</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {movements.length > 0 ? (
              movements.map((mov) => (
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{mov.produto || "N/A"}</td>
                  <td>{mov.quantidade}</td>
                  <td>{mov.data ? new Date(mov.data).toLocaleDateString() : "Data inválida"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum dado disponível</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
