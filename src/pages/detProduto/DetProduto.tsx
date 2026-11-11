import './DetProduto.css';
import imgProduto from '../../assets/img/produtos/opera_eternelle.png'
import iconJacquin from '../../assets/img/icon_jacquin.png'

function DetProduto() {
    return (
        <main>
            <h1>informações do produto</h1>
            <section className="container container_det_prod">
                <img
                    className="img_prod_web"
                    src={imgProduto}
                    alt="foto do produto"
                />
                <div className="box_det_prod">
                    <a className="link_voltar" href="../home/index.html">
                        Voltar
                        <span>Retourner</span>
                    </a>
                    <div className="info_sub_titulo">
                        <h2>Opera Éternelle</h2>
                        <hr />
                        <img
                            className="img_prod_mobile"
                            src={imgProduto}
                            alt="foto do produto"
                        />
                    </div>
                    <p className="info_nota">
                        Nota: 9.9 <span className="info_aval">(24 Avaliações)</span>
                    </p>
                    <p className="info_desc">
                        Um ícone da patisserie francesa, o Gâteau Opéra é uma celebração de
                        texturas e sabores intensos. Composto por camadas finíssimas de biscuit
                        joconde embebido em xarope de café, entrelaçadas com um sedoso creme de
                        manteiga de café e ganache de chocolate belga 70%. Cada fatia é uma
                        viagem sensorial à Belle Époque de Paris.
                    </p>
                    <div className="info_box_valor">
                        <p>
                            preço por quilo <span className="info_valor">R$ 185,00</span>
                        </p>
                        <hr />
                    </div>
                    <a className="info_botao" href="#">
                        encomendar agora
                    </a>
                </div>
            </section>
            <section className="container_avaliacao">
                <div className="container">
                    <img src={iconJacquin} alt="icone Jacquin" />
                    <div className="box_h2">
                        <h2>A Experiência do Cliente</h2>
                        <span>L'Expérience des Clients</span>
                        <hr />
                    </div>
                    <div className="box_avaliacao">
                        <form action="" method="post">
                            <h3>deixe seu comentário</h3>
                            <div className="form_linha">
                                <label htmlFor="nome">nome completo</label>
                                <input type="text" placeholder="Ex: Marie Antoniette" />
                            </div>
                            <div className="form_linha">
                                <label htmlFor="nota">sua nota</label>
                                <input type="text" placeholder="De o a 10 - Ex: 9.9" />
                            </div>
                            <div className="form_linha">
                                <label htmlFor="comentario">comentário</label>
                                <textarea
                                    maxLength={350}
                                    rows={5}
                                    name=""
                                    id=""
                                    placeholder="Conte-nos sobre sua experiência..."
                                    defaultValue={""}
                                />
                            </div>
                            <input type="button" defaultValue="enviar comentário" />
                        </form>
                        <ul className="lista_avaliacao">
                            <h3>o que dizem</h3>
                            <li className="">
                                <div className="coment_linha1">
                                    <div className="coment_nome_tempo">
                                        <p>juliana mendes</p>
                                        <span>há 2 dias</span>
                                    </div>
                                    <p>Nota: 9.5</p>
                                </div>
                                <p>
                                    "Simplesmente divino. O equilíbrio entre o café e o chocolate é
                                    perfeito. A textura do biscuit joconde é exatamente como as que
                                    comi em Paris."
                                </p>
                            </li>
                            <li className="">
                                <div className="coment_linha1">
                                    <div className="coment_nome_tempo">
                                        <p>juliana mendes</p>
                                        <span>há 2 dias</span>
                                    </div>
                                    <p>Nota: 9.5</p>
                                </div>
                                <p>
                                    "Simplesmente divino. O equilíbrio entre o café e o chocolate é
                                    perfeito. A textura do biscuit joconde é exatamente como as que
                                    comi em Paris."
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DetProduto;