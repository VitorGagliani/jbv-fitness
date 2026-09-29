import db from '../db/db.js';
 
export const findAll = async (filtros = {}) => {
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
    } = filtros;
 
    let sql = 'SELECT * FROM produto';
    const conditions = [];
    const values = [];
 
    if (codigoProduto !== undefined && codigoProduto !== null && codigoProduto !== '') {
        conditions.push('codigoProduto = ?');
        values.push(codigoProduto);
    }
 
    if (descricao) {
        conditions.push('LOWER(descricao) LIKE ?');
        values.push(`%${descricao.toLowerCase()}%`);
    }
 
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }
 
    if (codigoCategoria !== undefined && codigoCategoria !== null && codigoCategoria !== '') {
        conditions.push('codigoCategoria = ?');
        values.push(codigoCategoria);
    }
 
    if (preco !== undefined && preco !== null && preco !== '') {
        conditions.push('preco = ?');
        values.push(preco);
    }
 
    if (codigoTamanho) {
        conditions.push('codigoTamanho = ?');
        values.push(codigoTamanho);
    }
 
    if (codigoCor) {
        conditions.push('codigoCor = ?');
        values.push(codigoCor);
    }
 
    if (colecao) {
        conditions.push('LOWER(colecao) LIKE ?');
        values.push(`%${colecao.toLowerCase()}%`);
    }
 
    if (marca !== undefined && marca !== null && marca !== '') {
        conditions.push('marca = ?');
        values.push(marca);
    }
 
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
 
    const [rows] = await db.query(sql, values);
    return rows;
};
 
export const create = async (produtoData) => {
    const newProduto = {
        ...produtoData
    };
 
    const [result] = await db.query(
        'INSERT INTO produto SET ?',
        newProduto
    );
 
    return {
        codigoProduto: result.insertId,
        ...newProduto
    };
};
 
export const update = async (codigoProduto, produtoData) => {
    if (codigoProduto === undefined || codigoProduto === null || codigoProduto === '') {
        throw new Error('codigoProduto é obrigatório.');
    }
 
    const [result] = await db.query(
        'UPDATE produto SET ? WHERE codigoProduto = ?',
        [produtoData, codigoProduto]
    );
 
    if (result.affectedRows === 0) {
        return null;
    }
 
    return {
        codigoProduto,
        ...produtoData
    };
};
 
export const remove = async (codigoProduto) => {
    if (codigoProduto === undefined || codigoProduto === null || codigoProduto === '') {
        throw new Error('codigoProduto é obrigatório.');
    }
 
    const [result] = await db.query(
        'DELETE FROM produto WHERE codigoProduto = ?',
        [codigoProduto]
    );
 
    return result.affectedRows > 0;
};