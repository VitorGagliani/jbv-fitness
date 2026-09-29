import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object({
    codigoUsuario: Joi.number().integer(),
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
});

export const usuarioUpdateSchema = Joi.object({
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
});


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


export const criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.create(req.body);
        res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
    } catch (error) {
        console.error(error);
        if(error.code === 'ER_DUP_ENTRY'){
            res.status(400).json({ error: 'Email ou CPF já cadastrado' });
        } else {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
};


export const atualizarUsuario = async (req, res) => {
    try {
        const { codigoUsuario } = req.params;
        const updated = await usuarioService.update(codigoUsuario, req.body);
        if (!updated) {
            res.json({ message: 'Erro ao atualizar usuário' });
        }
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ err: 'Erro ao atualizar usuário' });
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const { codigoUsuario } = req.params;
        const deleted = await usuarioService.delete(codigoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};