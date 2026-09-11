import * as categoriaService from '../services/categoriaService.js';
import Joi from 'joi';
 
 
export const categoriaCreateSchema = Joi.object({
    codigoCategoria: Joi.number().integer().positive().required(),
    descricao: Joi.string().required().max(50),
}).min(1);
 