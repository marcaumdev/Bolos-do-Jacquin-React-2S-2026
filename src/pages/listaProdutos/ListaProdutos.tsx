import './ListaProdutos.css'
import imgProduto from '../../assets/img/produtos/le_grand_chocolat.png'
import iconeUsuario from '../../assets/icones/user.svg'
import iconeEstrela from '../../assets/icones/star.svg'
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';

function ListaProdutos() {
    return (
        <>
            <main>
                <section className="prod_banner" />
                <section className="container prod_container">
                    <div className="box_h2">
                        <h1>Nossos Bolos</h1>
                        <span>Nos Gâteaux</span>
                        <hr />
                    </div>
                    <div className="prod_cards">
                        <Card
                            imgProduto={imgProduto}
                            nome={'Le Grand Chocolat'}
                            descricao={'Mousse de chocolate belga 70%, praliné de avelãs e biscuit de cacau.'}
                            valor={185.0}
                            quantidadeAvaliacoes={10}
                            nota={9.5}
                        />
                    </div>
                </section>
            </main>
        </>

    )
}

export default ListaProdutos;