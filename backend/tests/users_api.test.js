const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const mongoose = require('mongoose') 
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const helper = require('./helper.test')
const logger = require('../utils/logger')

const User = require('../models/user')
const Task = require('../models/task')

describe('when there is initially some tasks saved', () => {
    beforeEach(async () => {
        // 在测试前删除数据库中所有数据
        await User.deleteMany({})
        // 将测试的数据存入数据库中
        const passwordHash = await bcrypt.hash('123456', 10)
        const user = new User({
            username: 'test',
            passwordHash
        })
        await user.save()
    })

    test('test create a user', async () => {
        const initialUsers = await helper.usersInDB()

        const newUser = {
            username: 'abc',
            password: '123'
        }
        // 测试发送post请求
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
            // 新的用户总数应该比原来大1
        const finalUsers = await helper.usersInDB()
        assert.strictEqual(finalUsers.length, initialUsers.length + 1)
        // 新用户用户名包含在所有用户中
        const finalUserNames = finalUsers.map(user => user.username)
        logger.info(finalUsers.find(user => user.username === 'abc'))
        assert(finalUserNames.includes(newUser.username))
    })

    test('test creating a user have the same username', async () => {
        const initialUsers = await helper.usersInDB()

        const newUser = {
            username: 'test',
            password: '123',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const finalUsers = await helper.usersInDB()
        // logger.info(result.body.error)
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(finalUsers.length, initialUsers.length)
    })

    after(async () => {
        // 删除数据库中所有数据
        // await User.deleteMany({})
        // 断开数据库连接
        await mongoose.connection.close()
    })
    
})