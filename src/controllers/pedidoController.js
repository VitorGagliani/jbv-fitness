
import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';


export const pedidoCreateSchema = Joi.object({
    codigoPedido: Joi.string().required(),
    status:Joi.string().required().max(10),
    formaPagamento:Joi.string().required().max(10),
    valor:Joi.number().required(),
    data:Joi.date().required(),
    codigoUsuario:Joi.string().required(),
    formaEntrega:Joi.string().required().max(2),
});

export const pedidoUpdateSchema = Joi.object({
    codigoPedido: Joi.string(),
    status:Joi.string().max(10),
    formaPagamento:Joi.string().max(10),
    valor:Joi.number(),
    data:Joi.date(),
    codigoUsuario:Joi.string(),
    formaEntrega:Joi.string().max(2),
}).min(1);



