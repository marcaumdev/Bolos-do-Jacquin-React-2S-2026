import './AdmProdutos.css'
import iconJacquin from "../../assets/img/icon_jacquin.png"
import Dialog from '../../components/dialog/Dialog'
import { useState } from 'react'

function AdmProdutos() {
    const [mostrar, setMostrar] = useState(false)

    const aoFechar = () => setMostrar(false)

    const aoConfirmar = () => {
        alert("Produto excluído")
        setMostrar(false)
    }

    return (
        <main>
            <h1>Pagina administrativa - bolos do Jacquin</h1>
            <section className="cad_produtos">
                <div className="container cad_container">
                    <img className="icon_jacquin" src={iconJacquin} alt="" />
                    <div className="box_h2">
                        <h2>Cadastro de Produtos</h2>
                        <span>Enregistrement du Produit</span>
                        <hr />
                    </div>
                    <form action="">
                        <div className="inputs_form">
                            <div className="form_coluna1">
                                <div className="linha_form lf_coluna">
                                    <label htmlFor="">nome</label>
                                    <input
                                        placeholder="Ex: Opera Éternelle"
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </div>
                                <div className="linha_form lf_linha">
                                    <div className="input_cat lf_coluna">
                                        <label htmlFor="">categorias</label>
                                        <input type="text" placeholder="Ex: Café, Chocolate, Bolo" />
                                    </div>
                                    <div className="input_img lf_coluna">
                                        <span>imagem</span>
                                        <label htmlFor="img">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                {/*! Font Awesome Pro 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc. */}
                                                <path
                                                    fill="currentColor"
                                                    d="M336 118.6L336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400L304 118.6L219.3 203.3C213.1 209.5 202.9 209.5 196.7 203.3C190.5 197.1 190.5 186.9 196.7 180.7L308.7 68.7C314.9 62.5 325.1 62.5 331.3 68.7L443.3 180.7C449.5 186.9 449.5 197.1 443.3 203.3C437.1 209.5 426.9 209.5 420.7 203.3L336 118.6zM256 384L160 384C142.3 384 128 398.3 128 416L128 480C128 497.7 142.3 512 160 512L480 512C497.7 512 512 497.7 512 480L512 416C512 398.3 497.7 384 480 384L384 384L384 352L480 352C515.3 352 544 380.7 544 416L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 416C96 380.7 124.7 352 160 352L256 352L256 384zM416 448C416 434.7 426.7 424 440 424C453.3 424 464 434.7 464 448C464 461.3 453.3 472 440 472C426.7 472 416 461.3 416 448z"
                                                />
                                            </svg>
                                        </label>
                                        <input type="file" name="img" id="img" />
                                    </div>
                                </div>
                                <div className="linha_form lf_coluna">
                                    <label htmlFor="">descrição curta</label>
                                    <textarea
                                        placeholder="Ex: O clássico parisiense: café arábica, chocolate amargo e biscuit joconde."
                                        name=""
                                        id=""
                                        rows={2}
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <div className="form_coluna2">
                                <div className="linha_form lf_linha">
                                    <div className="input_valor lf_coluna">
                                        <label htmlFor="">valor por quilo</label>
                                        <input type="text" name="" id="" />
                                    </div>
                                    <div className="input_ativo lf_coluna">
                                        <label htmlFor="">ativo</label>
                                        <input type="checkbox" name="" id="" />
                                    </div>
                                </div>
                                <div className="linha_form lf_coluna">
                                    <label htmlFor="">descrição longa</label>
                                    <textarea
                                        name=""
                                        id=""
                                        rows={7}
                                        placeholder="Ex: Um ícone da patisserie francesa, o Gâteau Opéra é uma celebração de texturas e sabores intensos. Composto por camadas finíssimas de biscuit joconde embebido em xarope de café, entrelaçadas com um sedoso creme de manteiga de café e ganache de chocolate belga 70%. Cada fatia é uma viagem sensorial à Belle Époque de Paris."
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                        </div>
                        <input type="button" defaultValue="cadastrar" />
                    </form>
                </div>
            </section>
            <section className="list_produtos">
                <div className="container list_container">
                    <div className="box_h2">
                        <h2>Lista de Produtos</h2>
                        <span>Liste des Produits</span>
                        <hr />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>nome</th>
                                <th>categorias</th>
                                <th>descrição</th>
                                <th>opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-cell="nome">Opera Éternelle</td>
                                <td data-cell="categorias">Café, Chocolate, Bolo</td>
                                <td data-cell="descrição">
                                    O clássico parisiense: café arábica, chocolate amargo e biscuit
                                    joconde.
                                </td>
                                <td data-cell="opções">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        {/*! Font Awesome Pro 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc. */}
                                        <path
                                            fill="currentColor"
                                            d="M256.5 91.4C258.5 84.6 264.8 80 271.8 80L368.2 80C375.3 80 381.5 84.6 383.5 91.4L394.5 128L245.5 128L256.5 91.4zM212.1 128L112 128C103.2 128 96 135.2 96 144C96 152.8 103.2 160 112 160L528 160C536.8 160 544 152.8 544 144C544 135.2 536.8 128 528 128L427.9 128L414.2 82.2C408.1 61.9 389.4 48 368.2 48L271.8 48C250.6 48 231.9 61.9 225.8 82.2L212.1 128zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L480 208L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 208L128 208zM240 272C240 263.2 232.8 256 224 256C215.2 256 208 263.2 208 272L208 464C208 472.8 215.2 480 224 480C232.8 480 240 472.8 240 464L240 272zM336 272C336 263.2 328.8 256 320 256C311.2 256 304 263.2 304 272L304 464C304 472.8 311.2 480 320 480C328.8 480 336 472.8 336 464L336 272zM432 272C432 263.2 424.8 256 416 256C407.2 256 400 263.2 400 272L400 464C400 472.8 407.2 480 416 480C424.8 480 432 472.8 432 464L432 272z"
                                        />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="nome">Opera Éternelle</td>
                                <td data-cell="categorias">Café, Chocolate, Bolo</td>
                                <td data-cell="descrição">
                                    O clássico parisiense: café arábica, chocolate amargo e biscuit
                                    joconde.
                                </td>
                                <td data-cell="opções">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        {/*! Font Awesome Pro 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc. */}
                                        <path
                                            fill="currentColor"
                                            d="M256.5 91.4C258.5 84.6 264.8 80 271.8 80L368.2 80C375.3 80 381.5 84.6 383.5 91.4L394.5 128L245.5 128L256.5 91.4zM212.1 128L112 128C103.2 128 96 135.2 96 144C96 152.8 103.2 160 112 160L528 160C536.8 160 544 152.8 544 144C544 135.2 536.8 128 528 128L427.9 128L414.2 82.2C408.1 61.9 389.4 48 368.2 48L271.8 48C250.6 48 231.9 61.9 225.8 82.2L212.1 128zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L480 208L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 208L128 208zM240 272C240 263.2 232.8 256 224 256C215.2 256 208 263.2 208 272L208 464C208 472.8 215.2 480 224 480C232.8 480 240 472.8 240 464L240 272zM336 272C336 263.2 328.8 256 320 256C311.2 256 304 263.2 304 272L304 464C304 472.8 311.2 480 320 480C328.8 480 336 472.8 336 464L336 272zM432 272C432 263.2 424.8 256 416 256C407.2 256 400 263.2 400 272L400 464C400 472.8 407.2 480 416 480C424.8 480 432 472.8 432 464L432 272z"
                                        />
                                    </svg>
                                    <Dialog
                                        title='Excluir Produto'
                                        mostrar={mostrar}
                                        mensagem='Tem certeza que quer excluir este produto?'
                                        textoConfirmar='Excluir'
                                        textoCancelar='Cancelar'
                                        aoConfirmar={aoConfirmar}
                                        aoFechar={aoFechar}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="nome">Opera Éternelle</td>
                                <td data-cell="categorias">Café, Chocolate, Bolo</td>
                                <td data-cell="descrição">
                                    O clássico parisiense: café arábica, chocolate amargo e biscuit
                                    joconde.
                                </td>
                                <td data-cell="opções">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        {/*! Font Awesome Pro 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc. */}
                                        <path
                                            fill="currentColor"
                                            d="M256.5 91.4C258.5 84.6 264.8 80 271.8 80L368.2 80C375.3 80 381.5 84.6 383.5 91.4L394.5 128L245.5 128L256.5 91.4zM212.1 128L112 128C103.2 128 96 135.2 96 144C96 152.8 103.2 160 112 160L528 160C536.8 160 544 152.8 544 144C544 135.2 536.8 128 528 128L427.9 128L414.2 82.2C408.1 61.9 389.4 48 368.2 48L271.8 48C250.6 48 231.9 61.9 225.8 82.2L212.1 128zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L480 208L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 208L128 208zM240 272C240 263.2 232.8 256 224 256C215.2 256 208 263.2 208 272L208 464C208 472.8 215.2 480 224 480C232.8 480 240 472.8 240 464L240 272zM336 272C336 263.2 328.8 256 320 256C311.2 256 304 263.2 304 272L304 464C304 472.8 311.2 480 320 480C328.8 480 336 472.8 336 464L336 272zM432 272C432 263.2 424.8 256 416 256C407.2 256 400 263.2 400 272L400 464C400 472.8 407.2 480 416 480C424.8 480 432 472.8 432 464L432 272z"
                                        />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

    )
}

export default AdmProdutos