import { Link } from 'react-router-dom';

import iconeUsuario from '../../assets/icones/user.svg'
import iconeEstrela from '../../assets/icones/star.svg'

import './Card.css'

type CardProps = {
    imgProduto: string;
    nome: string;
    descricao: string;
    valor: number;
    quantidadeAvaliacoes: number;
    nota: number;
}

function Card({
    imgProduto,
    nome,
    descricao,
    valor,
    quantidadeAvaliacoes,
    nota
} : CardProps) {
    return(
        <article className="prod_card">
                            <figure>
                                <img
                                    src={imgProduto}
                                    alt="foto do produto"
                                />
                            </figure>
                            <h2>
                                <Link to="/detalheProduto">{nome}</Link>
                            </h2>
                            <p className="card_desc">
                                {descricao}
                            </p>
                            <p className="card_rodape">
                                <data value={valor}>R$ {valor} / kg</data>
                                <span className="card_av">
                                    <img src={iconeUsuario} alt="icone de usuarios" />
                                    <data value={quantidadeAvaliacoes}>{quantidadeAvaliacoes}</data>
                                    <img src={iconeEstrela} alt="icone de estrela" />
                                    <data value={nota}>{nota}</data>
                                </span>
                            </p>
                        </article>
    )
}

export default Card;