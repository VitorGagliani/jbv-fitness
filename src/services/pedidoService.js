import db from '../cb/db.js';

export const findAll = async (status, codigoUsuario, formaPagamento, formaEntrega) => {
    let sql = 'SELECT * FROM pedido';
    const conditions = [];
    const values = [];

    if (status) {
        conditions.push('status = ?');
        values.push(status);
    }
    if (codigoUsuario) {
        conditions.push('codigoUsuario = ?');
        values.push(codigoUsuario);
    }
    if (formaPagamento) {
        conditions.push('formaPagamento = ?');
        values.push(formaPagamento);
    }
    if (formaEntrega) {
        conditions.push('formaEntrega = ?');
        values.push(formaEntrega);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (pedidoData) => {
    await db.query('INSERT INTO pedido SET ?', pedidoData);
    return pedidoData;
};

export const update = async (codigoPedido, pedidoData) => {
    const [result] = await db.query('UPDATE pedido SET ? WHERE codigoPedido = ?', [pedidoData, codigoPedido]);
    return result.affectedRows > 0;
};

export const remove = async (codigoPedido) => {
    const [result] = await db.query('DELETE FROM pedido WHERE codigoPedido = ?', [codigoPedido]);
    return result.affectedRows > 0;
};