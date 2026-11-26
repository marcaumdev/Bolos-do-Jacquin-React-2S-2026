import './Login.css'
import iconJacquin from '../../assets/img/icon_jacquin.png'
import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import authService from '../../services/authService';

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [enviando, setEnviando] = useState(false)

    const navigate = useNavigate();

    const logar = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        setEnviando(true);
        setErro('');

        try{
            await authService.logar(email, senha);
            navigate('/admProdutos')
        } catch {
            setErro('Não foi possível entrar. Email ou senha incorretos!!!');
        }finally{
            setEnviando(false);
        }
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
                    <form onSubmit={logar}>
                        <div className="form_linha">
                            <label htmlFor="email">e-mail</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Ex: email@email.com"
                                value={email}
                                onChange={evento => setEmail(evento.target.value)}
                                required
                            />
                        </div>
                        <div className="form_linha">
                            <label htmlFor="senha">senha</label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Ex: Senha@123"
                                value={senha}
                                onChange={evento => setSenha(evento.target.value)}
                                required
                            />
                        </div>
                        {erro && <p role='alert'>{erro}</p>}
                        <button type='submit' disabled={enviando}>{enviando ? 'conectando...' : "conectar"}</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login;