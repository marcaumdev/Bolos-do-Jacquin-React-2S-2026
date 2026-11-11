# Bolos do Jacquin API

API de prática com `json-server` e `json-server-auth`, baseada nas telas do projeto React `bolos-do-jacquin-react`. Os dados ficam em um arquivo JSON local.

## Iniciar

Requer Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Base: `http://localhost:3000`. Para restaurar os exemplos, pare o servidor e execute `npm run reset`. O arquivo `db.json` recebe as alterações feitas pela API; `db.seed.json` guarda os dados iniciais.

## Recursos e campos

| Recurso | Campos |
| --- | --- |
| `users` | `id`, `nome`, `email`, `password` |
| `categorias` | `id`, `nome`, `identificador`, `imagem` (opcional) |
| `produtos` | `id`, `nome`, `descricaoCurta`, `descricaoLonga`, `precoPorKg`, `ativo`, `imagem`, `categoriaIds` |
| `avaliacoes` | `id`, `produtoId`, `userId`, `nomeAutor`, `nota`, `comentario`, `criadoEm` |

`categoriaIds` é uma lista de IDs. Assim, um produto pode ter várias categorias, e uma categoria pode aparecer em vários produtos. `nota` vai de **0 a 10** e aceita decimais. O nome do autor fica copiado em `nomeAutor` para ser exibido publicamente; `userId` identifica quem pode editar a avaliação.

As fotos dos seis produtos e das três coleções principais vieram do projeto React. Os preços e os textos adicionais são exemplos para a aula. A média e a quantidade de avaliações devem ser calculadas pelo front-end a partir de `avaliacoes`.

### Exceções exigidas pelo pacote de autenticação

O `json-server-auth` usa a coleção **`users`**, os campos **`email`** e **`password`** para cadastro/login e **`userId`** para verificar o dono de uma avaliação. `id` é a chave padrão do `json-server`. Essas chaves técnicas permanecem em inglês para preservar o funcionamento da autenticação; os demais nomes da API estão em português.

## Login e cadastro

Contas de exemplo:

| E-mail | Senha |
| --- | --- |
| `juliana@example.com` | `senha123` |
| `ana@example.com` | `senha456` |

```http
POST /login
Content-Type: application/json

{"email":"juliana@example.com","password":"senha123"}
```

O login retorna `accessToken` e `user`. Para criar uma conta:

```http
POST /register
Content-Type: application/json

{"nome":"Novo Aluno","email":"aluno@example.com","password":"senha123"}
```

Envie `Authorization: Bearer SEU_TOKEN` para escrever nas rotas protegidas. O token expira em uma hora. As senhas de exemplo estão criptografadas no JSON; não use senhas pessoais nesta API.

## Rotas e permissões

| Recurso | Leitura | Escrita |
| --- | --- | --- |
| `/produtos` | pública | usuário autenticado |
| `/categorias` | pública | usuário autenticado |
| `/avaliacoes` | pública | autor da avaliação |
| `/users/:id` | próprio usuário | próprio usuário |

Exemplos de consulta:

```text
GET /produtos?ativo=true
GET /produtos/2
GET /categorias
GET /avaliacoes?produtoId=2
GET /produtos/2?_embed=avaliacoes
GET /produtos?q=chocolate
GET /produtos?_sort=precoPorKg&_order=asc
```

Criar um produto com o caminho de uma imagem que já existe, após o login:

```http
POST /produtos
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{"nome":"Novo Bolo","descricaoCurta":"Descrição para o card","descricaoLonga":"Descrição para o detalhe","precoPorKg":120,"ativo":true,"imagem":"/images/products/opera_eternelle.png","categoriaIds":[1,5]}
```

Criar uma avaliação após o login:

```http
POST /avaliacoes
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{"produtoId":2,"userId":1,"nomeAutor":"Juliana Mendes","nota":9.5,"comentario":"Muito bom!","criadoEm":"2026-11-10T12:00:00.000Z"}
```

Use em `userId` o `id` retornado pelo login. O `json-server-auth` controla o acesso. Para o envio em JSON, o `json-server` não valida se os IDs relacionados existem nem os limites de nota/preço. O envio com arquivo valida os campos do produto e as categorias. `npm run check:data` valida os exemplos iniciais.

## Imagens e integração com o React

`POST /produtos` também aceita `multipart/form-data`. Envie o arquivo no campo **`imagem`** e os demais campos como texto. `categoriaIds` deve ser um array em formato JSON, por exemplo `[1,5]`. O servidor salva a imagem em `public/images/products/uploads/`, define `imagem` no produto e retorna o produto criado com status `201`.

```ts
const dados = new FormData();
dados.append('nome', 'Novo Bolo');
dados.append('descricaoCurta', 'Descrição para o card');
dados.append('descricaoLonga', 'Descrição para o detalhe');
dados.append('precoPorKg', '120');
dados.append('ativo', 'true');
dados.append('categoriaIds', JSON.stringify([1, 5]));
dados.append('imagem', arquivoSelecionado); // File do input

const resposta = await fetch('http://localhost:3000/produtos', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: dados,
});
const produto = await resposta.json();
```

Não defina o cabeçalho `Content-Type` manualmente nesse `fetch`; o navegador adiciona o limite multipart necessário. São aceitos PNG, JPEG, WebP e GIF de até **5 MB**. Respostas possíveis: `400` para campos inválidos, `401` sem login, `413` para arquivo grande e `415` para arquivo que não é uma imagem aceita. A URL resultante será semelhante a `http://localhost:3000/images/products/uploads/ID.png`.

O formulário React existente ainda precisa ser conectado a esse endpoint. `npm run reset` restaura o JSON, mas não apaga arquivos enviados anteriormente.

O React analisado ainda mostra conteúdo fixo. Para a integração, busque `produtos` e `categorias` e use `categoriaIds` para exibir os nomes das categorias. Para a média e a quantidade de avaliações, busque `avaliacoes?produtoId=ID` e calcule no cliente:

```ts
const quantidade = avaliacoes.length;
const media = quantidade
  ? avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.nota, 0) / quantidade
  : null;
```

As versões das dependências estão fixadas para manter a compatibilidade do `json-server-auth` com o `json-server` 0.x. Este projeto é um mock para aula, com dados compartilhados por todos que usam a mesma instância.
