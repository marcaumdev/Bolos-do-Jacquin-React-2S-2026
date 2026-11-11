const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('POST /produtos recebe imagem, preserva autenticação e grava o produto', async () => {
  const root = path.join(__dirname, '..');
  const temporario = fs.mkdtempSync(path.join(os.tmpdir(), 'bolos-api-'));
  const banco = path.join(temporario, 'db.json');
  const pastaPublica = path.join(temporario, 'public');
  fs.copyFileSync(path.join(root, 'db.seed.json'), banco);
  fs.mkdirSync(pastaPublica, { recursive: true });
  process.env.DB_FILE = banco;
  process.env.PUBLIC_DIR = pastaPublica;

  const app = require('../server');
  const servidor = await new Promise((resolve) => {
    const instancia = app.listen(0, '127.0.0.1', () => resolve(instancia));
  });
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const imagem = fs.readFileSync(path.join(root, 'public', 'images', 'products', 'opera_eternelle.png'));

  function formulario(arquivo = imagem, tipo = 'image/png') {
    const dados = new FormData();
    dados.append('nome', 'Bolo de Teste');
    dados.append('descricaoCurta', 'Descrição curta');
    dados.append('descricaoLonga', 'Descrição longa');
    dados.append('precoPorKg', '125.50');
    dados.append('ativo', 'true');
    dados.append('categoriaIds', JSON.stringify([1, 5]));
    dados.append('imagem', new Blob([arquivo], { type: tipo }), 'foto.png');
    return dados;
  }

  try {
    let resposta = await fetch(`${base}/categorias`);
    assert.equal(resposta.status, 200);
    assert.equal((await resposta.json()).length, 8);
    resposta = await fetch(`${base}/produtos/2?_embed=avaliacoes`);
    assert.equal(resposta.status, 200);
    assert.equal((await resposta.json()).avaliacoes.length, 2);
    resposta = await fetch(`${base}/avaliacoes?produtoId=2`);
    assert.equal(resposta.status, 200);
    assert.equal((await resposta.json()).length, 2);

    resposta = await fetch(`${base}/produtos`, { method: 'POST', body: formulario() });
    assert.equal(resposta.status, 401);
    assert.equal(fs.existsSync(path.join(pastaPublica, 'images', 'products', 'uploads')), false);

    resposta = await fetch(`${base}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Novo Aluno', email: 'novo@example.com', password: 'senha789' }),
    });
    assert.equal(resposta.status, 201);
    assert.equal((await resposta.json()).user.nome, 'Novo Aluno');

    resposta = await fetch(`${base}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'juliana@example.com', password: 'senha123' }),
    });
    assert.equal(resposta.status, 200);
    const { accessToken } = await resposta.json();
    const headers = { Authorization: `Bearer ${accessToken}` };

    resposta = await fetch(`${base}/produtos`, { method: 'POST', headers, body: formulario() });
    assert.equal(resposta.status, 201);
    const produto = await resposta.json();
    assert.equal(produto.nome, 'Bolo de Teste');
    assert.equal(produto.precoPorKg, 125.5);
    assert.deepEqual(produto.categoriaIds, [1, 5]);
    assert.match(produto.imagem, /^\/images\/products\/uploads\/[0-9a-f-]+\.png$/);

    resposta = await fetch(`${base}${produto.imagem}`);
    assert.equal(resposta.status, 200);
    assert.deepEqual(Buffer.from(await resposta.arrayBuffer()), imagem);
    assert.ok(fs.existsSync(path.join(pastaPublica, produto.imagem.slice(1))));
    assert.equal(JSON.parse(fs.readFileSync(banco, 'utf8')).produtos.length, 7);

    resposta = await fetch(`${base}/produtos`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Produto com caminho', imagem: produto.imagem, categoriaIds: [1] }),
    });
    assert.equal(resposta.status, 201);

    resposta = await fetch(`${base}/produtos`, { method: 'POST', headers, body: formulario(Buffer.from('<html>não é imagem</html>')) });
    assert.equal(resposta.status, 415);
    resposta = await fetch(`${base}/produtos`, { method: 'POST', headers, body: formulario(Buffer.alloc(6 * 1024 * 1024)) });
    assert.equal(resposta.status, 413);
    assert.equal(JSON.parse(fs.readFileSync(banco, 'utf8')).produtos.length, 8);
  } finally {
    servidor.closeAllConnections();
    await new Promise((resolve) => servidor.close(resolve));
    fs.rmSync(temporario, { recursive: true, force: true });
  }
});
