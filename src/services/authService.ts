import type { RespostaLogin } from "../types/Usuario"
import { api } from "./api"

const authService = {
    async logar(email:string, senha: string) {
        const resposta = await api.post<RespostaLogin>('login', {email, 'password': senha})
        sessionStorage.setItem('token', resposta.data.accessToken);
        sessionStorage.setItem('usuario', JSON.stringify(resposta.data.user));
        return resposta.data.user;
    }
}

export default authService;