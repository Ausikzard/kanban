const User = require('../models/user')
const Task = require('../models/task')
const { notEqual } = require('assert')

// 初始的任务数组
const initTasks = [
    {
        content: 'Complete the monthly report',
        ddl: new Date('2024-08-04'),
        important: true,
        user: '64d9b9c4f83b3c2a0d2e2e7d', // 替换为实际的 User ID
      },
      {
        content: 'Prepare for the team meeting',
        ddl: new Date('2024-08-06'),
        important: false,
      },
      {
        content: 'Update project documentation',
        ddl: new Date('2024-08-10'),
        important: true,
      },
      {
        content: 'Fix bugs in the application',
        ddl: new Date('2024-08-20'),
        important: true,
      },
      {
        content: 'Organize team-building event',
        ddl: new Date('2024-08-25'),
        important: false,
      },
]

const nonExistingId = async () => {
    const task = new Task({
        content:'will be remove soon'
    })
    await task.save()
    await task.deleteOne()

    return task._id.toString()
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const tasksInDB = async () => {
    const tasks = await Task.find({})
    return tasks.map(task => task.toJSON())
}

module.exports = {
    initTasks, nonExistingId, usersInDB, tasksInDB
}