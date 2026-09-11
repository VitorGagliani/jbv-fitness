import db from "../db/db.js";
import bcrypt from 'bcrypt'


export const findAll = async(codigoUsuario, email) => {


    let sql = 'SELECT * FROM usuario';


    const conditions = [];
    const values = [];


    if(codigoUsuario){
        conditions.push('codigoUsuario = ?');
        values.push(codigoUsuario)
    }


    if(email){
        conditions.push('email = ?');
        values.push(email)
    }


    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ');
    }


    const [rows] = await db.query(sql, values);
    return rows;

}

export const findAdmin = async() => {
    const [rows] = await db.query(`SELECT * FROM usuario WHERE tipo = 'ADM'`);
    return rows;
}


export const create = async (usuarioData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);


    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };

    await db.query('INSERT INTO usuario SET ?', newUsuario)

    delete newUsuario.senha;
    return newUsuario;
}

export const update = async (usuarioData, codigo) => {
    if(usuarioData.senha){
        const saltRounds = 10;
        usuarioData.senha = await bcrypt.hash(usuarioData.senha, saltRounds);
    }

    const [result] = await db.query('UPDATE usuario SET ? WHERE codigo = ?', [usuarioData, codigo]);
    return result.affectedRows > 0;
};

export const remove = async (codigo) => {
    const [result] = await db.query('DELETE FROM usuario WHERE codigo = ?', [codigo]);
    return result.affectedRows > 0
}