const tasksRouter = require('express').Router()
const Task = require('../models/task')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// 获得用户的token 
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}

// 将一个任务保存到数据库中
tasksRouter.post('/', async(request, response) => {
    const body = request.body
    // 验证密钥合法性
    try {
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        if (!decodedToken.id){
            return response.status(401).json({
                error: 'token invalid'
            })
        }
    } catch (error){
        if (error.name === 'JsonWebTokenError') {
            // 密钥缺失或错误
            return response.status(400).json({ error: 'token missing or invalid' })
        }
        else if (error.name === 'TokenExpiredError') {
            // 密钥过期
            return response.status(401).json({
                error: 'token expired'
            })
        }
    }
    
    // 根据userId找到对应的用户
    const user = await User.findById(body.userId)
    // 创建对应任务
    const task = new Task({
        content: body.content,
        ddl: body.ddl,
        important: body.important,
        user: user.id
    })
    // 将任务存储到数据库中
    const savedTask = await task.save()
    // 更新对应用户数据
    user.tasks = user.tasks.concat(savedTask._id)
    await user.save()

    // 将结果返回给前端
    response.status(201).json(savedTask)
})

// 获取数据库中的所有任务
tasksRouter.get('/', async (request, response) => {
    const tasks = await Task
        .find({}).populate('user', { username: 1 })
        
    response.json(tasks)
})

module.exports = tasksRouter