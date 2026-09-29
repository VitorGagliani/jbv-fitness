import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';
 
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
});
 
export const produtoUpdateSchema = Joi.object({
    descricao: Joi.string().max(200),
    nome: Joi.string().max(50),
    codigoCategoria: Joi.number().integer(),
    preco: Joi.number(),
    codigoTamanho: Joi.string(),
    codigoCor: Joi.string().max(2),
    colecao: Joi.string().max(30),
    marca: Joi.number().integer(),
    imagem: Joi.string().max(255)
}).min(1);
 
const handleError = (res, error, defaultStatus = 500) => {
    const status = error.statusCode || defaultStatus;
 
    return res.status(status).json({
        erro: error.message || 'Erro interno do servidor'
    });
};
 
export const listarProdutos = async (req, res) => {
    try {
        const {
            codigoProduto,
            descricao,
            nome,
            codigoCategoria,
            preco,
            codigoTamanho,
            codigoCor,
            colecao,
            marca
        } = req.query;
 
        const produtos = await produtoService.findAll({
            codigoProduto,
            descricao,
            nome,
            codigoCategoria,
            preco,
            codigoTamanho,
            codigoCor,
            colecao,
            marca
        });
 
        return res.json(produtos);
    } catch (error) {
        return handleError(res, error);
    }
};
 
export const criarProduto = async (req, res) => {
    try {
        const { error, value } = produtoCreateSchema.validate(req.body);
 
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }
 
        const produto = await produtoService.create(value);
 
        return res.status(201).json(produto);
    } catch (error) {
        return handleError(res, error);
    }
};
 
export const atualizarProduto = async (req, res) => {
    try {
        const { codigoProduto } = req.params;
 
        if (!codigoProduto) {
            return res.status(400).json({ erro: 'codigoProduto é obrigatório.' });
        }
 
        const { error, value } = produtoUpdateSchema.validate(req.body);
 
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }
 
        const produtoAtualizado = await produtoService.update(Number(codigoProduto), value);
 
        if (!produtoAtualizado) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }
 
        return res.json(produtoAtualizado);
    } catch (error) {
        return handleError(res, error);
    }
};
 
export const excluirProduto = async (req, res) => {
    try {
        const { codigoProduto } = req.params;
 
        if (!codigoProduto) {
            return res.status(400).json({ erro: 'codigoProduto é obrigatório.' });
        }
 
        const removido = await produtoService.remove(Number(codigoProduto));
 
        if (!removido) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }
 
        return res.status(204).send();
    } catch (error) {
        return handleError(res, error);
    }
};