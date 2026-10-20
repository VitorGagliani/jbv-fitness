import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import authMiddleware from '../middleware/authMiddlewares.js';
 
const router = express.Router();
 
router.get('/', produtoController.listarProdutos);

router.use(authMiddleware);

router.post('/novo', produtoController.criarProduto);
router.put('/:codigoProduto', produtoController.atualizarProduto);
router.delete('/:codigoProduto', produtoController.excluirProduto);
 
export default router;