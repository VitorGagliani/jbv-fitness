import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({message: 'Token inválido'});
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({message: 'Token mal formatado'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token inválido'});
        }
        req.userCpf = decoded.codigoUsuario; // Armazena o CPF do usuário autenticado no objeto req
        req.userEmail = decoded.tipo; // Armazena o email do usuário autenticado no objeto req
        next();
    });

    
}
export default authMiddleware;