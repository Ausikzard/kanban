const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const helper = require('../tests/helper.test')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    // 根据用户名找到相应的用户
    const user = await User.findOne({ username })
    const isPassWordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    // 用户名不存在或密码不正确
    if (!(user && isPassWordCorrect)) {
        return response.status(401).json({
            error: 'invaild username or wrong password'
        })
    }
    // 生成对应用户令牌,有效期为1h
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        {expiresIn: 60*60}
    )

    response.status(200).send({token, username})
})

module.exports = loginRouter