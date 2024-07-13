import { joyasModel } from '../models/joyas.models.js'

const read = async (req, res) => {
  const { limit = 5, orderBy, page = 1 } = req.query
  console.log(orderBy)
  let order
  if (orderBy) {
    order = orderBy.split('_')
    console.log(order)
  }

  // Utilizar una expresión regular para verificar si 'page' es un número válido
  const isPageValid = /^[1-9]\d*$/.test(page)

  // Validar el resultado de la expresión regular
  if (!isPageValid) {
    return res.status(400).json({ message: 'Invalid page number, number > 0' })
  }

  try {
    const joyas = await joyasModel.findAll({ limit, order, page })
    return res.json(joyas)
  } catch (error) {
    console.log(error)
    if (error.code) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const readById = async (req, res) => {
  const id = req.params.id

  try {
    const joya = await joyasModel.findById(id)

    if (!joya) {
      res.status(404).json({ message: 'Joya not found' })
    }
    res.json(joya)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const readByFilters = async (req, res) => {
  const { precioMin, precioMax, categoria, metal } = req.query

  try {
    const joyas = await joyasModel.findByFilters({
      precioMin,
      precioMax,
      categoria,
      metal
    })

    if (joyas.length === 0) {
      return res.status(404).json({ message: 'No results found' })
    }

    return res.json(joyas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const joyasController = {
  read,
  readById,
  readByFilters
}
