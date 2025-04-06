import './style.css';
import imagemlado from '../images/Escolha_estoque.svg'
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div className="container">
       <img src={imagemlado} alt="Ilustração sobre escolha de estoque" />
        <div className='blocks'>
       <fieldset className="itens"> 
       <legend>Operações</legend>
          <div className="subitens">
         <Link to="/cad_produtos">Cadastrar Produtos</Link>
         <Link to="/cad_fornecedores">Cadastrar Fornecedores</Link>
         </div>
         <div className="subitens">
         <Link to="/cad_clientes">Cadastrar Clientes</Link>
         <Link to="/movimentacaoestoque">Operar Estoque</Link>
         </div>
        </fieldset>
        <fieldset className="itens"> 
       <legend>Relatórios</legend>
          <div className="subitens">
         <Link to="/cad_produtos">Lista de Clientes</Link>
         <Link to="/cad_fornecedores">Movimentações de Estoque</Link>
         </div>
        </fieldset>
        </div>
      </div>
    );
  }
  
  export default Home;
