import db from '../db/db.js'
 
export const findAll = async (codigoProduto, nome, codigoCategoria) => {
 
    let sql = 'SELECT * FROM produto'
 
    const conditions = []
    const values = []
 
    if (codigoProduto) {
        conditions.push('codigoProduto = ?')
        values.push(codigoProduto)
    }
 
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?')
        values.push(`%${nome.toLowerCase()}%`)
    }
 
    if (codigoCategoria) {
        conditions.push('codigoCategoria = ?')
        values.push(codigoCategoria)
    }
 
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ')
    }
 
    const [result] = await db.query(sql, values)
 
    return result
}

export const create = async (produtoData) => {
    await db.query('INSERT INTO produto SET ?', produtoData)
    return produtoData
}

export const update = async (codigoProduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE codigoProduto = ?', [produtoData, codigoProduto])
    return result.affectedRows > 0
}

export const remove = async (codigoProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE codigoProduto = ?', [codigoProduto])
    return result.affectedRows > 0
}