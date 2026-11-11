import './Home.css'

import imgBanner from '../../assets/img/jacquin_banner.png';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <>
      <main>
        <h1>página inicial bolos do Jacquin</h1>
        <section className="home_banner">
          <div className="container banner_container">
            <div className="box_texto_banner">
              <span className="linha1">haute patisserie francaise</span>
              <br />
              <span className="linha2">A Excelência em Cada Detalhe.</span>
              <p className="linha3">
                “Cozinhar não é um serviço, é uma forma de amar. Seja bem-vindo ao meu
                atelier, onde a tradição francesa encontra a doçura do coração.”
              </p>
              <a 
              className="linha4" 
              href="https://wa.me/551142252001?text=Ol%C3%A1%20gostaria%20de%20encomendar%20um%20bolo!"
              target="_blank"
              >
                encomendar agora
              </a>
            </div>
            <img
              id="bannerImg"
              src={imgBanner}
              alt="foto do Jacquin vestindo sua dólmâ"
            />
          </div>
        </section>
        <section className="container home_produtos">
          <div className="link_produtos">
            <div>
              <Link to="/produtos">visualizar todos os produtos</Link>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                {/*!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.*/}
                <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
              </svg>
            </div>
            <hr />
          </div>
          <div className="box_h2">
            <h2>Coleções Exclusivas</h2>
            <span>Collections Exclusives</span>
            <hr />
          </div>
          <div className="container_categorias">
            <Link to="/produtos">
              <div className="img_categoria1">
                <span>Momentos Inesquecíveis</span>
                <h3>Bolos de Festa</h3>
              </div>
            </Link>
            <div className="col_categorias">
              <Link to="/produtos">
                <div className="img_categoria2">
                  <h3>Tortas Francesas</h3>
                </div>
              </Link>
              <Link to="/produtos">
                <div className="img_categoria3">
                  <h3>Bolos Caseiros</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;
