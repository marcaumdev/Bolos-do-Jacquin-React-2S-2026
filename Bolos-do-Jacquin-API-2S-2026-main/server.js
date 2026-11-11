const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const multer = require('multer');
const permissoes = require('./routes.json');

const pastaPublica = process.env.PUBLIC_DIR || path.join(__dirname, 'public');
const arquivoBanco = process.env.DB_FILE || path.join(__dirname, 'db.json');
const pastaUploads = path.join(pastaPublica, 'images', 'products', 'uploads');

const app = jsonServer.create();
const router = jsonServer.router(arquivoBanco);
app.db = router.db;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 20, parts: 21 },
});

function extensaoDaImagem(buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png';
  if (buffer.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) return 'jpg';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (['GIF87a', 'GIF89a'].includes(buffer.toString('ascii', 0, 6))) return 'gif';
  return null;
}

function lerCategoriaIds(valor) {
  if (valor === undefined) throw new Error('Informe categoriaIds como uma lista de IDs.');
  let ids;
  try {
    ids = Array.isArray(valor) ? valor.map(Number) : JSON.parse(valor);
  } catch {
    throw new Error('categoriaIds deve ser um array JSON, por exemplo [1,5].');
  }
  if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => Number.isInteger(id) && id > 0)) {
    throw new Error('categoriaIds deve conter pelo menos um ID numérico.');
  }
  const existentes = new Set(app.db.get('categorias').map('id').value());
  if (ids.some((id) => !existentes.has(id))) throw new Error('categoriaIds contém uma categoria inexistente.');
  return [...new Set(ids)];
}

function lerProduto(campos) {
  const nome = campos.nome?.trim();
  const descricaoCurta = campos.descricaoCurta?.trim();
  const descricaoLonga = campos.descricaoLonga?.trim();
  const precoPorKg = Number(campos.precoPorKg);
  if (!nome || !descricaoCurta || !descricaoLonga) {
    throw new Error('Informe nome, descricaoCurta e descricaoLonga.');
  }
  if (campos.precoPorKg === undefined || campos.precoPorKg === '' || !Number.isFinite(precoPorKg) || precoPorKg < 0) {
    throw new Error('precoPorKg deve ser um número maior ou igual a zero.');
  }
  if (campos.ativo !== 'true' && campos.ativo !== 'false') {
    throw new Error('ativo deve ser true ou false.');
  }
  return {
    nome,
    descricaoCurta,
    descricaoLonga,
    precoPorKg,
    ativo: campos.ativo === 'true',
    categoriaIds: lerCategoriaIds(campos.categoriaIds),
  };
}

app.use(jsonServer.defaults({ static: pastaPublica, bodyParser: true }));
app.use(auth.rewriter(permissoes));
app.use(auth);

// O guard 664 já verificou o token antes de processar ou gravar o arquivo.
app.post('/produtos', (req, res, next) => {
  if (!req.is('multipart/form-data')) return next();

  upload.single('imagem')(req, res, async (erroUpload) => {
    if (erroUpload) {
      const status = erroUpload.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
      return res.status(status).json({ erro: erroUpload.code === 'LIMIT_FILE_SIZE' ? 'A imagem deve ter no máximo 5 MB.' : erroUpload.message });
    }
    if (!req.file) return res.status(400).json({ erro: 'Envie um arquivo no campo imagem.' });

    const extensao = extensaoDaImagem(req.file.buffer);
    if (!extensao) return res.status(415).json({ erro: 'Envie uma imagem PNG, JPEG, WebP ou GIF válida.' });

    let dados;
    try {
      dados = lerProduto(req.body);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }

    const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;
    const destino = path.join(pastaUploads, nomeArquivo);
    let arquivoGravado = false;
    let produtoCriado;
    try {
      await fs.mkdir(pastaUploads, { recursive: true });
      await fs.writeFile(destino, req.file.buffer, { flag: 'wx' });
      arquivoGravado = true;
      produtoCriado = app.db.get('produtos').insert({
        ...dados,
        imagem: `/images/products/uploads/${nomeArquivo}`,
      }).value();
      app.db.write();
      return res.status(201).json(produtoCriado);
    } catch (erro) {
      if (produtoCriado) app.db.get('produtos').removeById(produtoCriado.id).value();
      if (arquivoGravado) await fs.rm(destino, { force: true }).catch(() => {});
      return res.status(500).json({ erro: 'Não foi possível salvar o produto e a imagem.' });
    }
  });
});

app.use(router);

if (require.main === module) {
  const porta = Number(process.env.PORT || 3000);
  app.listen(porta, () => console.log(`API disponível em http://localhost:${porta}`));
}

module.exports = app;
