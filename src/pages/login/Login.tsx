import './Login.css'
import iconJacquin from '../../assets/img/icon_jacquin.png'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const logar = () => {
        navigate('/admProdutos')
    }

    return (
        <main>
            <section className="container container_login">
                <div className="box_login">
                    <img
                        className="icon_jacquin"
                        src={iconJacquin}
                        alt="icone Jacquin"
                    />
                    <div className="box_h2">
                        <h2>Conecte-se</h2>
                        <span>Se Connecter</span>
                        <hr />
                    </div>
                    <form action="" method="post">
                        <div className="form_linha">
                            <label htmlFor="email">e-mail</label>
                            <input type="text" id="email" placeholder="Ex: email@email.com" />
                        </div>
                        <div className="form_linha">
                            <label htmlFor="senha">senha</label>
                            <input type="password" id="senha" placeholder="Ex: Senha@123" />
                        </div>
                        <input type="button" defaultValue="conectar" onClick={logar} />
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login;