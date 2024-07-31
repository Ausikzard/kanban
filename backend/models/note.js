require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

// 创建数据库Schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// 修改Schema的配置防止将_id和_v传给前端
noteSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject.id.toString()
        delete returnObject._id
        delete returnObject._v
    }
})

// 导出model
module.exports = mongoose.model('Note', noteSchema)

