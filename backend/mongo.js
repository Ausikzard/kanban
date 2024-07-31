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


// 定义model

const Note = mongoose.model('Note', noteSchema)

// // 创建对象

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// // 将对象保存到数据库中

// note.save().then(result => {
//     console.log('note saved!')
//     // 关闭数据库
//     mongoose.connection.close()
// })

// 检索数据库中所有对象
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    // 关闭数据库
    mongoose.connection.close()
})

// // 检索数据库中所有重要的对象
// Note.find({ important: true }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     // 关闭数据库
//     mongoose.connection.close() 
// })


