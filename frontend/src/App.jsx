import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

import loginService from './ services/login'
import taskService from './ services/tasks'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // 登录模块
  const loginForm = () => {
    // 处理login的函数
    const handleLogin = async (event) => {
      event.preventDefault()
      // 向后端发起登入请求
      try {
        const user = await loginService.login({
          username, password,
        })
        // 更新状态量
        taskService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      console.log('logging in with', username, password)
    }


    return (
      <>
        <h2 className="text-center mb-4">Please Login</h2>
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
  // 任务模块
  const taskForm = () => (<></>)

  return (
    <div className='container mt-5'>
      
      {/* 用户未登录显示登录界面，用户登录则显示任务界面 */}
      {user === null  
        ? 
        <div>
          <h1 className="text-center mb-4">Welcome to kanban!</h1>
          {loginForm() }
        </div>
        : 
        <div>
          <h3 className="text-center mb-4">{user.username} logged-in</h3>
          {taskForm()}
        </div>
      }
    </div>
  )
}



export default App
