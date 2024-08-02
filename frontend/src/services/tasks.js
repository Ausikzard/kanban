import axios from 'axios'
const baseUrl = 'http://localhost:5200/api/tasks'

// 令牌变量
let token = null

// 设置令牌
const setToken = newToken => {
    token = `bearer ${newToken}`
}

// 获取所有任务清单
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// 创建一个新任务
const create = async newObject => {
    // 将令牌添加至头部
    const config = {
        headers : { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// 修改一个任务 
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, update, setToken}