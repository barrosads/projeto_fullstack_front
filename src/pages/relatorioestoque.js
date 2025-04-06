import { useEffect, useState } from 'react';
import axios from 'axios';

function EstoqueMovimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/estoquemovimentacao'); // Ajuste a URL conforme necessário
        setMovimentacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setErro("Erro ao carregar os dados.");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Movimentações de Estoque</h2>
      {erro ? <p>{erro}</p> : (
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
                  <td>{mov.produto}</td>
                  <td>{mov.quantidade}</td>
                  <td>{new Date(mov.data).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhuma movimentação encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EstoqueMovimentacao;
