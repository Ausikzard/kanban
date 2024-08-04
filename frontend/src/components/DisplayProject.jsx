import { useState, useEffect } from "react"
import taskService from "../services/tasks"
import CraeteTaskDialog from "./CreateTaskDialog"
import UpdateTaskDialog from "./UpdateTaskDialog"
import UpdateProjectDialog from "./UpdateProjectDialog"
import DeleteTaskDialog from "./DeleteTaskDialog"
import DeleteProjectDialog from "./DeleteProject"
import CommentDialog from "./CommentDialog"
import ModifyTaskStatusDialog from "./ModifyTaskStatusDialog"
import ModifyProjectStatusDialog from "./ModifyProjectStatusDialog"

// 展示一个项目的所有任务
const DisplayProject = ({ project, getAllProjects, projectStatus }) => {
    const [projectTasks, setProjectTasks] = useState([])
    // 渲染时获得该项目的所有任务
    useEffect(() => getAllProjectTasks(), [])
    // 从后端中获得项目所有任务
    const getAllProjectTasks = () => {
        const params = {
            projectId: project.id
        }
        const responseData = taskService.getAll(params)
        responseData.then(currentTasks => setProjectTasks(currentTasks))
    }
    // 展示具体任务函数
    const tastItem = (task, index, status) => {
        const containerBgColor = status ? "row item-container rounded bg-success" : "row item-container rounded bg-white "
        console.log(task, containerBgColor);

        if (projectStatus === true) {
            return (
                <li className="nav-item mt-2 mb-2" key={index}>
                    <div className="row item-container rounded bg-success">
                        <div className="col">
                            <p className="navbar-brand text-dark mt-1 mb-1">第{index}个任务名称: {task.content}</p>
                            <p className="navbar-brand text-dark mt-1 mb-1">DDL: {task.ddl.toString().replace('T', ' ').replace('.000Z', '')}</p>
                        </div>
                        <div className="col text-center d-flex align-items-center justify-content-center">
                            <div className="block">
                                <button className="btn btn-primary btn-sm mt-1 mb-1 me-1 ms-1" data-bs-toggle="modal" data-bs-target={"#commentTask-" + task.id}>
                                    评论任务
                                </button>
                                <CommentDialog task={task} getAllProjectTasks={getAllProjectTasks} />
                            </div>
                        </div>
                    </div>
                </li>
            )
        }
        else return (
            <li className="nav-item mt-2 mb-2" key={index}>
                <div className={containerBgColor}>
                    <div className="col">
                        <p className="navbar-brand text-dark mt-1 mb-1">第{index}个任务名称: {task.content}</p>
                        <p className="navbar-brand text-dark mt-1 mb-1">DDL: {task.ddl.toString().replace('T', ' ').replace('.000Z', '')}</p>
                    </div>
                    <div className="col text-center d-flex align-items-center justify-content-center">
                        <div className="block">
                            <button className="btn btn-primary btn-sm mt-1 mb-1 me-1 ms-1" data-bs-toggle="modal" data-bs-target={"#updateTask-" + task.id}>
                                修改任务
                            </button>
                            <UpdateTaskDialog task={task} getAllProjectTasks={getAllProjectTasks} />
                            <button className="btn btn-primary btn-sm mt-1 mb-1 me-1 ms-1" data-bs-toggle="modal" data-bs-target={"#commentTask-" + task.id}>
                                评论任务
                            </button>
                            <CommentDialog task={task} getAllProjectTasks={getAllProjectTasks} />
                        </div>
                        <div className="block">
                            <button className="btn btn-primary btn-sm mt-1 mb-1 me-1 ms-1" data-bs-toggle="modal" data-bs-target={"#finishTask-" + task.id}>
                                修改状态
                            </button>
                            <ModifyTaskStatusDialog task={task} getAllProjectTasks={getAllProjectTasks} />
                            <button className="btn btn-primary btn-sm mt-1 mb-1 me-1 ms-1" data-bs-toggle="modal" data-bs-target={"#deleteTask-" + task.id}>
                                删除任务
                            </button>
                            <DeleteTaskDialog task={task} getAllProjectTasks={getAllProjectTasks} />
                        </div>

                    </div>
                </div>
            </li>
        )
    }


    // 过滤出两种状态的任务
    const ImcompletedTasks = projectTasks.filter(task => task.status === false)
    const CompletedTasks = projectTasks.filter(task => task.status === true)
    return (
        <>
            <nav className="navbar  bg-success navbar-dark rounded mb-2 ">
                <div className="container">

                    <a href="#" className="navbar-brand text-dark">项目名称:{project.title}</a>
                    <div className="block">
                        <button className="navbar-toggler bg-primary text-dark me-2 mb-2" data-bs-toggle="modal" data-bs-target={"#updateProject-" + project.id}>
                            修改项目
                        </button>
                        <UpdateProjectDialog project={project} getAllProjects={getAllProjects} />
                        <button className="navbar-toggler bg-primary text-dark me-2 mb-2" data-bs-toggle="modal" data-bs-target={"#finishProject-" + project.id}>
                            修改状态
                        </button>
                        <ModifyProjectStatusDialog project={project} getAllProjects={getAllProjects} />
                        <button className="navbar-toggler bg-primary text-dark me-2 mb-2" data-bs-toggle="modal" data-bs-target={"#deleteProject-" + project.id}>
                            删除项目
                        </button>
                        <DeleteProjectDialog project={project} getAllProjects={getAllProjects} />
                        <button className="navbar-toggler bg-primary text-dark" type="button" data-bs-toggle="collapse" data-bs-target={"#navmenu-" + project.id}>
                            点击展开/收起
                        </button>


                    </div>


                    <div className="collapse navbar-collapse text-center" id={"navmenu-" + project.id}>
                        <ul className="navbar-nav ms-auto">
                            {ImcompletedTasks.map((projectTask, index) => tastItem(projectTask, index + 1, false))}
                            {CompletedTasks.map((projectTask, index) => tastItem(projectTask, index + 1 + ImcompletedTasks.length, true))}
                        </ul>
                        <div className="text-center row">
                            <button className="btn btn-primary btn-sm mb-2 mt-2" data-bs-toggle="modal" data-bs-target={"#createTask-" + project.id}>
                                创建一个任务
                            </button>
                            <CraeteTaskDialog project={project} getAllProjectTasks={getAllProjectTasks} />
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default DisplayProject