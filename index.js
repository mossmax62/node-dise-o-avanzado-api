import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import joyasRoute from './routes/joyas.route.js'
import { pool } from './database/connection.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/joyas', joyasRoute)

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
