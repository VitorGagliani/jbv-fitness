import * as itemPedidoService from '../services/itemPedido.js';
import Joi from 'joi';

export const itemPedidoCreateSchema = Joi.object({
    codigoPedido: Joi.number().integer().positive().required(),
    codigoProduto: Joi.number().integer().positive().required(),
    valorUnitario: Joi.number().precision(2).min(0).required(),
    quantidade: Joi.number().integer().positive().required(),
});

export const itemPedidoUpdateSchema = Joi.object({
    codigoProduto: Joi.number().integer().positive(),
    valorUnitario: Joi.number().precision(2).min(0),
    quantidade: Joi.number().integer().positive(),
}).min(1);

const handleError = (res, error) => {
    console.error(error);
    return res.status(error.statusCode || 500).json({
        erro: error.message || 'Erro interno do servidor'
    });
};

const getPositiveInteger = (value) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export const listarItensPedido = async (req, res) => {
    try {
        const { codigoPedido, codigoProduto, quantidade } = req.query;
        const itens = await itemPedidoService.findAll(
            codigoPedido,
            codigoProduto,
            quantidade
        );
        return res.json(itens);
    } catch (error) {
        return handleError(res, error);
    }
};

export const criarItemPedido = async (req, res) => {
    try {
        const { error, value } = itemPedidoCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        const item = await itemPedidoService.create(value);
        return res.status(201).json(item);
    } catch (error) {
        return handleError(res, error);
    }
};

export const atualizarItemPedido = async (req, res) => {
    try {
        const codigoPedido = getPositiveInteger(req.params.codigoPedido);
        if (!codigoPedido) {
            return res.status(400).json({ erro: 'codigoPedido deve ser um inteiro positivo.' });
        }

        const { error, value } = itemPedidoUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        const atualizado = await itemPedidoService.update(codigoPedido, value);
        if (!atualizado) {
            return res.status(404).json({ erro: 'Item do pedido não encontrado.' });
        }

        return res.json({ mensagem: 'Item do pedido atualizado com sucesso.' });
    } catch (error) {
        return handleError(res, error);
    }
};

export const excluirItemPedido = async (req, res) => {
    try {
        const codigoPedido = getPositiveInteger(req.params.codigoPedido);
        if (!codigoPedido) {
            return res.status(400).json({ erro: 'codigoPedido deve ser um inteiro positivo.' });
        }

        const removido = await itemPedidoService.remove(codigoPedido);
        if (!removido) {
            return res.status(404).json({ erro: 'Item do pedido não encontrado.' });
        }

        return res.status(204).send();
    } catch (error) {
        return handleError(res, error);
    }
};
