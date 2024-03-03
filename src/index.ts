import http from 'http'

import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import router from './router'

const app = express()

app.use(cors({
  credentials: true,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

// conexion con mongodb usando mongoose
const MONGO_URL = 'mongodb://root:God061990@localhost:27017/admin?retryWrites=true&w=majority'
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err)
})

app.use('/api', router())