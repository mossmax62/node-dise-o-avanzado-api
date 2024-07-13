import 'dotenv/config'
import format from 'pg-format'
import { pool } from '../database/connection.js'

// Creamos una constante con la URL de la aplicación según el entorno
// DOMAIN_URL_APP crearla al momento de desplegar la aplicación
// PORT se debe agregar al archivo .env
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DOMAIN_URL_APP
    : `http://localhost::${process.env.PORT}`

const findAll = async ({ limit = 5, order = 'ASC', page = 1 }) => {
  // Consulta para contar el número total de filas en la tabla 'inventario'
  const countQuery = 'SELECT COUNT(*) FROM inventario'
  const { rows: countResult } = await pool.query(countQuery)
  const totalRows = parseInt(countResult[0].count, 10)

  // Calcula el número total de páginas
  const totalPages = Math.ceil(totalRows / limit)

  const query = 'SELECT * FROM inventario ORDER BY precio %s LIMIT %s OFFSET %s'
  const offset = (page - 1) * limit
  const formattedQuery = format(query, order, limit, offset)
  const { rows } = await pool.query(formattedQuery)

  // Devuelve un array con los resultados y un enlace a cada uno de ellos
  const results = rows.map((row) => {
    return {
      ...row,
      href: `${BASE_URL}/joyas/${row.id}`
    }
  })

  // Devuelve un objeto con los resultados, el número total de páginas y los enlaces a la página siguiente y anterior
  return {
    results,
    totalPages,
    page,
    limit,
    next:
      totalPages <= page
        ? null
        : `${BASE_URL}/joyas?limit=${limit}&page=${page + 1}`,
    previous:
      page <= 1 ? null : `${BASE_URL}/joyas?limit=${limit}&page=${page - 1}`
  }
}

const findById = async (id) => {
  const query = 'SELECT * FROM inventario WHERE id = $1'
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

export const todoModel = {
  findAll,
  findById
}
