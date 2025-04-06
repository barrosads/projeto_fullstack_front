import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Produtos from '../pages/produtos';
import Fornecedores from '../pages/fornecedor';
import Clientes from '../pages/cliente';
import Movimentacaoestoque from '../pages/movimentacaoestoque';
import Relatorioestoque from '../pages/relatorioestoque';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cad_produtos" element={<Produtos />} />
                <Route path="/cad_fornecedores" element={<Fornecedores />} />
                <Route path="/cad_clientes" element={<Clientes />} />
                <Route path="/movimentacaoestoque" element={<Movimentacaoestoque />} />
                <Route path="/relatorioestoque" element={<Relatorioestoque />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;





