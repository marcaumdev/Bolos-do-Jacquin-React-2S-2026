const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'db.seed.json'), 'utf8'));
for (const name of ['users', 'categorias', 'produtos', 'avaliacoes']) {
  assert.ok(Array.isArray(data[name]), `${name} deve ser uma lista`);
  const ids = data[name].map((item) => item.id);
  assert.equal(ids.length, new Set(ids).size, `IDs duplicados em ${name}`);
}

const categoriaIds = new Set(data.categorias.map((categoria) => categoria.id));
const produtoIds = new Set(data.produtos.map((produto) => produto.id));
const userIds = new Set(data.users.map((user) => user.id));

function verificarImagem(imagem) {
  assert.ok(typeof imagem === 'string' && imagem.startsWith('/images/'), `Imagem inválida: ${imagem}`);
  assert.ok(fs.existsSync(path.join(root, 'public', imagem.slice(1))), `Imagem ausente: ${imagem}`);
}

for (const user of data.users) {
  assert.ok(user.nome && user.email && /^\$2[aby]\$/.test(user.password), `Usuário ${user.id} inválido`);
}
for (const categoria of data.categorias) {
  assert.ok(categoria.nome && categoria.identificador, `Categoria ${categoria.id} inválida`);
  if (categoria.imagem) verificarImagem(categoria.imagem);
}
for (const produto of data.produtos) {
  assert.ok(produto.nome && produto.descricaoCurta && produto.descricaoLonga, `Produto ${produto.id} sem descrição`);
  assert.ok(Number.isFinite(produto.precoPorKg) && produto.precoPorKg >= 0, `Preço inválido no produto ${produto.id}`);
  assert.equal(typeof produto.ativo, 'boolean', `Status inválido no produto ${produto.id}`);
  verificarImagem(produto.imagem);
  assert.ok(Array.isArray(produto.categoriaIds) && produto.categoriaIds.length > 0, `Produto ${produto.id} sem categorias`);
  assert.equal(produto.categoriaIds.length, new Set(produto.categoriaIds).size, `Categorias duplicadas no produto ${produto.id}`);
  for (const id of produto.categoriaIds) assert.ok(categoriaIds.has(id), `Categoria ${id} ausente`);
}
for (const avaliacao of data.avaliacoes) {
  assert.ok(produtoIds.has(avaliacao.produtoId), `Produto ${avaliacao.produtoId} ausente`);
  assert.ok(userIds.has(avaliacao.userId), `Usuário ${avaliacao.userId} ausente`);
  assert.ok(avaliacao.nomeAutor && avaliacao.comentario && !Number.isNaN(Date.parse(avaliacao.criadoEm)), `Avaliação ${avaliacao.id} incompleta`);
  assert.ok(Number.isFinite(avaliacao.nota) && avaliacao.nota >= 0 && avaliacao.nota <= 10, `Nota inválida na avaliação ${avaliacao.id}`);
}
console.log(`Dados válidos: ${data.users.length} usuários, ${data.categorias.length} categorias, ${data.produtos.length} produtos e ${data.avaliacoes.length} avaliações.`);
