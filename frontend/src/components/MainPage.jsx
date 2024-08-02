import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registerService from "../services/register"
import loginService from "../services/login"

const MainPage = ({setLoggingUser}) => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerStatus, setRegisterStatus] = useState(null)
    const [loginStatus, setLoginStatus] = useState(null)

    // 处理点击注册事件
    const onRegister = async (event) => {
        event.preventDefault()
        // 向后端申请注册用户
        try {
            await registerService.register({
                username: registerUsername,
                password: registerPassword
            })
            setRegisterStatus('成功')
        } catch (exception) {
            setRegisterUsername('')
            setRegisterPassword('')
            if (exception.response.status === 400)
                setRegisterStatus('用户名重复,请重新输入用户名')
        }
    }

    // 处理点击登录事件
    const onLogin = async (event) => {
        event.preventDefault()
        // 向后端申请用户登录
        try {
            const loginUser = await loginService.login({
                username: loginUsername,
                password: loginPassword
            })
            setLoggingUser(loginUser)
            setLoginStatus('成功')
            // 跳转到任务界面
            navigate('/tasks')
        } catch (exception) {
            setLoginUsername('')
            setLoginPassword('')
            if (exception.response.status === 401)
                setLoginStatus('用户名或密码错误')
        }
    }

    // 处理使用按钮
    const navigate = useNavigate()

    // 展示注册和登录结果
    const display = (message) => {
        const textColor = message === '成功'
            ? "text-success"
            : "text-danger"
        const pClassName = `mb-3 text-center fw-bold ${textColor}`
        return (
            <div className={pClassName}>{message}</div>
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
                                onClick={() => navigate('/tasks')}
                            >
                                点击使用
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
                        {display(registerStatus)}
                        <div className="inputs">
                            <div className="input-username d-flex full-width my-2">
                                <label htmlFor="username" className="me-3 col-sm-3 text-strat">用户名: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="registerUsername"
                                    placeholder="请输入用户名"
                                    value={registerUsername}
                                    onChange={({ target }) => setRegisterUsername(target.value)}
                                />
                            </div>
                            <div className="input-password d-flex full-width my-2">
                                <label htmlFor="password" className="me-3 col-sm-3 text-strat">密码: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="registerPassword"
                                    placeholder="请输入密码"
                                    value={registerPassword}
                                    onChange={({ target }) => setRegisterPassword(target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center my-2">
                            <button type="submit" className="btn btn-dark btn-lg" onClick={onRegister}>注册</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-5 bg-secondary text-light">
                <div className="container">
                    <div>
                        <h3 className="mb-3 text-center">登录账号</h3>
                        {display(loginStatus)}
                        <div className="inputs">
                            <div className="input-username d-flex full-width my-2">
                                <label htmlFor="username" className="me-3 col-sm-3 text-strat">用户名: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="loginUsername"
                                    placeholder="请输入用户名"
                                    value={loginUsername}
                                    onChange={({ target }) => setLoginUsername(target.value)}
                                />
                            </div>
                            <div className="input-password d-flex full-width my-2">
                                <label htmlFor="password" className="me-3 col-sm-3 text-strat">密码: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="loginPassword"
                                    placeholder="请输入密码"
                                    value={loginPassword}
                                    onChange={({ target }) => setLoginPassword(target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center my-2">
                            <button type="submit" className="btn btn-dark btn-lg" onClick={onLogin}>登录</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainPage