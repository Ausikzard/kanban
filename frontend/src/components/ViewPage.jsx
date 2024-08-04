import React, { useState, useEffect } from 'react';
import projectService from "../services/projects";
import taskService from "../services/tasks";
import TaskCalendar from './TaskCalendar';

const ViewPage = ({ user }) => {
  const [userProjects, setUserProjects] = useState([]);
  const [allTasks, setAllTasks] = useState(null); // 初始化为null，表示未加载

  // 渲染时获得该用户的所有项目
  useEffect(() => {
    const loadProjects = async () => {
      if (user) {
        const params = {
          username: user.username
        };
        const projects = await projectService.getAll(params);
        setUserProjects(projects);
      }
    };

    loadProjects();
  }, [user]); // 添加user到依赖数组，以便在user变化时重新加载

  // 从后端中获得所有项目的所有任务
  useEffect(() => {
    const loadTasks = async () => {
      let allTasks = [];
      try {
        for (const project of userProjects) {
          const params = {
            projectId: project.id
          };
          const tasks = await taskService.getAll(params);
          allTasks = allTasks.concat(tasks);
        }
        // 排序任务
        allTasks.sort((a, b) => new Date(a.ddl) - new Date(b.ddl));
        setAllTasks(allTasks); // 更新状态
      } catch (exception) {
        if (exception.response) {
          if (exception.response.status === 400)
            alert('密钥缺失或错误');
          else if (exception.response.status === 401)
            alert('密钥过期');
        } else {
          console.error('Error fetching tasks:', exception);
        }
      }
    };

    if (userProjects.length > 0) {
      loadTasks();
    }
  }, [userProjects]); // 依赖数组包含userProjects，以便在项目变化时重新加载任务

  return (
    <div>
      <section className='p-5'>
        <div className="container">
          <div className="row g-4">
            {allTasks && allTasks.length > 0
              ? allTasks.map(task => <TaskCalendar key={task.id} task={task} />)
              :
              <div className="col-md mt-2 mb-2 ms-4 me-4">
                <div className="card row item-container rounded bg-secondary">
                  <div className="card-body">
                    <div className="card-title text-center text-light">
                      暂且没有任务显示
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewPage;