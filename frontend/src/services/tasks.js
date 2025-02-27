import axios from 'axios'
const baseUrl = 'http://localhost:5200/api/tasks'

// 令牌变量
let token = null

// 设置令牌
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

// 获取一个项目所有任务清单
const getAll = (params) => {
    const config = {
        headers: { Authorization: token },
        params: params
    };
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

// 创建一个新任务
const create = async newObject => {
    // 将令牌添加至头部
    console.log(token);

    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// 修改一个任务 
const update = async (params, body) => {
    // 将令牌添加至头部
    console.log(token);

    const config = {
        headers: { Authorization: token },
        params: params
    }
    const response = await axios.patch(`${baseUrl}/${params.id}`, body, config)
    return response.data
}

// 删除一个任务
const deleteTask = async params => {
    // 将令牌添加至头部
    console.log(token);

    const config = {
        headers: { Authorization: token },
        params: params
    }
    const response = await axios.delete(`${baseUrl}/${params.id}`, config)
    return response.data
}

export default { getAll, create, update, setToken, deleteTask }