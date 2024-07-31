const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

//  连接数据库
mongoose.set('strictQuery', false)

logger.info('connecting to mongoDB...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// 配置中间件
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


app.use('/api/users', usersRouter)

module.exports = app