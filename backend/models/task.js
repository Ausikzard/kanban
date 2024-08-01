// 创建数据库Schema
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  ddl: {
    type: Date,
    required: false
  },
  important: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// 修改Schema的配置防止将_id和_v传给前端
taskSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

// 导出model
module.exports = mongoose.model('Task', taskSchema)

