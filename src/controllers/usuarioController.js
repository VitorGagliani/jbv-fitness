import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioSchema = Joi.object({
    codigoUsuario: Joi.number().integer().positive(),
    senha: Joi.string().max(50).required(),
    tipo: Joi.string().max(3).required(),
    telefone: Joi.string().max(11),
    logradouro: Joi.string().max(100),
    bairro: Joi.string().max(100),
    email: Joi.string().email().max(100),
    cpf: Joi.string().max(11),
    nome: Joi.string().max(50),
    sobrenome: Joi.string().max(50),
    nascimento: Joi.date()
}).min(1);

export const getUsuarios = async (req, res) => {
    try {
        const { codigoUsuario, email } = req.query;
        const usuarios = await usuarioService.findAll(codigoUsuario, email);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAdmins = async (req, res) => {
    try {
        const admins = await usuarioService.findAdmin();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};