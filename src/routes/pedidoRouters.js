import { Router } from 'express';
import {
    atualizarPedido,
    buscarPedido,
    criarPedido,
    excluirPedido,
    listarPedidos,
} from '../controllers/pedidoController.js';
import authMiddleware from '../middleware/authMiddlewares.js';


const router = Router();

router.use(authMiddleware);

router.get('/', listarPedidos);
router.get('/:codigoPedido', buscarPedido);
router.post('/', criarPedido);
router.put('/:codigoPedido', atualizarPedido);
router.delete('/:codigoPedido', excluirPedido);

export default router;
