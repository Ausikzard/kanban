// 创建数据库Schema
const mongoose = require('mongoose')
const project = require('./project')
const file = require('./file')

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  ddl: {
    type: Date,
    default: new Date(),
    required: false
  },
  comments: [
    {
      type: String,
    }
  ],
  attachments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }
],
  status: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
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

