import { useState, useEffect } from "react"
import DisplayProject from "./DisplayProject"

const DoingTasks = ({ user, userProjects, getAllProjects }) => {
    // 过滤出四个重要度的项目
    const FirstProjects = userProjects.filter((project) => project.important === 1)
    const SecondProjects = userProjects.filter((project) => project.important === 2)
    const ThirdProjects = userProjects.filter((project) => project.important === 3)
    const FourthProjects = userProjects.filter((project) => project.important === 4)

    return (
        <>
            <div className="card-title text-center">
                doing
            </div>
            <div className="card-text text-center mb-2">
                当前你需要完成的任务
            </div>
            <div>
                {FourthProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id}/>)}
                {ThirdProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id}/>)}
                {SecondProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id}/>)}
                {FirstProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id}/>)}
            </div>
        </>
    )
}
export default DoingTasks