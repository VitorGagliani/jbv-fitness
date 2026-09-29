import { Router } from 'express';
import {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto
} from '../controllers/produtoController.js';
 
const router = Router();
 
router.get('/produtos', listarProdutos);
router.post('/novo', criarProduto);
router.put('/produtos/:codigoProduto', atualizarProduto);
router.delete('/produtos/:codigoProduto', excluirProduto);
 
export default router;