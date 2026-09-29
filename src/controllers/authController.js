import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService.js';

export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuarios = await usuarioService.findAll(null, email);

        const usuario = usuarios[0];
        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const payload = { codigoUsuario: usuario.codigoUsuario, tipo: usuario.tipo };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h' //tojem de expiração do token, nesse caso 1 hora
        });

        return res.json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Erro no login' });
    }
}