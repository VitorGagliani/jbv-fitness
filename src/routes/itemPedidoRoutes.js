import express from 'express';
import * as itemPedidoController from '../controllers/itemPedido.js';
import validate from '../middleware/validate.js';
import {
    itemPedidoCreateSchema,
    itemPedidoUpdateSchema
} from '../controllers/itemPedido.js';
import authMiddleware from '../middleware/authMiddlewares.js';

const router = express.Router();

// Rotas privadas: exigem token Bearer.
router.use(authMiddleware);

router.get('/listar', itemPedidoController.listarItensPedido);
router.post('/novo', validate(itemPedidoCreateSchema), itemPedidoController.criarItemPedido);
router.put('/atualizar/:codigoPedido', validate(itemPedidoUpdateSchema), itemPedidoController.atualizarItemPedido);
router.delete('/deletar/:codigoPedido', itemPedidoController.excluirItemPedido);

export default router;
