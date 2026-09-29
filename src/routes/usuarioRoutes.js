import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import validate from '../middleware/validate.js';
import {usuarioCreateSchema, usuarioUpdateSchema} from '../controllers/usuarioController.js';
import authMiddleware from '../middleware/authMiddlewares.js';

const router = express.Router();

router.post('/novo', validate(usuarioCreateSchema), usuarioController.criarUsuario);

//rota privada

router.use(authMiddleware);

router.get('/listar', usuarioController.getUsuarios);
router.get('/listar/admins', usuarioController.getAdmins);
router.put('/atualizar/:codigoUsuario', validate(usuarioUpdateSchema), usuarioController.atualizarUsuario);
router.delete('/deletar/:codigoUsuario', usuarioController.deletarUsuario);


export default router;