import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import projectService from './services/projects'
import taskService from "./services/tasks"
import Navbar from './components/Navbar'

function App() {
  // 表示全局登录的用户
  const [user, setUser] = useState(null)

  

  // 处理登录逻辑
  const setLoggingUser = async (loginUser) => {
    console.log(loginUser);
    
    setUser(loginUser)
    projectService.setToken(loginUser.token)
    taskService.setToken(loginUser.token)
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
    </>
  )
}



export default App
