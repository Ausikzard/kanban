const tasksRouter = require('express').Router()
const Task = require('../models/task')
const Project = require('../models/project')
const tokenService = require('./token')
const { response } = require('express')


// 将一个任务保存到数据库中一个项目
tasksRouter.post('/', async (request, response) => {
    const body = request.body
    // 检查token合法性
    tokenService(request)
    // 根据projectId找到对应的项目
    const project = await Project.findById(body.projectId)
    // 创建对应任务
    const task = new Task({
        content: body.content,
        ddl: body.ddl,
        project: project._id,
    })
    // 将任务存储到数据库中
    const savedTask = await task.save()
    // 更新对应项目数据
    project.tasks = project.tasks.concat(savedTask._id)
    await project.save()
    // 将结果返回给前端
    response.status(201).json(savedTask)
})

// 获取数据库中一个项目的所有任务
tasksRouter.get('/', async (request, response) => {
    const { projectId } = request.query
    // 检查token合法性
    tokenService(request)
    // 根据prejectId找到对应的项目
    const project = await Project.findById(projectId)
    if (project.tasks !== null) {
        const tasks = await Task
            .find({ _id: { $in: project.tasks } }).populate('project', { title: 1 })
        response.json(tasks)
    }
    else {
        response.json([])
    }
})

// 修改数据库中一个任务的内容
tasksRouter.patch('/:id', async (request, response) => {
    try {
        const body = request.body
        const id = request.params.id
        const updateTask = await Task.findByIdAndUpdate(id, body, { new: true })
        // 检查是否找到并更新了任务
        if (!updateTask) {
            return response.status(404).json({ message: 'Task not found' })
        }
        
        // 返回更新后的任务
        response.status(200).json(updateTask)
    } catch (error) {
        // 处理错误情况
        response.status(500).json({ message: error.message })
    }
})

// 删除一个任务
tasksRouter.delete('/:id', async (request, response) => {
    await Task.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = tasksRouter