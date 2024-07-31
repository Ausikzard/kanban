const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// 启动后端服务器并监听
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})