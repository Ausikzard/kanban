const jwt = require('jsonwebtoken')

// 获得用户的token 
const getTokenFrom = request => {
    const authorization = request.get('Authorization')   
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const tokenService = (request) => {
    // 验证密钥合法性
    try {
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        
        if (!decodedToken.id) {
            return response.status(401).json({
                error: 'token invalid'
            })
        }
    } catch (error) {
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
}

module.exports = tokenService