const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

// 注册用户
usersRouter.post('/', async (request, response) => {
    const username = request.body.username
    const password = request.body.password
    // 进行hash加密
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    // 生成新的user数据
    const user = new User({
        username,
        passwordHash,
    })
    try {
        // 存储到数据库中
        const savedUser = await user.save()
        // 返回结果给前端
        response.status(201).json(savedUser)
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000){
            // 由用户名重复引起的错误
            return response.status(400).json({ error: 'expected `username` to be unique' })
        }
        // 其他错误
        return response.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = usersRouter