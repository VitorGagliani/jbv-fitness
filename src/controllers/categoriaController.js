import * as categoriaService from '../services/categoriaService.js';
import Joi from 'joi';

export const categoriaCreateSchema = Joi.object({
    codigoCategoria: Joi.string().required(),
    descricao: Joi.string().required(),
});

export const categoriaUpdateSchema = Joi.object({
    descricao: Joi.string(),
}).min(1);

export async function listarCategorias(req, res, next) {
    try {
        const { codigoCategoria, descricao } = req.query;
        const categorias = await categoriaService.findAll(
            codigoCategoria,
            descricao
        );

        return res.status(200).json(categorias);
    } catch (error) {
        return next(error);
    }
}

export async function buscarCategoria(req, res, next) {
    try {
        const categorias = await categoriaService.findAll(
            req.params.codigoCategoria
        );
        const categoria = categorias[0];

        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        return res.status(200).json(categoria);
    } catch (error) {
        return next(error);
    }
}

export async function criarCategoria(req, res, next) {
    try {
        const categoria = await categoriaService.create(req.body);
        return res.status(201).json(categoria);
    } catch (error) {
        return next(error);
    }
}

export async function atualizarCategoria(req, res, next) {
    try {
        const atualizada = await categoriaService.update(
            req.params.codigoCategoria,
            req.body
        );

        if (!atualizada) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        return res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' });
    } catch (error) {
        return next(error);
    }
}

export async function excluirCategoria(req, res, next) {
    try {
        const excluida = await categoriaService.remove(
            req.params.codigoCategoria
        );

        if (!excluida) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
}