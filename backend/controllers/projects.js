const projectsRouter = require('express').Router()
const Projecct = require('../models/project')
const User = require('../models/user')
const tokenService = require('./token')



// 将一个项目保存到数据库中
projectsRouter.post('/', async (request, response) => {
    const body = request.body

    // 检查token合法性
    tokenService(request)

    // 根据username找到对应的用户
    const user = await User.findOne({ username: body.username })

    // 创建对应项目
    const project = new Projecct({
        title: body.title,
        important: body.important,
        user: user.id,
        tasks: []
    })
    // 将任务存储到数据库中
    const savedProject = await project.save()
    // 更新对应用户数据
    user.projects = user.projects.concat(savedProject._id)
    await user.save()
    // 将结果返回给前端
    response.status(201).json(savedProject)
})


// 获取数据库中一个用户的所有项目
projectsRouter.get('/', async (request, response) => {
    const { username } = request.query
    // 检查token合法性
    tokenService(request)
    // 根据username找到对应的用户
    const user = await User.findOne({ username: username })
    if (user.projects !== null) {
        const projects = await Projecct
            .find({ _id: { $in: user.projects } })

        response.json(projects)
    }
    else {
        response.json([])
    }
})

// 修改数据库中一个项目的内容
projectsRouter.patch('/:id', async (request, response) => {
    try {
        const body = request.body
        const id = request.params.id
        const updateProjecct = await Projecct.findByIdAndUpdate(id, body, { new: true })
        // 检查是否找到并更新了项目
        if (!updateProjecct) {
            return response.status(404).json({ message: 'Task not found' })
        }
        
        // 返回更新后的项目
        response.status(200).json(updateProjecct)
    } catch (error) {
        // 处理错误情况
        response.status(500).json({ message: error.message })
    }
})

// 删除一个项目
projectsRouter.delete('/:id', async (request, response) => {
    await Projecct.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = projectsRouter