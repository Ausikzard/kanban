// 创建用户数据库
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    passwordHash: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
})

// 配置用户数据库
userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
        // 密码不应该返回给前端
        delete returnObject.passwordHash
    }
})

// 导出model
module.exports = mongoose.model('User', userSchema)