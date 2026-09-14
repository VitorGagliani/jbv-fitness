import * as itemPedidoService from '../services/itemPedido.js';
import Joi from 'joi';

export const itemPedidoCreateSchema = Joi.object({
    codigoItemPedido: Joi.number().required(),
    codigoPedido: Joi.number().required(),
    codigoProduto: Joi.number().required(),
    subtotal: Joi.number().precision(2).required(),
    valorUnitario: Joi.number().precision(2).required(),
    quantidade: Joi.number().integer().positive().required(),
});