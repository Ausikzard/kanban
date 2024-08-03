import React from 'react'
import { useState, useEffect } from "react"
import projectService from "../services/projects"
import TodoTasks from './TodoTasks'
import DoingTasks from './DoingTasks'
import DoneTasks from './DoneTasks'

const TaskPage = ({ user, setLoggingUser }) => {
  const [userProjects, setUserProjects] = useState([])

  // 渲染时获得该用户的所有项目
  useEffect(() => getAllProjects(), [])
  
  // 得到用户的所有项目
  const getAllProjects = () => {
    if (user) {
      const params = {
        username: user.username
      }
      const responseData = projectService.getAll(params)
      responseData.then(initialProjects => setUserProjects(initialProjects))
    }
  }

  return (
    <>
      <section className='p-5'>
        <div className="container">
          <div className="row g-4">
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body">
                  <TodoTasks user={user} getAllProjects={getAllProjects} />
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <DoingTasks user={user} userProjects={userProjects} getAllProjects={getAllProjects}/>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-black text-light">
                <div className="card-body">
                  <DoneTasks user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TaskPage
