import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import ListaProdutos from "./pages/listaProdutos/ListaProdutos";
import DetProduto from "./pages/detProduto/DetProduto";
import Login from "./pages/login/Login";
import AdmProdutos from "./pages/admProdutos/AdmProdutos";

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<ListaProdutos />} />
                <Route path="/detalheProduto" element={<DetProduto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admProdutos" element={<AdmProdutos />} />
                <Route path="*"
                    element={
                            <img className="container-notfound" src="https://www.scopycode.com/includes/images/blog/404_error_page_not_found.gif" alt="Imagem de não encontrado" />
                    } />
            </Routes>
            <Footer />
        </>
    )
}