import React from 'react'
import { useState, useEffect } from 'react';
import projectService from "../services/projects"
import taskService from "../services/tasks"
import Calendar from './Calendar';

const ViewPage = ({ user }) => {
  const [userProjects, setUserProjects] = useState([])
  const [projectTasks, setProjectTasks] = useState([])
  // 渲染时获得该用户的所有项目
  useEffect(() => getAllProjects(), [])
  // 渲染时获得该项目的所有任务
  useEffect(() => getAllProjectTasks(), [userProjects])
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
  // 从后端中获得所有项目的所有任务
  const getAllProjectTasks = () => {
    let allTasks = []
    console.log(userProjects)
    userProjects.forEach(project => {
      console.log(project.id)
      const params = {
        projectId: project.id
      }
      const responseData = taskService.getAll(params)
      responseData.then(currentProjectTasks => allTasks.push(...currentProjectTasks))
    })
    setProjectTasks(allTasks)
  }

  console.log(projectTasks);


  let dates = projectTasks
  console.log("dates", dates);
  
  if (dates.length > 0) {
    console.log(dates[0], dates[0].ddl, typeof dates[0].ddl);
    // 按时间升序排序
    dates.sort((a, b) => a.ddl.getTime() - b.ddl.getTime());

    // 或者使用数组的find方法来降序排序
    // dates.sort((a, b) => b.getTime() - a.getTime());

    console.log(dates);
  }





  return (
    <div>
      <Calendar />
    </div>
  );
};

export default ViewPage
