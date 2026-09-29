import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';

export const pedidoCreateSchema = Joi.object({
    status: Joi.string().max(10).required(),
    formaPagamento: Joi.string().max(10).required(),
    valor: Joi.number().precision(2).min(0).required(),
    data: Joi.date().required(),
    codigoUsuario: Joi.number().integer().positive().required(),
    formaEntrega: Joi.string().max(2).required(),
});

export const pedidoUpdateSchema = Joi.object({
    status: Joi.string().max(10),
    formaPagamento: Joi.string().max(10),
    valor: Joi.number().precision(2).min(0),
    data: Joi.date(),
    codigoUsuario: Joi.number().integer().positive(),
    formaEntrega: Joi.string().max(2),
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

export const listarPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoService.findAll(req.query);
        return res.json(pedidos);
    } catch (error) {
        return handleError(res, error);
    }
};

export const buscarPedido = async (req, res) => {
    try {
        const codigoPedido = getPositiveInteger(req.params.codigoPedido);
        if (!codigoPedido) {
            return res.status(400).json({ erro: 'codigoPedido deve ser um inteiro positivo.' });
        }

        const pedidos = await pedidoService.findAll({ codigoPedido });
        if (pedidos.length === 0) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        return res.json(pedidos[0]);
    } catch (error) {
        return handleError(res, error);
    }
};

export const criarPedido = async (req, res) => {
    try {
        const { error, value } = pedidoCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        const pedido = await pedidoService.create(value);
        return res.status(201).json(pedido);
    } catch (error) {
        return handleError(res, error);
    }
};

export const atualizarPedido = async (req, res) => {
    try {
        const codigoPedido = getPositiveInteger(req.params.codigoPedido);
        if (!codigoPedido) {
            return res.status(400).json({ erro: 'codigoPedido deve ser um inteiro positivo.' });
        }

        const { error, value } = pedidoUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        const atualizado = await pedidoService.update(codigoPedido, value);
        if (!atualizado) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        return res.json({ mensagem: 'Pedido atualizado com sucesso.' });
    } catch (error) {
        return handleError(res, error);
    }
};

export const excluirPedido = async (req, res) => {
    try {
        const codigoPedido = getPositiveInteger(req.params.codigoPedido);
        if (!codigoPedido) {
            return res.status(400).json({ erro: 'codigoPedido deve ser um inteiro positivo.' });
        }

        const removido = await pedidoService.remove(codigoPedido);
        if (!removido) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        return res.status(204).send();
    } catch (error) {
        return handleError(res, error);
    }
};
