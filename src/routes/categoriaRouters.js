import { Router } from 'express';
import * as categoriaController from '../controllers/categoriaController.js';
import authMiddleware from '../middleware/authMiddlewares.js';


const router = Router();

router.get('/', categoriaController.listarCategorias);
router.get('/:codigoCategoria', categoriaController.buscarCategoria);
router.use(authMiddleware);
router.post('/', categoriaController.criarCategoria);
router.put('/:codigoCategoria', categoriaController.atualizarCategoria);
router.delete('/:codigoCategoria', categoriaController.excluirCategoria);

export default router;
