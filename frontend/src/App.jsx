import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import loginService from './services/login'
import taskService from './services/tasks'

import LoginForm from './components/LoginForm'
import Notification from './components/Noteification'
import Tasks from './components/Tasks'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  // 在用户登录了获取任务数据   
  useEffect(() => {
    taskService
      .getAll()
      .then(initialTasks => setTasks(initialTasks))
  }, [tasks])

  // 处理登录逻辑
  const setLoggingUser = async (loginUser) => {
    setUser(loginUser)
    taskService.setToken(user.token)
  }

  // 处理任务逻辑
  const addTask = (event) => {
    event.preventDefault()
    // const TaskObject = {

    // }
  }

  const updateTask = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Navbar user={user} setLoggingUser={setLoggingUser}/>
      {/* 用户未登录显示登录界面，用户登录则显示任务界面 */}
      {/* {
        user === null
          ?
          <div>
            <h1 className="text-center mb-4">Welcome to kanban!</h1>
            <h2 className="text-center mb-4">Please Login</h2>
            <Notification message={errorMessage} />
            <LoginForm onLogin={onLogin} />
          </div>
          :
          <div>
            <h3 className="text-center mb-4">{user.username} logged-in</h3>
            <Tasks tasks={tasks} addTask={addTask} updateTask={updateTask} />
          </div>
      } */}
    </>
  )
}



export default App
