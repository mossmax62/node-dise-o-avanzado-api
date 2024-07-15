import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import joyasRoute from './routes/joyas.route.js'
import logger from './middleware/logger.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/joyas', joyasRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
