export const findAll = async (codigoCategoria, descricao) => {
    let sql = 'SELECT * from categoria';
    const conditions = [];
    const values = [];

    if (codigoCategoria) {
        conditions.push('codigoCategoria = ?')
        values.push(codigoCategoria);
    }
    if (descricao) {
        conditions.push('LOWER(descricao) LIKE ?')
        values.push(`%${descricao.toLowerCase()}%`)
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};
export const create = async (categoriaData) => {
    await db.query('INSERT INTO categoria SET ?', categoriaData);
    return categoriaData;
};

export const update = async (codigoCategoria, categoriaData) => {
    const [result] = await db.query('UPDATE categoria SET ? WHERE codigoCategoria = ?', [categoriaData, codigoCategoria]);
    return result.affectedRows > 0;
};

export const remove = async (codigoCategoria) => {
    const [result] = await db.query('DELETE FROM categoria WHERE codigoCategoria = ?', [codigoCategoria]);
    return result.affectedRows > 0;
};