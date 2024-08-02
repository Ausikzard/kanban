import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
    // 设置状态量
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // 处理login的函数
    const handleLogin = async (event) => {
        event.preventDefault()
        onLogin(username, password, setUsername, setPassword)
    }


    return (
        <>
        <div className="row justify-content-center">
            <div className="col-md-12">
            <form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-3 col-form-label">Username: </label>
                <div className="col-sm-9">
                    <input 
                    type="text" 
                    value={username}
                    className="form-control" 
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                </div>
                <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password: </label>
                <div className="col-sm-9">
                    <input 
                    type="text" 
                    value={password}
                    className="form-control" 
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            </div>
        </div>
        </>
    )
}

export default LoginForm