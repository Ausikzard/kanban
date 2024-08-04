import DisplayProject from "./DisplayProject"

const DoingTasks = ({ user, userProjects, getAllProjects }) => {
    // 过滤出四个重要度的项目
    const FirstProjects = userProjects.filter((project) => project.important === 1 && project.status === false)
    const SecondProjects = userProjects.filter((project) => project.important === 2 && project.status === false)
    const ThirdProjects = userProjects.filter((project) => project.important === 3 && project.status === false)
    const FourthProjects = userProjects.filter((project) => project.important === 4 && project.status === false)

    return (
        <>
            <div className="card-title text-center">
                doing
            </div>
            <div className="card-text text-center mb-2">
                当前你需要完成的任务
            </div>
            <div>
                {FourthProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={false}/>)}
                {ThirdProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={false}/>)}
                {SecondProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={false}/>)}
                {FirstProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={false}/>)}
            </div>
        </>
    )
}
export default DoingTasks