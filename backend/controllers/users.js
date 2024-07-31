const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

// 保存用户名和密码的hash值
usersRouter.post('/', async (request, response) => {
    // 确保密码为文本
    const username = request.body.username
    const password = request.body.password.toString()
    // 进行hash加密
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    // 生成新的user数据
    const user = new User({
        username,
        passwordHash,
    })
    // 存储到数据库中
    const savedUser = await user.save()
    // 返回结果给前端
    response.status(201).json(savedUser)
})


module.exports = usersRouter