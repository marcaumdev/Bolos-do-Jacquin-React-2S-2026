export type Usuario = {
    id: number;
    nome: string;
    email: string;
};

export type RespostaLogin = {
    accessToken: string;
    user: Usuario;
}