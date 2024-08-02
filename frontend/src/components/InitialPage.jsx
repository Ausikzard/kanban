import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registerService from "../services/register"

const InitialPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registerStatus, setRegisterStatus] = useState(null)

    // 处理点击注册事件
    const onregister = async (event) => {
        console.log("点击");
        event.preventDefault()
        // 向后端申请注册用户
        try {
            const response = await registerService.register({
                username,
                password
            })
            console.log(registerStatus)
            setRegisterStatus('成功')
            console.log(registerStatus)
        } catch (exception) {
            setUsername('')
            setPassword('')
            console.log(exception);
            if (exception.response.status === 400)
                setRegisterStatus('用户名重复,请重新输入用户名')
        }
        console.log('registering with', username, password)
    }

    // 处理跳转登录按钮
    const navigate = useNavigate();

    // 展示注册结果
    const display = () => {
        const textColor = registerStatus === '成功'
            ? "text-success"
            : "text-danger"
        const pClassName = `mb-3 text-center fw-bold ${textColor}`
        return (
            <div className={pClassName}>{registerStatus}</div>
        )
    }

    return (
        <>
            <section className="p-5 bg-dark text-light">
                <div className="container">
                    <div className="d-flex">
                        <div className="text-center">
                            <h1 className="my-4">欢迎使用<span className="text-primary">敏捷看板</span></h1>
                            <button
                                className="btn btn-primary btn-lg "
                                onClick={() => navigate('/login')}
                            >
                                点击登录
                            </button>
                        </div>
                        <img src="../../public/showcase.svg" alt="showcase" className="w-50 h-50" />
                    </div>
                </div>
            </section>
            <section className="p-5 bg-primary text-light">
                <div className="container">
                    <div>
                        <h3 className="mb-3 text-center">注册账号使用看板</h3>
                        {display()}
                        <div className="inputs">
                            <div className="input-username d-flex full-width my-2">
                                <label htmlFor="username" className="me-3 col-sm-3 text-strat">用户名: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="username"
                                    placeholder="请输入用户名"
                                    value={username}
                                    onChange={({ target }) => setUsername(target.value)}
                                />
                            </div>
                            <div className="input-password d-flex full-width my-2">
                                <label htmlFor="password" className="me-3 col-sm-3 text-strat">密码: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="username"
                                    placeholder="请输入密码"
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center my-2">
                            <button type="submit" className="btn btn-dark btn-lg" onClick={onregister}>注册</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InitialPage