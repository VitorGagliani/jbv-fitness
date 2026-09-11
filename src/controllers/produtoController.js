import * as produtoService from '../services/produtoService.js'
import Joi from 'joi'
 
export const produtoCreateSchema = Joi.object({
    descricao: Joi.string().max(200).required(),
    nome: Joi.string().max(50).required(),
    codigoCategoria: Joi.number().integer().required(),
    preco: Joi.number().required(),
    codigoTamanho: Joi.string(),
    codigoCor: Joi.string().max(2),
    colecao: Joi.string().max(30),
    marca: Joi.number().integer(),
    imagem: Joi.string().max(255)
}).min(1);