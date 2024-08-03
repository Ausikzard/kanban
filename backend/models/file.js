// 创建数据库Schema
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
      filename: {
        type: String,
        default: ''
      },
      path: {
        type: String,
        default: ''
      }
})

// 修改Schema的配置防止将_id和_v传给前端
fileSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

// 导出model
module.exports = mongoose.model('File', fileSchema)

