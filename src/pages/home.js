import './style.css';
import imagemlado from '../images/Escolha_estoque.svg'
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div className="container">
        <img src={imagemlado }/>
        <div  className="itens">
          <div className="subitens">
         <Link to="/cad_produtos">Cadastrar Produtos</Link>
         <Link to="/cad_fornecedores">Cadastrar Fornecedor</Link>
         </div>
         <div className="subitens">
         <Link to="/cad_clientes">Cadastrar Clientes</Link>
         <Link to="/movimentacaoestoque">Operar Estoque</Link>
         </div>
        </div>
      </div>
    );
  }
  
  export default Home;