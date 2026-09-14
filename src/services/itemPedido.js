export const findAll = async (codigoPedido, codigoProduto, quantidade) => {
    let sql = 'SELECT * FROM item_pedido';
    const conditions = [];
    const values = [];

    if (codigoPedido) {
        conditions.push('codigoPedido = ?');
        values.push(codigoPedido);
    }

    if (codigoProduto) {
        conditions.push('codigoProduto = ?');
        values.push(codigoProduto);
    }

    if (quantidade) {  
        conditions.push('quantidade = ?');
        values.push(quantidade);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [result] = await db.query(sql, values);

    return result;
}

export const create = async (itemPedidoData) => {
    await db.query('INSERT INTO item_pedido SET ?', itemPedidoData);
    return itemPedidoData;
}

export const update = async (codigoPedido, itemPedidoData) => {
    const [result] = await db.query('UPDATE item_pedido SET ? WHERE codigoPedido = ?', [itemPedidoData, codigoPedido]);
    return result.affectedRows > 0;
}

export const remove = async (codigoPedido) => {
    const [result] = await db.query('DELETE FROM item_pedido WHERE codigoPedido = ?', [codigoPedido]);
    return result.affectedRows > 0;
}