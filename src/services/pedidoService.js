import db from '../db/db.js';

export const findAll = async (filtros = {}) => {
    const { codigoPedido, status, codigoUsuario, formaPagamento, formaEntrega } = filtros;
    let sql = 'SELECT * FROM pedido';
    const conditions = [];
    const values = [];

    for (const [column, value] of Object.entries({
        codigoPedido,
        status,
        codigoUsuario,
        formaPagamento,
        formaEntrega,
    })) {
        if (value !== undefined && value !== null && value !== '') {
            conditions.push(`${column} = ?`);
            values.push(value);
        }
    }

    if (conditions.length) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (pedidoData) => {
    await db.query('INSERT INTO pedido SET ?', pedidoData);
    return pedidoData;
};

export const update = async (codigoPedido, pedidoData) => {
    const [result] = await db.query(
        'UPDATE pedido SET ? WHERE codigoPedido = ?',
        [pedidoData, codigoPedido]
    );
    return result.affectedRows > 0;
};

export const remove = async (codigoPedido) => {
    const [result] = await db.query(
        'DELETE FROM pedido WHERE codigoPedido = ?',
        [codigoPedido]
    );
    return result.affectedRows > 0;
};
