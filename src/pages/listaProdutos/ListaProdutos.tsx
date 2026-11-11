import './ListaProdutos.css'
import imgProduto from '../../assets/img/produtos/le_grand_chocolat.png'
import iconeUsuario from '../../assets/icones/user.svg'
import iconeEstrela from '../../assets/icones/star.svg'
import { Link } from 'react-router-dom';

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
                        <article className="prod_card">
                            <figure>
                                <img
                                    src={imgProduto}
                                    alt="foto do produto"
                                />
                            </figure>
                            <h2>
                                <Link to="/detalheProduto">Le Grand Chocolat</Link>
                            </h2>
                            <p className="card_desc">
                                Mousse de chocolate belga 70%, praliné de avelãs e biscuit de cacau.
                            </p>
                            <p className="card_rodape">
                                <data value={185.0}>R$ 185,00 / kg</data>
                                <span className="card_av">
                                    <img src={iconeUsuario} alt="icone de usuarios" />
                                    <data value={10}>10</data>
                                    <img src={iconeEstrela} alt="icone de estrela" />
                                    <data value="9.5">9,5</data>
                                </span>
                            </p>
                        </article>
                    </div>
                </section>
            </main>
        </>

    )
}

export default ListaProdutos;